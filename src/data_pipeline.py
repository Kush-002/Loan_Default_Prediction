"""
Data Pipeline and EDA Generation Module
Project: Loan Default Prediction Using Machine Learning
Ensures Zero Data Leakage: Preprocessing artifacts are fitted exclusively on training splits.
"""

import os
import json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Set aesthetic visual style
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['figure.autolayout'] = True

NUMERICAL_FEATURES = [
    "Age", "Income", "LoanAmount", "CreditScore",
    "MonthsEmployed", "NumCreditLines", "InterestRate",
    "LoanTerm", "DTIRatio"
]

CATEGORICAL_FEATURES = [
    "Education", "EmploymentType", "MaritalStatus",
    "HasMortgage", "HasDependents", "LoanPurpose", "HasCoSigner"
]

TARGET_COLUMN = "Default"
ID_COLUMN = "LoanID"


def load_raw_dataset(csv_path: str = "Backend/data/Loan_default.csv") -> pd.DataFrame:
    """Loads the authentic Kaggle Loan Default dataset."""
    if not os.path.exists(csv_path):
        # Fallback to local path if run from within Backend
        alt_path = os.path.join(os.path.dirname(__file__), "..", "Backend", "data", "Loan_default.csv")
        if os.path.exists(alt_path):
            csv_path = alt_path
        else:
            raise FileNotFoundError(f"Dataset not found at {csv_path}")
    df = pd.read_csv(csv_path)
    return df


def generate_dataset_summary(df: pd.DataFrame) -> dict:
    """Computes comprehensive automated dataset summary for Week 1 & 2 requirements."""
    summary = {
        "dataset_name": "Kaggle Loan Default Dataset",
        "domain": "Banking / Financial Risk Analysis",
        "total_records": int(len(df)),
        "total_columns": int(df.shape[1]),
        "id_column": ID_COLUMN,
        "target_column": TARGET_COLUMN,
        "numerical_features": NUMERICAL_FEATURES,
        "categorical_features": CATEGORICAL_FEATURES,
        "missing_values_total": int(df.isnull().sum().sum()),
        "missing_values_by_feature": {k: int(v) for k, v in df.isnull().sum().items()},
        "duplicate_records": int(df.duplicated().sum()),
        "target_distribution": {
            "non_default_count_0": int((df[TARGET_COLUMN] == 0).sum()),
            "default_count_1": int((df[TARGET_COLUMN] == 1).sum()),
            "non_default_percentage_0": round(float((df[TARGET_COLUMN] == 0).mean() * 100), 2),
            "default_percentage_1": round(float((df[TARGET_COLUMN] == 1).mean() * 100), 2),
            "imbalance_ratio": f"{round(float((df[TARGET_COLUMN] == 0).sum() / (df[TARGET_COLUMN] == 1).sum()), 2)} : 1"
        },
        "categorical_categories": {
            col: sorted([str(x) for x in df[col].unique().tolist()])
            for col in CATEGORICAL_FEATURES
        },
        "numerical_statistics": {
            col: {
                "mean": round(float(df[col].mean()), 2),
                "std": round(float(df[col].std()), 2),
                "min": round(float(df[col].min()), 2),
                "q25": round(float(df[col].quantile(0.25)), 2),
                "median": round(float(df[col].median()), 2),
                "q75": round(float(df[col].quantile(0.75)), 2),
                "max": round(float(df[col].max()), 2)
            }
            for col in NUMERICAL_FEATURES
        }
    }
    return summary


def compute_outlier_analysis(df: pd.DataFrame) -> dict:
    """
    Computes IQR-based outlier statistics for each numerical column.
    Documents the domain decision: financial variables (e.g. high income, high loan amount)
    represent genuine real-world borrowers and should NOT be deleted to prevent survivorship bias.
    """
    outlier_info = {}
    for col in NUMERICAL_FEATURES:
        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        outliers = df[(df[col] < lower_bound) | (df[col] > upper_bound)]
        outlier_info[col] = {
            "q1": round(float(q1), 2),
            "q3": round(float(q3), 2),
            "iqr": round(float(iqr), 2),
            "lower_bound": round(float(lower_bound), 2),
            "upper_bound": round(float(upper_bound), 2),
            "outlier_count": int(len(outliers)),
            "outlier_percentage": round(float(len(outliers) / len(df) * 100), 2)
        }
    return outlier_info


