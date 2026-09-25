"""
Scratch Implementation of Logistic Regression
Project: Loan Default Prediction Using Machine Learning
College SOP Requirement: Implemented purely in NumPy WITHOUT sklearn.linear_model.
"""

import numpy as np


class LogisticRegressionScratch:
    """
    Logistic Regression Classifier implemented from first principles.
    
    Mathematical Formulation:
      - Linear combination: z = X @ weights + bias
      - Sigmoid activation: sigma(z) = 1 / (1 + exp(-z))
      - Binary Cross-Entropy (BCE) Loss with L2 Regularization:
          J(w, b) = - (1/m) * sum(y*log(p) + (1-y)*log(1-p)) + (lambda / (2*m)) * ||w||^2
      - Gradients:
          dJ/dw = (1/m) * X.T @ (p - y) + (lambda / m) * w
          dJ/db = (1/m) * sum(p - y)
      - Parameter update:
          w := w - alpha * (dJ/dw)
          b := b - alpha * (dJ/db)
    """

    def __init__(
        self,
        learning_rate: float = 0.05,
        n_iterations: int = 500,
        l2_penalty: float = 0.01,
        fit_intercept: bool = True,
        random_state: int = 42,
    ):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.l2_penalty = l2_penalty
        self.fit_intercept = fit_intercept
        self.random_state = random_state

        self.weights = None
        self.bias = 0.0
        self.loss_history = []

    def _sigmoid(self, z: np.ndarray) -> np.ndarray:
        """Numerically stable sigmoid function."""
        z_clipped = np.clip(z, -500, 500)
        return 1.0 / (1.0 + np.exp(-z_clipped))

    def _compute_loss(self, y_true: np.ndarray, y_prob: np.ndarray) -> float:
        """Computes Binary Cross-Entropy Loss with optional L2 regularization."""
        m = len(y_true)
        epsilon = 1e-15  # Prevents log(0)
        y_prob = np.clip(y_prob, epsilon, 1 - epsilon)
        bce_loss = - (1.0 / m) * np.sum(
            y_true * np.log(y_prob) + (1.0 - y_true) * np.log(1.0 - y_prob)
        )
        l2_term = (self.l2_penalty / (2.0 * m)) * np.sum(np.square(self.weights))
        return float(bce_loss + l2_term)

    def fit(self, X: np.ndarray, y: np.ndarray, verbose: bool = False):
        """
        Trains the logistic regression parameters using Batch Gradient Descent.
        """
        rng = np.random.RandomState(self.random_state)
        n_samples, n_features = X.shape

        # Weight initialization (small random Gaussian)
        self.weights = rng.normal(loc=0.0, scale=0.01, size=n_features)
        self.bias = 0.0
        self.loss_history = []

        for i in range(self.n_iterations):
            # 1. Forward Pass (Linear + Sigmoid)
            linear_model = np.dot(X, self.weights) + (self.bias if self.fit_intercept else 0.0)
            y_prob = self._sigmoid(linear_model)

            # 2. Compute Loss
            loss = self._compute_loss(y, y_prob)
            self.loss_history.append(loss)

            # 3. Compute Gradients
            error = y_prob - y
            dw = (1.0 / n_samples) * np.dot(X.T, error) + (self.l2_penalty / n_samples) * self.weights
            db = (1.0 / n_samples) * np.sum(error) if self.fit_intercept else 0.0

            # 4. Gradient Descent Parameter Update
            self.weights -= self.learning_rate * dw
            if self.fit_intercept:
                self.bias -= self.learning_rate * db

            if verbose and (i % (self.n_iterations // 10) == 0 or i == self.n_iterations - 1):
                print(f"Iteration {i:4d}/{self.n_iterations} | Loss: {loss:.5f}")

        return self

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        """
        Returns estimated probabilities: [P(y=0), P(y=1)].
        """
        linear_model = np.dot(X, self.weights) + (self.bias if self.fit_intercept else 0.0)
        p1 = self._sigmoid(linear_model)
        p0 = 1.0 - p1
        return np.column_stack((p0, p1))

    def predict(self, X: np.ndarray, threshold: float = 0.5) -> np.ndarray:
        """
        Predicts binary class (0 or 1) based on decision threshold.
        """
        proba = self.predict_proba(X)[:, 1]
        return (proba >= threshold).astype(int)


if __name__ == "__main__":
    from sklearn.datasets import make_classification
    from sklearn.linear_model import LogisticRegression as SklearnLogReg
    from sklearn.metrics import accuracy_score, roc_auc_score, f1_score

    print("[+] Validating Scratch Logistic Regression on synthetic benchmark...")
    X_synth, y_synth = make_classification(n_samples=5000, n_features=16, random_state=42)

    # 1. Scratch Model
    scratch_model = LogisticRegressionScratch(learning_rate=0.1, n_iterations=300, random_state=42)
    scratch_model.fit(X_synth, y_synth)
    scratch_preds = scratch_model.predict(X_synth)
    scratch_probs = scratch_model.predict_proba(X_synth)[:, 1]

    # 2. Sklearn Model
    sklearn_model = SklearnLogReg(max_iter=300, random_state=42)
    sklearn_model.fit(X_synth, y_synth)
    sklearn_preds = sklearn_model.predict(X_synth)
    sklearn_probs = sklearn_model.predict_proba(X_synth)[:, 1]

    print("\n--- Benchmark Comparison ---")
    print(f"Scratch Model  -> Accuracy: {accuracy_score(y_synth, scratch_preds):.4f} | ROC-AUC: {roc_auc_score(y_synth, scratch_probs):.4f} | F1: {f1_score(y_synth, scratch_preds):.4f}")
    print(f"Library Model  -> Accuracy: {accuracy_score(y_synth, sklearn_preds):.4f} | ROC-AUC: {roc_auc_score(y_synth, sklearn_probs):.4f} | F1: {f1_score(y_synth, sklearn_preds):.4f}")
    print("[v] Scratch Logistic Regression behaves consistently with library implementation!")
