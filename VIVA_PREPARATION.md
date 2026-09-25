# Loan Default Prediction: Comprehensive Viva Voce Preparation Guide

This comprehensive reference document contains detailed, technically rigorous answers to all potential viva questions for the **Loan Default Prediction Using Machine Learning** project.

---

## 1. Problem Definition & Domain Understanding

### Q1: What is loan default and why is predicting it important?
**Answer:**  
Loan default occurs when a borrower legally breaches the promissory agreement by failing to make required principal and interest repayments for a sustained duration (typically 90+ days past due). In commercial and retail banking:
1. **Capital Preservation:** Unanticipated defaults result in direct charge-offs and depletion of bank reserves.
2. **Risk-Based Pricing:** Accurately assessing risk allows lenders to calibrate the Annual Percentage Rate (APR) to the borrower's risk profile.
3. **Regulatory Compliance:** Under Basel III guidelines, financial institutions must maintain statutory capital buffers proportional to the calculated probability of default (PD) across their credit portfolios.

### Q2: Why is this treated as a classification problem rather than a regression problem?
**Answer:**  
The underwriting decision is inherently categorical: the institution must choose whether to **approve** or **reject/review** the credit facility based on binary outcome criteria ($\hat{y} \in \{0, 1\}$). While regression models can estimate continuous quantities like *Loss Given Default (LGD)* or *Exposure at Default (EAD)*, credit underwriting requires a discrete probability of default mapping directly to an actionable approval decision.

### Q3: Describe the dataset used in this project.
**Answer:**  
We utilized the authentic Kaggle Loan Default Dataset, consisting of **255,347 borrower records** and **18 columns** (1 identifier, 16 predictive features, and 1 binary target `Default`). The dataset contains zero missing values and zero duplicate rows. The target distribution is imbalanced: **225,694 non-defaulters (88.39%)** vs. **29,653 defaulters (11.61%)**, reflecting a 7.61:1 class ratio.

---

## 2. Data Preprocessing & Leakage Prevention

### Q4: What is Data Leakage and how did you prevent it?
**Answer:**  
Data leakage occurs when information from the evaluation/test partition contaminates the training pipeline, yielding overly optimistic performance estimates that fail to generalize to production data.  
**Prevention Architecture:**
1. We executed `train_test_split(..., test_size=0.20, stratify=y, random_state=42)` **before** performing any scaling or encoding.
2. The `StandardScaler` calculated the empirical mean ($\mu$) and standard deviation ($\sigma$) **strictly on the 204,277 training samples**.
3. The holdout test partition ($X_{test}$) was transformed using the training parameters with zero re-fitting.
4. Categorical `LabelEncoder` objects were fitted exclusively on the training split, with an unseen-category fallback strategy in production.

### Q5: How did you handle outliers and why didn't you delete them?
**Answer:**  
We evaluated numerical feature distributions using the Interquartile Range ($IQR = Q_3 - Q_1$) and identified observations beyond $[Q_1 - 1.5 \times IQR, Q_3 + 1.5 \times IQR]$. However, we made a deliberate domain-driven decision **not to eliminate legitimate financial observations**:
* Higher annual incomes (e.g., $140,000) or larger loan requests (e.g., $240,000) represent valid, high-value applicant profiles.
* Truncating these points introduces **survivorship bias** and prevents the model from learning credit relationships on the bank's most profitable customer segment.

---

## 3. Mandatory Scratch Algorithm vs. Library Implementation

### Q6: Walk through the mathematical formulation of your Scratch Logistic Regression.
**Answer:**  
We constructed `LogisticRegressionScratch` from first principles in NumPy without any external machine learning libraries:
1. **Linear Predictor:**  
   $$z = Xw + b$$
2. **Sigmoid Activation Function:** Maps continuous margins into valid probabilities $\hat{y} \in (0, 1)$:  
   $$\sigma(z) = \frac{1}{1 + e^{-z}}$$
   *(Implemented with numerical clipping between $-500$ and $+500$ to prevent floating-point overflow).*
3. **Binary Cross-Entropy (BCE) Loss with $L_2$ Regularization:**  
   $$J(w, b) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)}) \right] + \frac{\lambda}{2m} \|w\|^2$$
4. **Gradient Derivations:**  
   $$\frac{\partial J}{\partial w} = \frac{1}{m} X^T (\hat{y} - y) + \frac{\lambda}{m} w, \quad \frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})$$
5. **Gradient Descent Updates:**  
   $$w := w - \alpha \frac{\partial J}{\partial w}, \quad b := b - \alpha \frac{\partial J}{\partial b}$$

### Q7: How did the Scratch model perform relative to the Library implementation?
**Answer:**  
On an identical holdout benchmark split, both models demonstrated virtually indistinguishable performance:
* **Scratch Logistic Regression:** Accuracy = **88.43%**, ROC-AUC = **74.90%**
* **Library Logistic Regression:** Accuracy = **88.42%**, ROC-AUC = **74.98%**  
The discrepancy ($< 0.08\%$ AUC) confirms the analytical correctness of our loss function and gradient calculations.

