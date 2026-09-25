# Loan Default Prediction Using Machine Learning

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org)
[![Framework](https://img.shields.io/badge/Backend-Flask_3.1-black.svg)](https://flask.palletsprojects.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB.svg)](https://react.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind_v4-38B2AC.svg)](https://tailwindcss.com/)
[![ML](https://img.shields.io/badge/ML-Scikit--Learn_Traditional_Only-orange.svg)](https://scikit-learn.org/)
[![Status](https://img.shields.io/badge/College_SOP-Weeks_1--12_Complete-success.svg)](#)

A production-grade, end-to-end Machine Learning web platform for commercial credit risk assessment and borrower default prediction. Built in strict accordance with the Computer Engineering Semester Machine Learning Project Standard Operating Procedure (SOP), enforcing **Strict Traditional Machine Learning** (Zero Deep Learning).

---

## Weekly Project Progress Tracker (Weeks 1–12)

| Week | Task Domain | Status | Concrete Implementation & Evidence |
| :---: | :--- | :---: | :--- |
| **1** | **Problem Definition & Dataset Exploration** | **Completed** | Authentic Kaggle Loan Default Dataset (255,347 rows × 18 columns); automated profiling in `Backend/model/eda_summary.json` and `notebooks/01_data_exploration_and_eda.ipynb`. |
| **2** | **Data Cleaning, Preprocessing & EDA** | **Completed** | Zero-leakage data split (80/20 stratified); `StandardScaler` & `LabelEncoder` fitted strictly on `X_train`; IQR outlier bounds computed; EDA figures in `reports/figures/01-04`. |
| **3** | **Model Creation & Scratch Algorithm** | **Completed** | Implemented `LogisticRegressionScratch` in `src/scratch_logistic_regression.py` (Sigmoid, BCE loss, Batch Gradient Descent) + trained Library Logistic Regression, Decision Tree, Random Forest, HistGradientBoosting. |
| **4** | **Model Evaluation & Imbalance Analysis** | **Completed** | Holdout test evaluation across 51,070 records calculating Accuracy, Precision, Recall, F1, ROC-AUC, Specificity, FPR, FNR, and Confusion Matrix. |
| **5** | **Advanced Models & Cross-Validation** | **Completed** | 5-Fold Stratified Cross-Validation (`StratifiedKFold`); Hyperparameter grid tuning; Model serialization to `Backend/model/final_model.pkl` and `Backend/model/metrics.json`. |
| **6** | **Modern Frontend (React Dashboard)** | **Completed** | Modern Fintech Analytics UI in React 19 + Tailwind v4 + Lucide Icons: KPI metric cards, Predictor Console, Result Card with confidence gauges and SHAP feature drivers. |
| **7** | **Backend (Flask REST API)** | **Completed** | Flask API in `Backend/app.py` with `/api/predict`, `/api/health`, `/api/model-info`, `/api/metrics`, `/api/eda`, `/api/error-analysis`, and strict input schema validation. |
| **8** | **Deployment Preparation** | **Completed** | Clean `requirements.txt`, environment variable decoupling (`VITE_API_URL`), Gunicorn support, and batch prediction CLI (`predict_future_dataset.py`). |
| **9** | **Adapted ML Work: Error Analysis** *(In Place of CNN)* | **Completed** | Financial impact analysis: False Positives ($17.2K lost interest) vs False Negatives ($127.5K principal loss write-off); Confusion Matrix visualizers. |
| **10** | **Adapted ML Work: Advanced Traditional ML** *(In Place of CNN)* | **Completed** | Probability Calibration (Brier Score: 0.1842, Isotonic Regression), Interactive Decision Threshold Optimization (0.10 - 0.90), and ROC/PR Curve coordinates. |
| **11** | **Final Application Integration & Testing** | **Completed** | End-to-end integration verified: React client dispatches validated payloads to Flask backend with seamless error handling and real-time inference. |
| **12** | **Final Project Evaluation & Viva Voce Guide** | **Completed** | 23-section documentation, 3 Jupyter Notebooks in `notebooks/`, and complete Viva Voce examination defense cheat-sheet. |

---

## 1. Introduction
Credit underwriting is the foundation of retail and commercial banking. When financial institutions disburse capital, they face credit risk—the probability that a borrower will fail to meet contractual debt obligations. This project implements a modern, transparent machine learning system that analyzes borrower socioeconomic, demographic, and financial profiles to predict default risk before loan disbursal.

## 2. Problem Statement
Traditional rule-based credit scoring (such as raw FICO cutoffs) often fails to capture complex non-linear interactions across debt-to-income ratios, interest rate spreads, employment tenure, and co-signer guarantees. The objective is to formulate this challenge as a supervised binary classification problem:
$$\hat{y} \in \{0, 1\}$$
where:
* **$y = 0$ (Non-Default / Safe):** Borrower consistently fulfills repayment schedules.
* **$y = 1$ (Default):** Borrower breaches agreement (90+ days delinquent), incurring significant write-offs.

## 3. Objectives
1. Profile and preprocess 255,347 authentic credit records with **strict zero data leakage**.
2. Mathematically formulate and implement **Logistic Regression from Scratch** using pure NumPy.
3. Benchmark multiple traditional ML algorithms: Logistic Regression, Decision Tree, Random Forest, and Gradient Boosting.
4. Address severe class imbalance (88.39% safe vs. 11.61% default) using `class_weight='balanced'` and threshold optimization.
5. Provide explainable AI (XAI) feature attribution identifying key default drivers.
6. Deploy a decoupled architecture with a Python Flask REST API and an animated React 19 analytics dashboard.

## 4. Dataset
* **Source:** Authentic Kaggle Loan Default Dataset (`Loan_default.csv`).
* **Total Instances:** 255,347 records.
* **Total Attributes:** 18 columns (1 identifier, 16 features, 1 target).
* **Missing Values:** 0 missing values across all columns.
* **Duplicates:** 0 duplicate rows.
* **Target Distribution:**
  * Class 0 (Non-Default): **225,694 (88.39%)**
  * Class 1 (Default): **29,653 (11.61%)**
  * Imbalance Ratio: **7.61 : 1**

## 5. Features

| Feature Name | Type | Description | Range / Categories |
| :--- | :--- | :--- | :--- |
| `Age` | Numerical | Age of applicant | 18 – 69 years |
| `Income` | Numerical | Annual gross earnings | $15,000 – $149,999 |
| `LoanAmount` | Numerical | Requested principal capital | $5,000 – $249,999 |
| `CreditScore` | Numerical | Bureau creditworthiness rating | 300 – 849 |
| `MonthsEmployed` | Numerical | Continuous employment duration | 0 – 119 months |
| `NumCreditLines` | Numerical | Open revolving credit accounts | 1 – 4 accounts |
| `InterestRate` | Numerical | Annual percentage rate (APR) | 2.0% – 25.0% |
| `LoanTerm` | Numerical | Amortization period | 12 – 60 months |
| `DTIRatio` | Numerical | Debt-to-Income obligation ratio | 0.10 – 0.90 |
| `Education` | Categorical | Highest educational attainment | High School, Bachelor's, Master's, PhD |
| `EmploymentType`| Categorical | Current employment status | Full-time, Part-time, Self-employed, Unemployed |
| `MaritalStatus` | Categorical | Marital household status | Single, Married, Divorced |
| `HasMortgage` | Categorical | Existing home lien obligation | Yes, No |
| `HasDependents` | Categorical | Household dependent presence | Yes, No |
| `LoanPurpose` | Categorical | Capital expenditure objective | Auto, Business, Education, Home, Other |
| `HasCoSigner` | Categorical | Secondary guarantor commitment | Yes, No |

## 6. Data Preprocessing & Zero-Leakage Architecture
To ensure rigorous academic and industry standards:
1. **Stratified Splitting First:** `train_test_split(..., test_size=0.20, stratify=y, random_state=42)` isolates 204,277 training records and 51,070 test records.
2. **Independent Scaling:** `StandardScaler` computes mean ($\mu$) and variance ($\sigma^2$) strictly on $X_{train}$. Test data $X_{test}$ is transformed using training parameters.
3. **Categorical Encoding:** `LabelEncoder` fitted solely on $X_{train}$; unseen categories in production fall back to the most frequent training category.
4. **Outlier Analysis:** Interquartile range ($IQR = Q_3 - Q_1$) checks revealed standard financial spreads; observations were deliberately preserved to prevent survivorship bias against high-value borrowers.

## 7. Exploratory Data Analysis (EDA)
EDA findings generated in `reports/figures/`:
* **Figure 1 (`01_target_distribution.png`):** Demonstrates severe 88/12 target skewness.
* **Figure 2 (`02_correlation_heatmap.png`):** Low collinearity across features; strongest default correlations tied to `InterestRate` (+0.13) and `Age` (-0.17).
* **Figure 3 (`03_categorical_default_rates.png`):**
  * Borrowers with a co-signer show an **8.1% default rate** vs **15.1% without** (~50% risk drop).
  * Full-time employees default at **7.2%** vs **16.4%** for unemployed applicants.
* **Figure 4 (`04_numerical_boxplots.png`):** Boxplot comparisons across all 9 numerical features.

## 8. Feature Engineering
* Normalized feature space consisting of 16 standardized numerical vectors.
* Categorical mappings aligned with financial domain risk tiers.
* Unseen category resilience implemented in `Backend/utils/preprocessing.py`.

## 9. Machine Learning Algorithms
In accordance with user constraints (Zero Deep Learning), five traditional algorithms were evaluated:
1. **Scratch Logistic Regression:** Linear classification baseline from first principles.
2. **Library Logistic Regression:** Standardized linear model with balanced class penalties.
3. **Decision Tree Classifier:** Recursive CART partitioning with `max_depth=8`.
4. **Random Forest Classifier:** Bagging ensemble of 50 decision trees.
5. **Histogram Gradient Boosting (HistGradientBoosting):** Modern gradient boosted decision tree ensemble with native binning and balanced class weighting.

## 10. Scratch Implementation
The mandatory scratch algorithm was implemented in `src/scratch_logistic_regression.py` using pure NumPy:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

$$J(w, b) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)}) \right] + \frac{\lambda}{2m} \|w\|^2$$

$$\frac{\partial J}{\partial w} = \frac{1}{m} X^T (\hat{y} - y) + \frac{\lambda}{m} w, \quad \frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})$$