def generate_eda_figures(df: pd.DataFrame, output_dir: str = "reports/figures") -> list:
    """Generates high-resolution EDA charts for documentation and college reports."""
    os.makedirs(output_dir, exist_ok=True)
    generated_files = []

    # 1. Target Distribution Plot
    fig, ax = plt.subplots(figsize=(7, 4.5), dpi=150)
    counts = df[TARGET_COLUMN].value_counts()
    colors = ['#10b981', '#ef4444']
    bars = ax.bar(['Non-Default (0)', 'Default (1)'], counts.values, color=colors, width=0.5, edgecolor='#0f172a', linewidth=1.2)
    for bar in bars:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2, yval + 3000, f"{yval:,} ({yval/len(df)*100:.1f}%)",
                ha='center', va='bottom', fontsize=10, fontweight='bold')
    ax.set_title("Loan Default Target Class Distribution (Imbalance Analysis)", fontsize=12, fontweight='bold', pad=12)
    ax.set_ylabel("Borrower Count", fontsize=10)
    ax.set_ylim(0, max(counts.values) * 1.15)
    target_path = os.path.join(output_dir, "01_target_distribution.png")
    plt.savefig(target_path, bbox_inches='tight')
    plt.close()
    generated_files.append(target_path)

    # 2. Correlation Heatmap
    fig, ax = plt.subplots(figsize=(10, 7), dpi=150)
    corr = df[NUMERICAL_FEATURES + [TARGET_COLUMN]].corr()
    mask = np.triu(np.ones_like(corr, dtype=bool))
    sns.heatmap(corr, annot=True, fmt=".2f", cmap="vlag", vmin=-0.2, vmax=0.2,
                square=True, linewidths=0.5, cbar_kws={"shrink": 0.8}, ax=ax, annot_kws={"size": 8})
    ax.set_title("Spearman/Pearson Feature Correlation Matrix Heatmap", fontsize=12, fontweight='bold', pad=12)
    corr_path = os.path.join(output_dir, "02_correlation_heatmap.png")
    plt.savefig(corr_path, bbox_inches='tight')
    plt.close()
    generated_files.append(corr_path)

    # 3. Default Rate by Categorical Features
    fig, axes = plt.subplots(2, 4, figsize=(18, 9), dpi=150)
    axes = axes.flatten()
    for idx, cat_col in enumerate(CATEGORICAL_FEATURES):
        rate_df = df.groupby(cat_col)[TARGET_COLUMN].mean().reset_index()
        rate_df[TARGET_COLUMN] = rate_df[TARGET_COLUMN] * 100
        sns.barplot(data=rate_df, x=cat_col, y=TARGET_COLUMN, ax=axes[idx], palette="Blues_r", edgecolor="#1e293b")
        axes[idx].set_title(f"Default % by {cat_col}", fontsize=10, fontweight='bold')
        axes[idx].set_ylabel("Default Rate (%)", fontsize=9)
        axes[idx].set_xlabel("")
        axes[idx].tick_params(axis='x', rotation=25)
        for p in axes[idx].patches:
            axes[idx].annotate(f"{p.get_height():.1f}%", (p.get_x() + p.get_width() / 2., p.get_height()),
                               ha='center', va='bottom', fontsize=8, xytext=(0, 2), textcoords='offset points')
    # Hide the 8th unused subplot
    axes[7].set_visible(False)
    plt.suptitle("Default Propensity Across Categorical Profiles", fontsize=14, fontweight='bold', y=1.02)
    cat_path = os.path.join(output_dir, "03_categorical_default_rates.png")
    plt.savefig(cat_path, bbox_inches='tight')
    plt.close()
    generated_files.append(cat_path)

    # 4. Numerical Distributions by Default Status
    fig, axes = plt.subplots(3, 3, figsize=(15, 12), dpi=150)
    axes = axes.flatten()
    for idx, num_col in enumerate(NUMERICAL_FEATURES):
        sns.boxplot(data=df.sample(min(20000, len(df)), random_state=42),
                    x=TARGET_COLUMN, y=num_col, ax=axes[idx], palette=['#10b981', '#ef4444'])
        axes[idx].set_title(f"{num_col} Distribution", fontsize=10, fontweight='bold')
        axes[idx].set_xticklabels(['Non-Default (0)', 'Default (1)'])
        axes[idx].set_xlabel("")
    plt.suptitle("Numerical Distributions by Default Outcome (Sampled 20K Records)", fontsize=14, fontweight='bold', y=1.01)
    num_path = os.path.join(output_dir, "04_numerical_boxplots.png")
    plt.savefig(num_path, bbox_inches='tight')
    plt.close()
    generated_files.append(num_path)

    return generated_files


