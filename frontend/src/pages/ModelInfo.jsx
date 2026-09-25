import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Database,
  Layers,
  CheckCircle2,
  Cpu,
  Target,
  Sparkles,
  BarChart3,
  Sliders,
  Code2,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ModelInfo = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState("Gradient Boosting");

  const modelsBenchmark = [
    {
      name: "Logistic Regression (Scratch)",
      type: "First-Principles Scratch (NumPy)",
      accuracy: 88.43,
      precision: 62.20,
      recall: 0.86,
      f1: 1.70,
      rocAuc: 74.90,
      cvAuc: "73.49 ± 0.79",
      time: "0.20s",
      note: "Standard 0.5 threshold without class weighting (majority class high accuracy).",
    },
    {
      name: "Logistic Regression (Library)",
      type: "scikit-learn (Balanced Weights)",
      accuracy: 67.40,
      precision: 21.88,
      recall: 70.31,
      f1: 33.37,
      rocAuc: 74.98,
      cvAuc: "73.74 ± 0.79",
      time: "0.45s",
      note: "Class balancing enables high recall (70.31%) to capture default occurrences.",
    },
    {
      name: "Decision Tree",
      type: "CART Decision Tree (Max Depth 8)",
      accuracy: 67.06,
      precision: 21.07,
      recall: 66.90,
      f1: 32.05,
      rocAuc: 72.44,
      cvAuc: "68.94 ± 1.25",
      time: "1.10s",
      note: "Transparent rule partitioning; prone to moderate variance across folds.",
    },
    {
      name: "Random Forest",
      type: "Bootstrap Ensemble (50 Trees)",
      accuracy: 73.20,
      precision: 24.45,
      recall: 62.55,
      f1: 35.16,
      rocAuc: 75.14,
      cvAuc: "72.82 ± 1.09",
      time: "5.80s",
      note: "Highest F1 harmonic balance (35.16%) with robust bagging variance reduction.",
    },
    {
      name: "Gradient Boosting",
      type: "Histogram GBDT (Production Best)",
      accuracy: 69.34,
      precision: 22.67,
      recall: 68.03,
      f1: 34.01,
      rocAuc: 75.58,
      cvAuc: "73.67 ± 1.04",
      time: "1.90s",
      note: "Highest overall ROC-AUC (75.58%) with strong probability calibration.",
    },
  ];

  const featureDrivers = [
    { name: "Interest Rate APR", importance: 21.4, note: "Compounding monthly cost of capital" },
    { name: "Applicant Age", importance: 17.8, note: "Life-stage credit profile stability" },
    { name: "Annual Income", importance: 15.6, note: "Primary debt service repayment capacity" },
    { name: "Loan Amount", importance: 14.2, note: "Total principal balance at risk" },
    { name: "Credit Score (FICO)", importance: 12.1, note: "Historical delinquency indicator" },
    { name: "Months Employed", importance: 8.4, note: "Workplace continuity and liquidity" },
    { name: "DTIRatio (DTI)", importance: 5.7, note: "Existing monthly commitments" },
    { name: "Loan Purpose", importance: 2.1, note: "Capital allocation type" },
    { name: "Co-Signer Guarantee", importance: 1.8, note: "Secondary recovery backstop" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
      <Navbar />

      <main className="w-[min(1280px,94%)] mx-auto pt-8 sm:pt-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-emerald-900/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
              <Brain size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>Model Telemetry & Benchmarks • Weeks 3, 4, 5</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Model Architecture & Empirical Benchmarks
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Comparative holdout evaluation on 51,070 test records. Verified Scratch Logistic Regression vs. Library classifiers with 5-Fold Stratified Cross-Validation.
            </p>
          </div>

          <button
            onClick={() => navigate("/prediction")}
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer shadow-md self-start md:self-center"
          >
            <Sparkles size={14} />
            <span>Test Live Predictor</span>
          </button>
        </div>

        {/* ================= ACTIVE PRODUCTION MODEL HERO ================= */}
        <div className="hover-card mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Cpu size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                  PRODUCTION BEST MODEL
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  5-Fold CV: 73.67% ± 1.04%
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Histogram-based Gradient Boosting Classifier (HistGradientBoosting)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-normal">
                Trained on 204,277 training records with zero data leakage. Evaluated on 51,070 holdout samples. Achieved 75.58% ROC-AUC and 68.03% Recall on defaults.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold flex-shrink-0 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MODEL READY (ONLINE)</span>
          </div>
        </div>

        {/* ================= MODEL COMPARISON TABLE ================= */}
        <div className="mt-8 hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Empirical Model Benchmark Comparison
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exact test set metrics evaluated on 51,070 holdout records (Stratified 80/20 split).
              </p>
            </div>

            <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
              * Mandated Scratch Algorithm vs Library Included
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="pb-3 font-bold font-sans">MODEL ALGORITHM</th>
                  <th className="pb-3 font-bold">ACCURACY</th>
                  <th className="pb-3 font-bold">PRECISION</th>
                  <th className="pb-3 font-bold">RECALL</th>
                  <th className="pb-3 font-bold">F1-SCORE</th>
                  <th className="pb-3 font-bold text-emerald-600 dark:text-emerald-400">ROC-AUC</th>
                  <th className="pb-3 font-bold">5-FOLD CV AUC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {modelsBenchmark.map((m, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-950/60 transition-colors ${
                      m.name === "Gradient Boosting" ? "bg-emerald-50/40 dark:bg-emerald-950/20 font-bold" : ""
                    }`}
                  >
                    <td className="py-4">
                      <strong className="text-slate-900 dark:text-white font-sans text-xs block">
                        {m.name}
                      </strong>
                      <span className="text-[10px] text-slate-500 font-mono">{m.type}</span>
                    </td>
                    <td className="py-4 text-slate-900 dark:text-white">{m.accuracy.toFixed(2)}%</td>
                    <td className="py-4 text-slate-900 dark:text-white">{m.precision.toFixed(2)}%</td>
                    <td className="py-4 text-emerald-600 dark:text-emerald-400 font-bold">{m.recall.toFixed(2)}%</td>
                    <td className="py-4 text-slate-900 dark:text-white">{m.f1.toFixed(2)}%</td>
                    <td className="py-4 font-black text-emerald-700 dark:text-emerald-300 text-sm">
                      {m.rocAuc.toFixed(2)}%
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">{m.cvAuc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MANDATORY SCRATCH COMPARISON SECTION ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={20} className="text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Mandatory Scratch vs. Library Implementation
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              College SOP mandates at least one algorithm built from first principles without <code>scikit-learn</code>. We implemented Logistic Regression using pure NumPy.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Mathematical Formulation:</span>
                <span className="text-emerald-600 font-bold">&sigma;(z) = 1 / (1 + e^-z)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Loss Function:</span>
                <span className="text-teal-600 font-bold">Binary Cross-Entropy (BCE) + L2</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Optimization:</span>
                <span className="text-green-600 font-bold">Batch Gradient Descent</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500">Scratch vs Library AUC:</span>
                <span className="text-slate-900 dark:text-white font-bold">74.90% vs 74.98% (&Delta; 0.08%)</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
              <strong>Validation Verdict:</strong>
              The scratch model achieves mathematically equivalent convergence to scikit-learn on the benchmark split, confirming correct loss and gradient formulations.
            </div>
          </div>

          {/* ================= FEATURE IMPORTANCE ================= */}
          <div className="hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Explainable AI: Top Credit Risk Drivers
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Attribution weights extracted from the trained model identifying the primary catalysts for borrower credit risk.
              </p>

              <div className="space-y-3">
                {featureDrivers.slice(0, 6).map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{item.importance}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: `${item.importance * 3.5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Primary Risk Driver: <strong>Interest Rate (APR)</strong></span>
              <span>Protective Factor: <strong>High FICO & Income</strong></span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModelInfo;