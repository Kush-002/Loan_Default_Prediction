from flask import Flask, jsonify, request  # type: ignore[import-not-found]
from flask_cors import CORS  # type: ignore[import-not-found]

import joblib  # type: ignore[import-not-found]
from pathlib import Path

from utils.preprocessing import preprocess_input


# ==========================================
# BASE DIRECTORY
# ==========================================

BASE_DIR = Path(__file__).resolve().parent


# ==========================================
# CREATE FLASK APP
# ==========================================

app = Flask(__name__)

CORS(app)


# ==========================================
# LOAD MODEL FILES
# ==========================================

model = joblib.load(
    BASE_DIR / "model" / "model.pkl"
)

scaler = joblib.load(
    BASE_DIR / "model" / "scaler.pkl"
)

encoders = joblib.load(
    BASE_DIR / "model" / "encoders.pkl"
)


# ==========================================
# HOME
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Loan Default Prediction API is running"
    })


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({
        "status": "success",
        "message": "Backend is working"
    })


# ==========================================
# PREDICTION
# ==========================================

@app.route("/api/predict", methods=["POST"])
def predict():

    try:

        # ==========================================
        # GET DATA FROM REACT
        # ==========================================

        data = request.get_json()

        print("Received data:")
        print(data)


        # ==========================================
        # PREPROCESS INPUT
        # ==========================================

        input_scaled = preprocess_input(
            data,
            encoders,
            scaler
        )


        # ==========================================
        # MAKE PREDICTION
        # ==========================================

        prediction = model.predict(
            input_scaled
        )[0]


        # ==========================================
        # GET PROBABILITIES
        # ==========================================

        probabilities = model.predict_proba(
            input_scaled
        )[0]


        # ==========================================
        # DEFAULT PROBABILITY
        # ==========================================

        default_probability = probabilities[1] * 100


        # ==========================================
        # FEATURE ATTRIBUTION FROM TRAINED MODEL
        # ==========================================

        FEATURE_LABELS = {
            "InterestRate": (
                "Interest Rate APR",
                "Cost of borrowing & monetary risk"
            ),
            "Age": (
                "Applicant Age",
                "Demographic life-stage stability"
            ),
            "Income": (
                "Annual Income",
                "Repayment capacity & gross earnings"
            ),
            "LoanAmount": (
                "Requested Loan Amount",
                "Total principal capital at risk"
            ),
            "MonthsEmployed": (
                "Employment Tenure",
                "Continuous employment stability"
            ),
            "CreditScore": (
                "Credit Score (FICO)",
                "Primary creditworthiness indicator"
            ),
            "DTIRatio": (
                "Debt-to-Income (DTI)",
                "Existing debt obligations vs earnings"
            ),
            "LoanTerm": (
                "Loan Duration Term",
                "Amortization window & timeline"
            ),
            "LoanPurpose": (
                "Loan Purpose",
                "Capital allocation category"
            ),
            "Education": (
                "Education Level",
                "Educational attainment profile"
            ),
            "NumCreditLines": (
                "Active Credit Lines",
                "Credit accounts currently open"
            ),
            "EmploymentType": (
                "Employment Status",
                "Full-time, part-time, or contract"
            ),
            "MaritalStatus": (
                "Marital Status",
                "Household structural profile"
            ),
            "HasMortgage": (
                "Existing Mortgage",
                "Real estate lien obligation"
            ),
            "HasDependents": (
                "Dependents",
                "Household financial obligations"
            ),
            "HasCoSigner": (
                "Co-Signer Guarantee",
                "Secondary guarantor commitment"
            )
        }


        FEATURE_KEYS = [
            "Age",
            "Income",
            "LoanAmount",
            "CreditScore",
            "MonthsEmployed",
            "NumCreditLines",
            "InterestRate",
            "LoanTerm",
            "DTIRatio",
            "Education",
            "EmploymentType",
            "MaritalStatus",
            "HasMortgage",
            "HasDependents",
            "LoanPurpose",
            "HasCoSigner"
        ]


        raw_importances = model.feature_importances_

        feature_drivers = []

        for key, imp in zip(FEATURE_KEYS, raw_importances):

            title, desc = FEATURE_LABELS.get(
                key,
                (key, "")
            )

            feature_drivers.append({
                "key": key,
                "name": title,
                "description": desc,
                "importance": round(
                    float(imp) * 100,
                    1
                ),
                "value": str(
                    data.get(
                        key[0].lower() + key[1:],
                        data.get(key, "")
                    )
                )
            })


        # Sort top drivers by trained model importance descending

        feature_drivers.sort(
            key=lambda x: x["importance"],
            reverse=True
        )


        # ==========================================
        # RESPONSE
        # ==========================================

        return jsonify({

            "status": "success",

            "prediction": int(prediction),

            "risk_percentage": round(
                default_probability,
                2
            ),

            "confidence": round(
                max(probabilities) * 100,
                2
            ),

            "feature_drivers": feature_drivers

        })


    except Exception as e:

        print("Prediction Error:")
        print(str(e))

        return jsonify({

            "status": "error",

            "message": str(e)

        }), 500


# ==========================================
# BATCH PREDICTION FOR FUTURE DATASETS
# ==========================================

@app.route("/api/predict-batch", methods=["POST"])
def predict_batch():

    try:

        body = request.get_json()

        records = (
            body
            if isinstance(body, list)
            else body.get("records", [])
        )


        if not records:

            return jsonify({
                "status": "error",
                "message": "No records provided"
            }), 400


        results = []

        for row in records:

            scaled = preprocess_input(
                row,
                encoders,
                scaler
            )

            pred = model.predict(scaled)[0]

            prob = model.predict_proba(scaled)[0]


            results.append({

                "prediction": int(pred),

                "risk_percentage": round(
                    prob[1] * 100,
                    2
                ),

                "confidence": round(
                    max(prob) * 100,
                    2
                )

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


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":

    app.run(

        debug=True,

        host="127.0.0.1",

        port=5000

    )