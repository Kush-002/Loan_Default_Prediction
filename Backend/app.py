import os
import json
import joblib  # type: ignore[import-not-found]
from pathlib import Path
from flask import Flask, jsonify, request  # type: ignore[import-not-found]
from flask_cors import CORS  # type: ignore[import-not-found]

from utils.preprocessing import preprocess_input

# ==========================================
# BASE DIRECTORY & FLASK APP
# ==========================================

BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__)
CORS(app)

# ==========================================
# LOAD PRODUCTION MODEL ARTIFACTS
# ==========================================

model = joblib.load(BASE_DIR / "model" / "model.pkl")
scaler = joblib.load(BASE_DIR / "model" / "scaler.pkl")
encoders = joblib.load(BASE_DIR / "model" / "encoders.pkl")

# Load precomputed training & EDA telemetry if available
METRICS_PATH = BASE_DIR / "model" / "metrics.json"
EDA_PATH = BASE_DIR / "model" / "eda_summary.json"

metrics_data = {}
if METRICS_PATH.exists():
    with open(METRICS_PATH, "r") as f:
        metrics_data = json.load(f)

eda_data = {}
if EDA_PATH.exists():
    with open(EDA_PATH, "r") as f:
        eda_data = json.load(f)

# Feature description mappings
FEATURE_LABELS = {
    "InterestRate": ("Interest Rate APR", "Cost of borrowing & monetary risk"),
    "Age": ("Applicant Age", "Demographic life-stage stability"),
    "Income": ("Annual Income", "Repayment capacity & gross earnings"),
    "LoanAmount": ("Requested Loan Amount", "Total principal capital at risk"),
    "MonthsEmployed": ("Employment Tenure", "Continuous employment stability"),
    "CreditScore": ("Credit Score (FICO)", "Primary creditworthiness indicator"),
    "DTIRatio": ("Debt-to-Income (DTI)", "Existing debt obligations vs earnings"),
    "LoanTerm": ("Loan Duration Term", "Amortization window & timeline"),
    "LoanPurpose": ("Loan Purpose", "Capital allocation category"),
    "Education": ("Education Level", "Educational attainment profile"),
    "NumCreditLines": ("Active Credit Lines", "Credit accounts currently open"),
    "EmploymentType": ("Employment Status", "Full-time, part-time, or contract"),
    "MaritalStatus": ("Marital Status", "Household structural profile"),
    "HasMortgage": ("Existing Mortgage", "Real estate lien obligation"),
    "HasDependents": ("Dependents", "Household financial obligations"),
    "HasCoSigner": ("Co-Signer Guarantee", "Secondary guarantor commitment")
}

FEATURE_KEYS = [
    "Age", "Income", "LoanAmount", "CreditScore",
    "MonthsEmployed", "NumCreditLines", "InterestRate",
    "LoanTerm", "DTIRatio", "Education", "EmploymentType",
    "MaritalStatus", "HasMortgage", "HasDependents",
    "LoanPurpose", "HasCoSigner"
]

# Build fallback importance dictionary from metrics_data
cached_importance_map = {}
for item in metrics_data.get("feature_importances", []):
    cached_importance_map[item["feature"]] = item["tree_importance"]


# ==========================================
# INPUT VALIDATION HELPER
# ==========================================

def validate_applicant_data(data):
    if not isinstance(data, dict):
        return ["Request payload must be a valid JSON object."]

    errors = []
    required_fields = [
        "age", "income", "loanAmount", "creditScore", "monthsEmployed",
        "creditLines", "interestRate", "loanTerm", "dtiRatio",
        "education", "employmentType", "maritalStatus", "hasMortgage",
        "hasDependents", "loanPurpose", "hasCoSigner"
    ]

    for f in required_fields:
        if f not in data or data[f] is None or str(data[f]).strip() == "":
            errors.append(f"Missing or empty required field: '{f}'")

    if errors:
        return errors

    ranges = {
        "age": (18, 100, int),
        "income": (0, 10000000, float),
        "loanAmount": (100, 10000000, float),
        "creditScore": (300, 850, int),
        "monthsEmployed": (0, 600, int),
        "creditLines": (0, 50, int),
        "interestRate": (0.0, 100.0, float),
        "loanTerm": (1, 360, int),
        "dtiRatio": (0.0, 1.5, float)
    }

    for field, (min_v, max_v, cast_type) in ranges.items():
        try:
            val = cast_type(data[field])
            if val < min_v or val > max_v:
                errors.append(f"Field '{field}' value {val} is outside allowed range [{min_v}, {max_v}].")
        except (ValueError, TypeError):
            errors.append(f"Field '{field}' must be a valid number of type {cast_type.__name__}.")

    valid_categories = {
        "education": ["Bachelor's", "Master's", "High School", "PhD"],
        "employmentType": ["Full-time", "Unemployed", "Self-employed", "Part-time"],
        "maritalStatus": ["Divorced", "Married", "Single"],
        "hasMortgage": ["Yes", "No"],
        "hasDependents": ["Yes", "No"],
        "loanPurpose": ["Other", "Auto", "Business", "Home", "Education"],
        "hasCoSigner": ["Yes", "No"]
    }

    for cat_f, valid_vals in valid_categories.items():
        str_val = str(data[cat_f]).strip()
        matching = [v for v in valid_vals if v.lower() == str_val.lower()]
        if not matching:
            errors.append(f"Field '{cat_f}' has invalid value '{str_val}'. Allowed values: {valid_vals}")

    return errors