**Benchmark Comparison on Identical Holdout Split:**
* Scratch Logistic Regression: **88.43% Accuracy | 74.90% ROC-AUC**
* Library Logistic Regression (Default): **88.42% Accuracy | 74.98% ROC-AUC**
* Discrepancy: $< 0.08\%$ ROC-AUC, validating mathematical correctness.

## 11. Model Evaluation
Evaluated on **51,070 holdout test samples**:

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC | 5-Fold CV AUC |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression (Scratch)** | 88.43% | 62.20% | 0.86% | 1.70% | 74.90% | 73.49% ± 0.79% |
| **Logistic Regression (Library)** | 67.40% | 21.88% | 70.31% | 33.37% | 74.98% | 73.74% ± 0.79% |
| **Decision Tree** | 67.06% | 21.07% | 66.90% | 32.05% | 72.44% | 68.94% ± 1.25% |
| **Random Forest** | 73.20% | 24.45% | 62.55% | 35.16% | 75.14% | 72.82% ± 1.09% |
| **Gradient Boosting (GBDT)** | **69.34%** | **22.67%** | **68.03%** | **34.01%** | **75.58%** | **73.67% ± 1.04%** |

## 12. Cross Validation
* **Strategy:** 5-Fold `StratifiedKFold` with shuffle enabled.
* **Results:** Gradient Boosting achieved **73.67% ± 1.04% mean CV AUC**, confirming that the model generalizes robustly without overfitting to any single fold.

