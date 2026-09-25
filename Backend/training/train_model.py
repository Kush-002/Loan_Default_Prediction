import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# ==========================================
# LOAD DATASET
# ==========================================

df = pd.read_csv("data/Loan_default.csv")

print("Dataset loaded")
print("Shape:", df.shape)


# ==========================================
# REMOVE LoanID
# ==========================================

if "LoanID" in df.columns:
    df = df.drop("LoanID", axis=1)


# ==========================================
# SEPARATE FEATURES AND TARGET
# ==========================================

X = df.drop("Default", axis=1)

y = df["Default"]


# ==========================================
# ENCODE CATEGORICAL COLUMNS
# ==========================================

categorical_columns = [
    "Education",
    "EmploymentType",
    "MaritalStatus",
    "HasMortgage",
    "HasDependents",
    "LoanPurpose",
    "HasCoSigner"
]

encoders = {}


for column in categorical_columns:

    encoder = LabelEncoder()

    X[column] = encoder.fit_transform(
        X[column].astype(str)
    )

    encoders[column] = encoder


# ==========================================
# SCALE FEATURES
# ==========================================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)


# ==========================================
# TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# ==========================================
# CREATE MODEL
# ==========================================

model = RandomForestClassifier(
    n_estimators=20,
    max_depth=15,
    min_samples_leaf=2,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

# ==========================================
# TRAIN
# ==========================================

print("\nTraining model...")

model.fit(
    X_train,
    y_train
)


# ==========================================
# EVALUATE
# ==========================================

y_pred = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nModel Accuracy:")
print(accuracy)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# ==========================================
# SAVE MODEL FILES
# ==========================================

joblib.dump(
    model,
    "model/model.pkl"
)

joblib.dump(
    scaler,
    "model/scaler.pkl"
)

joblib.dump(
    encoders,
    "model/encoders.pkl"
)


print("\n================================")
print("MODEL TRAINING COMPLETED")
print("================================")

print("model.pkl saved")
print("scaler.pkl saved")
print("encoders.pkl saved")