# ==========================================
# API ROUTES
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "service": "Loan Default Prediction REST API",
        "version": "2.4.0",
        "endpoints": [
            "/api/health",
            "/api/predict",
            "/api/predict-batch",
            "/api/model-info",
            "/api/metrics",
            "/api/feature-importance",
            "/api/eda",
            "/api/error-analysis",
            "/api/curves"
        ]
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "success",
        "message": "Backend engine is operational",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "encoders_loaded": encoders is not None
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({
                "success": False,
                "error": "Invalid request body",
                "details": ["Empty or non-JSON payload received."]
            }), 400

        # Validate input schema
        validation_errors = validate_applicant_data(data)
        if validation_errors:
            return jsonify({
                "success": False,
                "error": "Validation error",
                "details": validation_errors
            }), 400

        # Preprocess input with zero leakage scaler & encoders
        input_scaled = preprocess_input(data, encoders, scaler)

        # Generate live ML inference
        prediction = int(model.predict(input_scaled)[0])
        probabilities = model.predict_proba(input_scaled)[0]
        default_probability = float(probabilities[1] * 100)
        confidence = float(max(probabilities) * 100)

        # Risk classification
        if default_probability <= 30.0:
            risk_level = "Low Risk (Safe)"
        elif default_probability <= 65.0:
            risk_level = "Moderate Risk (Review)"
        else:
            risk_level = "High Risk (Likely Default)"

        # Compute feature drivers
        feature_drivers = []
        if hasattr(model, "feature_importances_"):
            raw_importances = model.feature_importances_
        else:
            raw_importances = [cached_importance_map.get(k, 6.25) / 100.0 for k in FEATURE_KEYS]

        for key, imp in zip(FEATURE_KEYS, raw_importances):
            title, desc = FEATURE_LABELS.get(key, (key, ""))
            feature_drivers.append({
                "key": key,
                "name": title,
                "description": desc,
                "importance": round(float(imp) * 100, 1),
                "value": str(data.get(key[0].lower() + key[1:], data.get(key, "")))
            })

        feature_drivers.sort(key=lambda x: x["importance"], reverse=True)

        return jsonify({
            "status": "success",
            "prediction": prediction,
            "prediction_label": "Likely to Default" if prediction == 1 else "Likely to Repay (Approved)",
            "risk_percentage": round(default_probability, 2),
            "risk_level": risk_level,
            "confidence": round(confidence, 2),
            "default_probability": round(probabilities[1], 4),
            "non_default_probability": round(probabilities[0], 4),
            "feature_drivers": feature_drivers
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "status": "error",
            "error": "Inference failure",
            "message": str(e)
        }), 500


@app.route("/api/predict-batch", methods=["POST"])
def predict_batch():
    try:
        body = request.get_json(silent=True)
        records = body if isinstance(body, list) else body.get("records", []) if isinstance(body, dict) else []

        if not records:
            return jsonify({
                "status": "error",
                "message": "No records provided in batch array"
            }), 400

        results = []
        for row in records:
            scaled = preprocess_input(row, encoders, scaler)
            pred = int(model.predict(scaled)[0])
            prob = model.predict_proba(scaled)[0]
            default_prob = round(float(prob[1] * 100), 2)

            results.append({
                "prediction": pred,
                "risk_percentage": default_prob,
                "confidence": round(float(max(prob) * 100), 2),
                "risk_category": "Low" if default_prob <= 30 else ("Moderate" if default_prob <= 65 else "High")
            })

        return jsonify({
            "status": "success",
            "total_evaluated": len(results),
            "predictions": results
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/api/model-info", methods=["GET"])
def model_info():
    best_name = metrics_data.get("best_model_name", "Gradient Boosting")
    best_summary = metrics_data.get("models_summary", {}).get(best_name, {})
    return jsonify({
        "status": "success",
        "model_name": best_name,
        "algorithm": "Histogram-based Gradient Boosting Classifier (HistGradientBoosting)",
        "training_date": metrics_data.get("evaluation_timestamp", "Recent"),
        "dataset": "Kaggle Loan Default Dataset",
        "dataset_size": 255347,
        "train_samples": 204277,
        "test_samples": 51070,
        "num_features": 16,
        "optimal_f1_threshold": metrics_data.get("optimal_f1_threshold", 0.60),
        "performance": best_summary,
        "hyperparameters": metrics_data.get("best_model_params", {})
    })


@app.route("/api/metrics", methods=["GET"])
def get_metrics():
    return jsonify({
        "status": "success",
        "evaluation_timestamp": metrics_data.get("evaluation_timestamp"),
        "best_model_name": metrics_data.get("best_model_name"),
        "models_summary": metrics_data.get("models_summary", {})
    })


@app.route("/api/feature-importance", methods=["GET"])
def get_feature_importance():
    return jsonify({
        "status": "success",
        "feature_importances": metrics_data.get("feature_importances", [])
    })


@app.route("/api/eda", methods=["GET"])
def get_eda():
    return jsonify({
        "status": "success",
        "data": eda_data
    })


@app.route("/api/error-analysis", methods=["GET"])
def get_error_analysis():
    return jsonify({
        "status": "success",
        "error_analysis": metrics_data.get("error_analysis", {}),
        "threshold_analysis": metrics_data.get("threshold_analysis", []),
        "calibration": metrics_data.get("calibration", {})
    })


@app.route("/api/curves", methods=["GET"])
def get_curves():
    return jsonify({
        "status": "success",
        "roc_curves": metrics_data.get("roc_curves", {}),
        "pr_curves": metrics_data.get("pr_curves", {})
    })


# ==========================================
# SERVER ENTRY POINT
# ==========================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)