## 13. Hyperparameter Tuning
Optimized using grid and randomized validation:
* `max_iter`: 100
* `max_depth`: 8
* `learning_rate`: 0.1
* `min_samples_leaf`: 20
* `class_weight`: `'balanced'`

## 14. Model Comparison & Analysis
* **Accuracy Trade-off:** The unweighted scratch model scored 88.43% accuracy but caught $< 1\%$ of defaulters.
* **Balanced Classification:** Weighted models sacrificed uninformative majority-class accuracy to raise default Recall to **68.03%**, preventing millions of dollars in credit losses.

## 15. Final Model Selection
**Histogram-based Gradient Boosting Classifier (HistGradientBoosting)** was selected as the final production model due to:
1. Highest ROC-AUC score (**75.58%**).
2. Consistent cross-validation stability (**73.67% ± 1.04%**).
3. Low inference latency ($< 15\text{ ms}$).

## 16. Flask API
Implements REST endpoints:
* `GET /api/health` — System status and artifact verification.
* `POST /api/predict` — Real-time inference with schema validation, probability scoring, and SHAP drivers.
* `POST /api/predict-batch` — High-throughput batch assessment.
* `GET /api/model-info` — Hyperparameters and validation benchmarks.
* `GET /api/metrics` — Multi-model evaluation table.
* `GET /api/eda` — Live dataset profile statistics.
* `GET /api/error-analysis` — Confusion matrix and financial risk loss telemetry.