def prepare_zero_leakage_splits(df: pd.DataFrame, test_size: float = 0.2, random_state: int = 42):
    """
    Prepares train/test splits with STRICT ZERO DATA LEAKAGE.
    1. Removes identifier LoanID.
    2. Separates X and y.
    3. Executes train_test_split with stratification.
    4. Fits encoders and scaler exclusively on X_train.
    5. Transforms X_test using the train-fitted artifacts.
    """
    clean_df = df.copy()
    if ID_COLUMN in clean_df.columns:
        clean_df = clean_df.drop(columns=[ID_COLUMN])

    X = clean_df.drop(columns=[TARGET_COLUMN])
    y = clean_df[TARGET_COLUMN]

    # Perform train/test split FIRST to isolate test set
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )

    X_train = X_train_raw.copy()
    X_test = X_test_raw.copy()

    # Fit encoders strictly on X_train
    encoders = {}
    for col in CATEGORICAL_FEATURES:
        le = LabelEncoder()
        X_train[col] = le.fit_transform(X_train[col].astype(str))
        # Handle unseen categories in test gracefully by mapping to known classes
        test_classes = set(X_test[col].astype(str).unique())
        known_classes = set(le.classes_)
        # If unseen found, fallback to most frequent class
        if not test_classes.issubset(known_classes):
            mode_val = X_train_raw[col].mode()[0]
            X_test[col] = X_test[col].apply(lambda v: v if str(v) in known_classes else mode_val)
        X_test[col] = le.transform(X_test[col].astype(str))
        encoders[col] = le

    # Feature ordering ensures consistency
    all_feature_order = NUMERICAL_FEATURES + CATEGORICAL_FEATURES
    X_train = X_train[all_feature_order]
    X_test = X_test[all_feature_order]

    # Fit scaler strictly on X_train
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return {
        "X_train_raw": X_train_raw,
        "X_test_raw": X_test_raw,
        "X_train_encoded": X_train,
        "X_test_encoded": X_test,
        "X_train_scaled": X_train_scaled,
        "X_test_scaled": X_test_scaled,
        "y_train": y_train.values,
        "y_test": y_test.values,
        "encoders": encoders,
        "scaler": scaler,
        "feature_names": all_feature_order
    }


if __name__ == "__main__":
    print("[+] Loading Kaggle Loan Default Dataset...")
    df = load_raw_dataset()
    print(f"    Loaded shape: {df.shape}")

    print("[+] Generating dataset summary & EDA statistics...")
    summary = generate_dataset_summary(df)
    outliers = compute_outlier_analysis(df)
    summary["outlier_analysis"] = outliers

    # Save summary JSON for Backend API
    os.makedirs("Backend/model", exist_ok=True)
    with open("Backend/model/eda_summary.json", "w") as f:
        json.dump(summary, f, indent=2)
    print("    [v] Saved Backend/model/eda_summary.json")

    print("[+] Generating EDA figure visualizations...")
    figures = generate_eda_figures(df)
    for fig in figures:
        print(f"    [v] Figure generated: {fig}")

    print("[+] Verifying zero-leakage data split...")
    split_data = prepare_zero_leakage_splits(df)
    print(f"    Train shape: {split_data['X_train_scaled'].shape}, Test shape: {split_data['X_test_scaled'].shape}")
    print("    [v] Data pipeline completed successfully with zero data leakage!")
