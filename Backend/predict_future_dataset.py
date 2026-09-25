"""
Batch Prediction Script for Future / New Loan Applicant Data
Usage:
    python predict_future_dataset.py --input path/to/future_data.csv --output predictions.csv
"""

import argparse
import os
import joblib
import pandas as pd
from utils.preprocessing import preprocess_input, CATEGORICAL_COLUMNS


def load_artifacts():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model = joblib.load(os.path.join(base_dir, "model", "model.pkl"))
    scaler = joblib.load(os.path.join(base_dir, "model", "scaler.pkl"))
    encoders = joblib.load(os.path.join(base_dir, "model", "encoders.pkl"))
    return model, scaler, encoders


def predict_future_file(input_csv_path, output_csv_path="future_predictions.csv"):
    if not os.path.exists(input_csv_path):
        print(f"Error: Input file '{input_csv_path}' not found.")
        return

    print(f"\n[+] Loading future data from: {input_csv_path}")
    df = pd.read_csv(input_csv_path)
    print(f"    Total records: {len(df)}")

    model, scaler, encoders = load_artifacts()

    # Normalize column names if needed
    col_mapping = {
        "age": "Age", "income": "Income", "loanamount": "LoanAmount",
        "creditscore": "CreditScore", "monthsemployed": "MonthsEmployed",
        "numcreditlines": "NumCreditLines", "creditlines": "NumCreditLines",
        "interestrate": "InterestRate", "loanterm": "LoanTerm", "dtiratio": "DTIRatio",
        "education": "Education", "employmenttype": "EmploymentType",
        "maritalstatus": "MaritalStatus", "hasmortgage": "HasMortgage",
        "hasdependents": "HasDependents", "loanpurpose": "LoanPurpose",
        "hascosigner": "HasCoSigner"
    }
    df.rename(columns={c: col_mapping[c.lower()] for c in df.columns if c.lower() in col_mapping}, inplace=True)

    features = [
        "Age", "Income", "LoanAmount", "CreditScore", "MonthsEmployed",
        "NumCreditLines", "InterestRate", "LoanTerm", "DTIRatio",
        "Education", "EmploymentType", "MaritalStatus", "HasMortgage",
        "HasDependents", "LoanPurpose", "HasCoSigner"
    ]

    missing = [f for f in features if f not in df.columns]
    if missing:
        print(f"Error: Missing required columns in input CSV: {missing}")
        return

    X = df[features].copy()

    # Encode categorical columns
    for col in CATEGORICAL_COLUMNS:
        encoder = encoders[col]
        X[col] = encoder.transform(X[col].astype(str))

    # Scale
    X_scaled = scaler.transform(X)

    # Predict
    print("\n[+] Running inference using trained Random Forest model...")
    predictions = model.predict(X_scaled)
    probabilities = model.predict_proba(X_scaled)

    df["Predicted_Default"] = predictions
    df["Default_Probability_%"] = (probabilities[:, 1] * 100).round(2)
    df["Risk_Category"] = df["Default_Probability_%"].apply(
        lambda p: "Low Risk (Safe)" if p <= 30 else ("Moderate Risk (Review)" if p <= 65 else "High Risk (Default)")
    )

    df.to_csv(output_csv_path, index=False)
    print(f"\n[v] Predictions saved successfully to: {output_csv_path}")
    print("\n--- Summary Breakdown ---")
    print(df["Risk_Category"].value_counts())


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Predict future data using trained loan model")
    parser.add_argument("--input", "-i", type=str, default="data/Loan_default.csv", help="Path to future data CSV file")
    parser.add_argument("--output", "-o", type=str, default="data/future_predictions.csv", help="Output path for predictions CSV")
    args = parser.parse_args()

    predict_future_file(args.input, args.output)