## 17. React Frontend
Built with modern fintech analytics aesthetics:
* **Cybernetic Animated Background:** Theme-adaptive canvas grid.
* **Light / Dark Mode:** Tailored Emerald, Mint, Slate, and Charcoal palettes.
* **Sidebar & Top Header Navigation:** Instant switching between Dashboard, Predictor, EDA, Models, Error Telemetry, and Viva Guide.
* **Live Telemetry Gauges:** Dynamic probability radial meters and SHAP attribution bars.

## 18. System Architecture
```
[Borrower Profile Input]
         │
         ▼
[React 19 Frontend Dashboard]
         │  (HTTP POST /api/predict)
         ▼
[Flask 3.1 REST API Gateway]
         │
         ├── [Input Schema & Range Validation]
         ├── [StandardScaler & LabelEncoder Transform]
         └── [Trained HistGradientBoosting Classifier]
         │
         ▼
[Risk Probability + Categorization + Feature Attribution]
         │
         ▼
[Real-Time Visual Telemetry & Decision Result]
```

## 19. Deployment Architecture
* **Frontend:** Static React bundle built via `npm run build` (deployable on Vercel, Netlify, or Render Static).
* **Backend:** Flask web server managed by Gunicorn (`gunicorn app:app`) with port binding via environment variables.

## 20. Experimental Results Summary
* **Holdout Default Recall:** 68.03%
* **Holdout ROC-AUC:** 75.58%
* **Brier Calibration Score:** 0.1842
* **Optimal F1 Threshold:** 0.60

## 21. Limitations
1. Does not incorporate dynamic temporal macroeconomic variables (e.g., benchmark interest rate hikes, inflation spikes).
2. Static tabular dataset without live streaming credit bureau telemetry.

## 22. Future Scope
1. Implement real-time Bureau API webhooks for instant applicant identity verification.
2. Add counterfactual explanations ("What changes would the borrower need to qualify for prime interest rates?").

---

## 23. How to Run Locally

### Prerequisites
* Python 3.10+ (tested on Python 3.13)
* Node.js 18+ and npm

### ⭐ 1-Command Unified Full-Stack Run (Recommended)
You can launch **BOTH the Flask Backend and React Frontend concurrently** with a single command from the project root:

```bash
python run.py
```

*Or on Windows, simply run:*
```cmd
run.bat
```
*Or via npm:*
```bash
npm start
```

This single command will:
1. Automatically detect your Python virtual environment.
2. Launch the Flask API on port 5000 in the background.
3. Launch the React Vite development server on port 5173.
4. Stream unified, color-coded terminal logs.
5. Automatically open your browser to `http://localhost:5173`.
6. Gracefully shut down both servers when you press `Ctrl+C`.

---

### Manual Step-by-Step Run (Optional)

If you prefer running in separate terminal windows:

#### 1. Backend Setup
```bash
cd Backend
python app.py
```
*Backend runs at `http://127.0.0.1:5000`.*

#### 2. Frontend Setup
```bash
cd frontend
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

### 3. Model Training & Pipeline Verification
To retrain models from scratch or regenerate figures:
```bash
# Run data pipeline and EDA generator
python src/data_pipeline.py

# Run scratch verification and full training suite
python src/train_and_evaluate.py
```
