import pandas as pd


# ==========================================
# CATEGORICAL COLUMNS
# ==========================================

CATEGORICAL_COLUMNS = [
    "Education",
    "EmploymentType",
    "MaritalStatus",
    "HasMortgage",
    "HasDependents",
    "LoanPurpose",
    "HasCoSigner"
]


# ==========================================
# PREPROCESS USER INPUT
# ==========================================

def preprocess_input(data, encoders, scaler):

    # ==========================================
    # CREATE DATAFRAME
    # ==========================================

    input_data = pd.DataFrame([{

        "Age": data["age"],

        "Income": data["income"],

        "LoanAmount": data["loanAmount"],

        "CreditScore": data["creditScore"],

        "MonthsEmployed": data["monthsEmployed"],

        "NumCreditLines": data["creditLines"],

        "InterestRate": data["interestRate"],

        "LoanTerm": data["loanTerm"],

        "DTIRatio": data["dtiRatio"],

        "Education": data["education"],

        "EmploymentType": data["employmentType"],

        "MaritalStatus": data["maritalStatus"],

        "HasMortgage": data["hasMortgage"],

        "HasDependents": data["hasDependents"],

        "LoanPurpose": data["loanPurpose"],

        "HasCoSigner": data["hasCoSigner"]

    }])


    # ==========================================
    # ENCODE CATEGORICAL VALUES
    # ==========================================

    for column in CATEGORICAL_COLUMNS:

        encoder = encoders[column]

        input_data[column] = encoder.transform(
            input_data[column].astype(str)
        )


    # ==========================================
    # SCALE DATA
    # ==========================================

    input_scaled = scaler.transform(
        input_data
    )


    # ==========================================
    # RETURN PROCESSED DATA
    # ==========================================

    return input_scaled