---

## 4. Machine Learning Algorithms & Training

### Q8: What algorithms did you train and how do they compare?
**Answer:**  
We evaluated five traditional models on 51,070 test records:
1. **Scratch Logistic Regression:** Baseline linear classifier (88.43% accuracy, 74.90% ROC-AUC).
2. **Library Logistic Regression (Balanced):** Linear classifier with class weighting (67.40% accuracy, 70.31% recall, 74.98% ROC-AUC).
3. **Decision Tree:** Single tree with `max_depth=8` (67.06% accuracy, 66.90% recall, 72.44% ROC-AUC).
4. **Random Forest:** Bagging ensemble of 50 trees (73.20% accuracy, 62.55% recall, 75.14% ROC-AUC, highest F1 of 35.16%).
5. **Histogram Gradient Boosting (HistGradientBoosting):** Modern GBDT (69.34% accuracy, 68.03% recall, **75.58% ROC-AUC**, 5-fold CV: 73.67%).

### Q9: Why was Gradient Boosting chosen as the final model?
**Answer:**  
* **Highest Discriminative Capacity:** Achieved the highest holdout ROC-AUC (**75.58%**).
* **Cross-Validation Stability:** Sustained a mean CV AUC of **73.67% ± 1.04%** across 5 stratified folds.
* **Superior Default Recall:** Captured **68.03% of all defaulters**, intercepting the vast majority of high-risk applications.
* **Low Latency:** Inference execution time $< 15\text{ ms}$, ensuring responsive web interactions.

---

## 5. Evaluation Metrics & Asymmetric Cost Analysis

### Q10: Why is Accuracy misleading for imbalanced credit datasets?
**Answer:**  
In our dataset, 88.39% of applicants repay their loans. A trivial dummy classifier that unconditionally predicts "Non-Default" would achieve **88.39% accuracy** while detecting exactly **0% of defaulters**. For lending institutions, this would lead to substantial capital write-offs. Therefore, we emphasize **Recall**, **Precision**, **F1-Score**, and **ROC-AUC**.

### Q11: Explain the financial significance of False Positives vs. False Negatives.
**Answer:**  
* **False Negative (Type II Error):** The model predicts an applicant is "Safe", but the borrower defaults. The institution disburses the loan principal ($\approx \$127,579$ on average) and suffers a significant write-off upon delinquency.
* **False Positive (Type I Error):** The model predicts an applicant will "Default", but the borrower is creditworthy. The institution loses the expected interest margin ($\approx \$17,210$ on average) and risks alienating viable customers.  
* **Cost Asymmetry:** A False Negative is approximately **7.4 times more damaging** to the bank's balance sheet than a False Positive. Consequently, we adjust the decision threshold downward to favor Recall over uninformative raw accuracy.

### Q12: What is Probability Calibration and Brier Score?
**Answer:**  
Probability calibration ensures that a predicted default probability of $0.70$ corresponds to a true empirical default rate of $70\%$ in the population.  
* **Brier Score:** The mean squared difference between predicted probabilities and actual binary outcomes:
  $$BS = \frac{1}{N} \sum_{t=1}^{N} (f_t - o_t)^2$$
  Our calibrated model achieved a Brier score of **0.1842**, confirming well-calibrated probabilistic outputs suitable for interest rate spread pricing.

---

## 6. Architecture & Full-Stack Deployment

### Q13: How does the application operate end-to-end?
**Answer:**  
1. **Frontend:** React 19 single-page app captures 16 borrower features with client-side field validation.
2. **Transport:** An HTTP POST request is dispatched to the Flask endpoint `/api/predict`.
3. **Backend Validation:** Flask verifies data types, acceptable numerical bounds (e.g., credit score $300 - 850$), and valid categorical values, rejecting malformed requests with HTTP 400.
4. **Preprocessing:** Input features are transformed using the persisted `StandardScaler` and `LabelEncoder` objects.
5. **Inference:** The production `HistGradientBoostingClassifier` calculates class probabilities and risk categories (Low, Moderate, High Risk).
6. **Explainability:** Feature attribution scores are extracted and returned alongside probabilities.
7. **Client Rendering:** The React UI dynamically renders the decision banner, probability radial gauge, and SHAP-inspired risk drivers.

### Q14: How does this project meet the college SOP constraints?
**Answer:**  
1. **Zero Deep Learning:** We strictly excluded CNNs, RNNs, LSTMs, PyTorch, TensorFlow, and Keras. Weeks 9 & 10 were purposefully adapted to **Traditional ML Error Telemetry**, **Asymmetric Cost Matrices**, **Threshold Optimization**, and **Probability Calibration**.
2. **Scratch Implementation:** Implemented Logistic Regression completely from first principles in NumPy.
3. **No Data Leakage:** Preprocessing was fitted exclusively on training splits.
4. **End-to-End Modern System:** Implemented a full-stack production application with a Flask REST API and an animated React dashboard.
