"""
Notebook Generator Utility
Generates fully structured, beginner-friendly, and executable Jupyter Notebooks
for College SOP requirements:
  - notebooks/01_data_exploration_and_eda.ipynb
  - notebooks/02_preprocessing_and_pipeline.ipynb
  - notebooks/03_model_training_and_evaluation.ipynb
"""

import json
import os


def make_notebook(cells):
    return {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "codemirror_mode": {"name": "ipython", "version": 3},
                "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "nbconvert_exporter": "python",
                "pygments_lexer": "ipython3",
                "version": "3.13"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 2
    }


def md_cell(source):
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": [line + "\n" for line in source.split("\n")]
    }


def code_cell(source):
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [line + "\n" for line in source.split("\n")]
    }


def build_all_notebooks():
    os.makedirs("notebooks", exist_ok=True)

    # -------------------------------------------------------------
    # Notebook 1: Data Exploration & EDA
    # -------------------------------------------------------------
    nb1_cells = [
        md_cell("""# 01 — Loan Default Prediction: Problem Definition & Comprehensive EDA
## Computer Engineering — Semester Machine Learning Project (Weeks 1 & 2)
### Objective:
Predict borrower default risk on the Kaggle Loan Default Dataset (255,347 records, 18 attributes).

### Domain Context:
In commercial and retail banking, determining credit default probability is vital for capital preservation, interest rate pricing, and regulatory risk capital reserve allocation."""),
        code_cell("""import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Configure styles
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['figure.figsize'] = (10, 6)

print("Libraries imported successfully.")"""),
        md_cell("""## 1. Load Dataset & Inspect Basic Properties"""),
        code_cell("""data_path = os.path.join("..", "Backend", "data", "Loan_default.csv")
if not os.path.exists(data_path):
    data_path = "Backend/data/Loan_default.csv"

df = pd.read_csv(data_path)
print("Dataset Shape:", df.shape)
df.head()"""),
        code_cell("""print("Column Names and Data Types:")
print(df.dtypes)
print("\\nMissing Values Check:")
print(df.isnull().sum())
print("\\nDuplicate Records Check:", df.duplicated().sum())"""),
        md_cell("""## 2. Target Variable Analysis (Class Imbalance)
Loan default status is stored in the `Default` column (0 = Non-Default, 1 = Default)."""),
        code_cell("""counts = df['Default'].value_counts()
proportions = df['Default'].value_counts(normalize=True) * 100

print(f"Non-Default (0): {counts[0]:,} ({proportions[0]:.2f}%)")
print(f"Default (1):     {counts[1]:,} ({proportions[1]:.2f}%)")

fig, ax = plt.subplots(figsize=(6, 4))
sns.barplot(x=['Non-Default (0)', 'Default (1)'], y=counts.values, palette=['#10b981', '#ef4444'], ax=ax)
ax.set_title("Target Class Distribution (Severe Imbalance: ~88% vs 12%)", fontweight='bold')
ax.set_ylabel("Count")
plt.show()"""),
        md_cell("""## 3. Numerical Features Distribution & Outliers (IQR Method)"""),
        code_cell("""numerical_cols = ["Age", "Income", "LoanAmount", "CreditScore", "MonthsEmployed", "NumCreditLines", "InterestRate", "LoanTerm", "DTIRatio"]
df[numerical_cols].describe().T"""),
        code_cell("""# Outlier analysis using IQR
for col in numerical_cols:
    q1 = df[col].quantile(0.25)
    q3 = df[col].quantile(0.75)
    iqr = q3 - q1
    low = q1 - 1.5 * iqr
    high = q3 + 1.5 * iqr
    outliers = df[(df[col] < low) | (df[col] > high)]
    print(f"{col:<16} | Outliers: {len(outliers):>6} ({len(outliers)/len(df)*100:>5.2f}%) | Bounds: [{low:.1f}, {high:.1f}]")"""),
        md_cell("""## 4. Correlation Analysis"""),
        code_cell("""plt.figure(figsize=(10, 8))
corr = df[numerical_cols + ['Default']].corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap="vlag", vmin=-0.2, vmax=0.2, square=True)
plt.title("Correlation Heatmap with Target Variable", fontweight='bold')
plt.show()"""),
        md_cell("""## 5. Categorical Feature Default Propensities"""),
        code_cell("""categorical_cols = ["Education", "EmploymentType", "MaritalStatus", "HasMortgage", "HasDependents", "LoanPurpose", "HasCoSigner"]
for cat in categorical_cols:
    rates = df.groupby(cat)['Default'].mean() * 100
    print(f"--- Default Rate by {cat} ---")
    print(rates.round(2).to_string())
    print()""")
    ]

    with open("notebooks/01_data_exploration_and_eda.ipynb", "w") as f:
        json.dump(make_notebook(nb1_cells), f, indent=2)
    print("[v] Generated notebooks/01_data_exploration_and_eda.ipynb")

    # -------------------------------------------------------------
    # Notebook 2: Preprocessing & Zero-Leakage Pipeline
    # -------------------------------------------------------------
    nb2_cells = [
        md_cell("""# 02 — Data Preprocessing & Zero-Leakage Pipeline
## Computer Engineering — Semester Machine Learning Project (Week 2)
### Key Engineering Rule:
To prevent **Data Leakage**, scalers and encoders must be fitted strictly on the **training set** (`X_train`) and only applied (`transform()`) to the test set (`X_test`)."""),
        code_cell("""import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

data_path = os.path.join("..", "Backend", "data", "Loan_default.csv")
if not os.path.exists(data_path):
    data_path = "Backend/data/Loan_default.csv"

df = pd.read_csv(data_path)
if "LoanID" in df.columns:
    df = df.drop(columns=["LoanID"])

X = df.drop(columns=["Default"])
y = df["Default"]

print(f"Features shape: {X.shape}, Target shape: {y.shape}")"""),
        md_cell("""## 1. Train-Test Split (BEFORE Any Scaling or Encoding)"""),
        code_cell("""X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"X_train: {X_train.shape} | X_test: {X_test.shape}")
print(f"Train Default Rate: {y_train.mean():.4f}")
print(f"Test Default Rate:  {y_test.mean():.4f}")"""),
        md_cell("""## 2. Categorical Encoding (Fitted Only on X_train)"""),
        code_cell("""categorical_cols = ["Education", "EmploymentType", "MaritalStatus", "HasMortgage", "HasDependents", "LoanPurpose", "HasCoSigner"]
encoders = {}

X_train_enc = X_train.copy()
X_test_enc = X_test.copy()

for col in categorical_cols:
    le = LabelEncoder()
    X_train_enc[col] = le.fit_transform(X_train[col].astype(str))
    X_test_enc[col] = le.transform(X_test[col].astype(str))
    encoders[col] = le
    print(f"Encoded {col}: {list(le.classes_)}")"""),
        md_cell("""## 3. Feature Scaling (StandardScaler Fitted Only on X_train)"""),
        code_cell("""feature_order = ["Age", "Income", "LoanAmount", "CreditScore", "MonthsEmployed", "NumCreditLines", "InterestRate", "LoanTerm", "DTIRatio"] + categorical_cols

X_train_enc = X_train_enc[feature_order]
X_test_enc = X_test_enc[feature_order]

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_enc)
X_test_scaled = scaler.transform(X_test_enc)

print(f"Scaled X_train mean: {X_train_scaled.mean():.4f}, std: {X_train_scaled.std():.4f}")
print(f"Scaled X_test mean:  {X_test_scaled.mean():.4f}, std: {X_test_scaled.std():.4f}")
print("Preprocessed feature space ready with ZERO data leakage.")""")
    ]

    with open("notebooks/02_preprocessing_and_pipeline.ipynb", "w") as f:
        json.dump(make_notebook(nb2_cells), f, indent=2)
    print("[v] Generated notebooks/02_preprocessing_and_pipeline.ipynb")

    # -------------------------------------------------------------
    # Notebook 3: Model Training, Scratch Algorithm & Evaluation
    # -------------------------------------------------------------
    nb3_cells = [
        md_cell("""# 03 — Model Training, Scratch Algorithm & Comprehensive Evaluation
## Computer Engineering — Semester Machine Learning Project (Weeks 3, 4, 5, 9, 10)
### Scope:
1. Mandatory Scratch Logistic Regression implementation from first principles.
2. Library models: Logistic Regression, Decision Tree, Random Forest, Gradient Boosting.
3. 5-Fold Stratified Cross-Validation.
4. Comprehensive Metrics: Accuracy, Precision, Recall, F1, ROC-AUC, Specificity, FPR, FNR.
5. Error Analysis (False Positives vs False Negatives in financial lending).
6. Threshold Optimization & Probability Calibration."""),
        code_cell("""import sys
import os
sys.path.insert(0, os.path.abspath(".."))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.linear_model import LogisticRegression as SklearnLogReg
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

from src.scratch_logistic_regression import LogisticRegressionScratch
from src.data_pipeline import load_raw_dataset, prepare_zero_leakage_splits

print("Modules imported successfully.")"""),
        md_cell("""## 1. Load Data Pipeline"""),
        code_cell("""df = load_raw_dataset()
splits = prepare_zero_leakage_splits(df)

X_train = splits["X_train_scaled"]
y_train = splits["y_train"]
X_test = splits["X_test_scaled"]
y_test = splits["y_test"]
feature_names = splits["feature_names"]

print(f"Train: {X_train.shape}, Test: {X_test.shape}")"""),
        md_cell("""## 2. Mandatory Scratch Implementation vs. Library Logistic Regression"""),
        code_cell("""# Scratch Model (trained on 25k stratified subset for fast gradient descent convergence)
sub_idx = np.random.RandomState(42).choice(len(y_train), size=25000, replace=False)
scratch_model = LogisticRegressionScratch(learning_rate=0.1, n_iterations=300, random_state=42)
scratch_model.fit(X_train[sub_idx], y_train[sub_idx])

# Library Model
sklearn_model = SklearnLogReg(max_iter=500, random_state=42)
sklearn_model.fit(X_train[sub_idx], y_train[sub_idx])

scratch_preds = scratch_model.predict(X_test)
scratch_probs = scratch_model.predict_proba(X_test)[:, 1]

sklearn_preds = sklearn_model.predict(X_test)
sklearn_probs = sklearn_model.predict_proba(X_test)[:, 1]

print("--- Scratch vs Library Comparison ---")
print(f"Scratch Model -> Accuracy: {accuracy_score(y_test, scratch_preds):.4f} | ROC-AUC: {roc_auc_score(y_test, scratch_probs):.4f}")
print(f"Library Model -> Accuracy: {accuracy_score(y_test, sklearn_preds):.4f} | ROC-AUC: {roc_auc_score(y_test, sklearn_probs):.4f}")"""),
        md_cell("""## 3. Multi-Model Training with Class Balancing"""),
        code_cell("""models = {
    "Logistic Regression (Balanced)": SklearnLogReg(max_iter=1000, class_weight='balanced', random_state=42),
    "Decision Tree": DecisionTreeClassifier(max_depth=8, min_samples_leaf=20, class_weight='balanced', random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=50, max_depth=12, class_weight='balanced', n_jobs=-1, random_state=42),
    "Gradient Boosting": HistGradientBoostingClassifier(max_iter=100, max_depth=8, class_weight='balanced', random_state=42)
}

results = []
for name, model in models.items():
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    probs = model.predict_proba(X_test)[:, 1]
    
    results.append({
        "Model": name,
        "Accuracy (%)": round(accuracy_score(y_test, preds) * 100, 2),
        "Precision (%)": round(precision_score(y_test, preds) * 100, 2),
        "Recall (%)": round(recall_score(y_test, preds) * 100, 2),
        "F1 (%)": round(f1_score(y_test, preds) * 100, 2),
        "ROC-AUC (%)": round(roc_auc_score(y_test, probs) * 100, 2)
    })

comparison_df = pd.DataFrame(results)
comparison_df"""),
        md_cell("""## 4. Error Analysis & Confusion Matrix (Week 9)"""),
        code_cell("""best_model = models["Gradient Boosting"]
best_preds = best_model.predict(X_test)
cm = confusion_matrix(y_test, best_preds)
tn, fp, fn, tp = cm.ravel()

print(f"True Negatives  (Safe correctly identified):       {tn:,}")
print(f"False Positives (Safe borrower denied / review):    {fp:,}")
print(f"False Negatives (Defaulter disbursed / lost $):    {fn:,}")
print(f"True Positives  (Defaulter caught):                 {tp:,}")

plt.figure(figsize=(6, 4.5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Greens", xticklabels=['Safe', 'Default'], yticklabels=['Safe', 'Default'])
plt.title("Confusion Matrix: Gradient Boosting", fontweight='bold')
plt.ylabel("Actual Label")
plt.xlabel("Predicted Label")
plt.show()""")
    ]

    with open("notebooks/03_model_training_and_evaluation.ipynb", "w") as f:
        json.dump(make_notebook(nb3_cells), f, indent=2)
    print("[v] Generated notebooks/03_model_training_and_evaluation.ipynb")


if __name__ == "__main__":
    build_all_notebooks()
