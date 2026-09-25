import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  BookOpen,
  Code2,
  Server,
  Cpu,
  Target,
  FileText,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AboutProject = () => {
  const navigate = useNavigate();

  const vivaQuestions = [
    {
      category: "1. Problem & Dataset",
      q: "What is loan default and why is predicting it important?",
      a: "Loan default happens when a borrower fails to meet the legal obligations of a loan agreement (typically 90+ days delinquent). Predicting it enables banks to assess credit risk before disbursing capital, price interest rates accurately, minimize bad debt write-offs, and maintain required regulatory capital reserves."
    },
    {
      category: "1. Problem & Dataset",
      q: "Why is this a classification problem rather than regression?",
      a: "The primary objective is categorical: determining whether a borrower will default (Class 1) or successfully repay (Class 0). While regression predicts continuous values (e.g., loss given default), underwriting decisions are binary credit approval choices."
    },
    {
      category: "2. Data Preprocessing & Leakage",
      q: "What is Data Leakage and how did you prevent it?",
      a: "Data leakage happens when information from outside the training dataset (such as test set mean or scale) is used to fit models. We strictly executed train_test_split FIRST with stratification, then fitted StandardScaler and LabelEncoders exclusively on X_train, and only transformed X_test."
    },
    {
      category: "2. Data Preprocessing & Leakage",
      q: "Why did you not blindly eliminate numerical outliers?",
      a: "In financial risk, high income (e.g. $149K) or high loan requests (e.g. $249K) represent viable, highly profitable customer segments. Discarding them with standard 1.5 × IQR rules introduces survivorship bias and distorts the true distribution of high-value credit applications."
    },
    {
      category: "3. ML Algorithms & Scratch Model",
      q: "Why did you implement Logistic Regression from scratch?",
      a: "To prove mastery of mathematical foundations without relying on sklearn. We manually formulated the Sigmoid activation σ(z) = 1/(1+e^-z), Binary Cross-Entropy loss with L2 regularization, computed partial derivatives ∂J/∂w and ∂J/∂b, and updated weights via Batch Gradient Descent."
    },
    {
      category: "3. ML Algorithms & Scratch Model",
      q: "Why does the Scratch model have 88% accuracy but low Recall?",
      a: "The raw dataset has an 88/12 class imbalance. Without class weighting, standard threshold 0.5 minimizes loss by predicting the majority class (Non-Default). When class balancing (class_weight='balanced') is added to library models, Recall jumps to 68-70%, capturing the high-risk defaults."
    },
    {
      category: "4. Evaluation & Metrics",
      q: "Why is Accuracy a misleading metric for loan default?",
      a: "Because an unintelligent model predicting 'Non-Default' 100% of the time achieves 88.39% accuracy while missing every single defaulter. In loan default, Recall (Sensitivity) and ROC-AUC are paramount to ensure defaults are detected and credit losses prevented."
    },
    {
      category: "4. Evaluation & Metrics",
      q: "What is the difference between False Positives and False Negatives here?",
      a: "A False Negative approves a borrower who will default (costing the bank ~$127,500 average loan loss). A False Positive denies a creditworthy borrower (costing ~$17,210 in lost interest profit). A False Negative is roughly 7.4 times more costly to a financial institution."
    },
    {
      category: "5. Deployment & Architecture",
      q: "How does the React frontend communicate with the Flask backend?",
      a: "The React single-page app captures borrower parameters, validates client-side input types, and sends a JSON POST request to the Flask REST API endpoint (/api/predict). Flask validates the schema, passes data through the saved StandardScaler and LabelEncoders, executes model inference via HistGradientBoosting, and returns probabilities, risk tier, and feature drivers in JSON format."
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
      <Navbar />

      <main className="w-[min(1280px,94%)] mx-auto pt-8 sm:pt-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-emerald-900/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
              <BookOpen size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>College SOP Documentation & Viva Reference</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Project Architecture & Viva Voce Guide
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Complete academic summary fulfilling College ML SOP requirements: zero deep learning constraint, mathematical scratch formulations, and viva defense answers.
            </p>
          </div>

          <button
            onClick={() => navigate("/prediction")}
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer shadow-md self-start md:self-center"
          >
            <Sparkles size={14} />
            <span>Launch Prediction Console</span>
          </button>
        </div>

        {/* ================= ARCHITECTURE PIPELINE ================= */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Server size={18} className="text-emerald-600" />
            <span>End-to-End System Architecture Flow</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Modular decoupled architecture separating analytical inference from presentation state.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">1. Client</span>
              <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mt-1">React 19 UI</strong>
              <small className="text-[11px] text-slate-500">Applicant Form</small>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">2. Transport</span>
              <strong className="text-teal-700 dark:text-teal-400 font-bold block mt-1">HTTP REST</strong>
              <small className="text-[11px] text-slate-500">JSON Payload</small>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">3. Gateway</span>
              <strong className="text-green-700 dark:text-green-400 font-bold block mt-1">Flask 3.1</strong>
              <small className="text-[11px] text-slate-500">Range & Type Check</small>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">4. Pipeline</span>
              <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mt-1">Preprocessing</strong>
              <small className="text-[11px] text-slate-500">Zero-Leak Scaler</small>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">5. Inference</span>
              <strong className="text-teal-700 dark:text-teal-400 font-bold block mt-1">GBDT Classifier</strong>
              <small className="text-[11px] text-slate-500">75.58% ROC-AUC</small>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">6. Output</span>
              <strong className="text-green-700 dark:text-green-400 font-bold block mt-1">Risk Telemetry</strong>
              <small className="text-[11px] text-slate-500">Prob & SHAP Drivers</small>
            </div>
          </div>
        </div>

        {/* ================= STRICT TRADITIONAL ML CONSTRAINT BANNER ================= */}
        <div className="mt-6 p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                Traditional Machine Learning Constraint Enforced (Zero Deep Learning)
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                As required by the user, this project does NOT use Neural Networks, CNN, RNN, LSTM, PyTorch, TensorFlow, or Keras. Instead, Weeks 9–12 have been adapted to advanced traditional machine learning: <strong>Asymmetric Cost Risk Matrices, Decision Threshold Optimization, Probability Calibration (Brier Score), Stratified Cross-Validation, and Explainable Credit Risk Feature Attribution</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* ================= VIVA PREPARATION QUESTIONS ================= */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Code2 size={20} className="text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Viva Voce Defense Cheat-Sheet
            </h2>
          </div>

          <div className="space-y-4">
            {vivaQuestions.map((item, idx) => (
              <div
                key={idx}
                className="hover-card p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-xs"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 mb-1">
                  <span>{item.category}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Q: {item.q}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-100 dark:border-white/10">
                  <strong className="text-emerald-700 dark:text-emerald-400 font-mono">Answer: </strong>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutProject;
