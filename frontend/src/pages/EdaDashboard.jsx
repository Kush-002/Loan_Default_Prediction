import { useState } from "react";
import {
  Database,
  BarChart3,
  PieChart,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EdaDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("target");

  const categoricalRates = [
    { category: "High School", defaultRate: 15.2, total: "63.8K" },
    { category: "Bachelor's", defaultRate: 11.6, total: "64.1K" },
    { category: "Master's", defaultRate: 9.8, total: "63.7K" },
    { category: "PhD", defaultRate: 8.5, total: "63.7K" },
    { category: "Unemployed", defaultRate: 16.4, total: "63.9K" },
    { category: "Part-time", defaultRate: 12.8, total: "63.8K" },
    { category: "Self-employed", defaultRate: 10.1, total: "63.8K" },
    { category: "Full-time", defaultRate: 7.2, total: "63.8K" },
    { category: "Single", defaultRate: 13.9, total: "85.1K" },
    { category: "Divorced", defaultRate: 12.1, total: "85.2K" },
    { category: "Married", defaultRate: 8.8, total: "85.0K" },
    { category: "No Mortgage", defaultRate: 13.2, total: "127.6K" },
    { category: "Has Mortgage", defaultRate: 10.0, total: "127.7K" },
    { category: "No Co-Signer", defaultRate: 15.1, total: "127.6K" },
    { category: "Has Co-Signer", defaultRate: 8.1, total: "127.7K" },
  ];

  const numericalFeatures = [
    { name: "Age", mean: "43.5 yrs", min: "18", max: "69", iqr: "25", outliers: "0 (0.0%)", insight: "Uniform age distribution across adult credit range." },
    { name: "Income", mean: "$82,499", min: "$15,000", max: "$149,999", iqr: "$67,393", outliers: "0 (0.0%)", insight: "Strong protective effect against default as income rises." },
    { name: "LoanAmount", mean: "$127,579", min: "$5,000", max: "$249,999", iqr: "$122,829", outliers: "0 (0.0%)", insight: "Higher loan balances linearly increase total default risk exposure." },
    { name: "CreditScore", mean: "574.3", min: "300", max: "849", iqr: "275", outliers: "0 (0.0%)", insight: "Prime predictor: lower credit tiers exhibit steep default spikes." },
    { name: "MonthsEmployed", mean: "59.5 mos", min: "0", max: "119", iqr: "60", outliers: "0 (0.0%)", insight: "Employment longevity provides repayment stability." },
    { name: "InterestRate", mean: "13.49%", min: "2.0%", max: "25.0%", iqr: "11.48%", outliers: "0 (0.0%)", insight: "High APR creates compounding debt burden on borrowers." },
    { name: "DTIRatio", mean: "0.50", min: "0.10", max: "0.90", iqr: "0.40", outliers: "0 (0.0%)", insight: "Debt-to-Income directly reflects monthly liquidity headroom." },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
      <Navbar />

      <main className="w-[min(1280px,94%)] mx-auto pt-8 sm:pt-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-emerald-900/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
              <BarChart3 size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>Exploratory Data Analysis (EDA) • Weeks 1 & 2</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Dataset Profiling & Financial Risk Telemetry
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              In-depth statistical validation of the authentic Kaggle Loan Default Dataset (255,347 records). Class distributions, correlation matrices, and IQR outlier boundaries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/prediction")}
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer shadow-md"
            >
              <Sparkles size={14} />
              <span>Test Live Predictor</span>
            </button>
          </div>
        </div>

        {/* ================= KEY KPI CARDS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="hover-card p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Sample Records</span>
              <Database size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">255,347</div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">100% Validated Kaggle DB</span>
          </div>

          <div className="hover-card p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Feature Attributes</span>
              <Layers size={16} className="text-teal-600 dark:text-teal-400" />
            </div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">16 Inputs</div>
            <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">9 Numerical + 7 Categorical</span>
          </div>

          <div className="hover-card p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Target Imbalance</span>
              <PieChart size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">11.61% Default</div>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">7.61 : 1 Non-Default Ratio</span>
          </div>

          <div className="hover-card p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Data Quality Index</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">0 Missing</div>
            <span className="text-[11px] font-mono text-emerald-600 font-semibold">0 Duplicates • Clean Baseline</span>
          </div>
        </div>

        {/* ================= TAB NAVIGATION ================= */}
        <div className="flex items-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-900/30 w-fit">
          <button
            onClick={() => setActiveTab("target")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "target"
                ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Target Imbalance (88/12)
          </button>
          <button
            onClick={() => setActiveTab("categorical")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "categorical"
                ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Categorical Default Propensities
          </button>
          <button
            onClick={() => setActiveTab("numerical")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "numerical"
                ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Numerical Distributions & IQR Bounds
          </button>
        </div>

        {/* ================= TAB 1: TARGET CLASS DISTRIBUTION ================= */}
        {activeTab === "target" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Binary Outcome Class Imbalance Analysis
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Real-world loan default datasets exhibit high class skewness because the vast majority of commercial borrowers meet their monthly payment obligations.
              </p>

              {/* Class Visualizer Bars */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-mono font-semibold mb-1.5">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>Class 0: Non-Default (Safe Repayment)</span>
                    </span>
                    <strong className="text-emerald-700 dark:text-emerald-400">225,694 (88.39%)</strong>
                  </div>
                  <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-emerald-900/20">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: "88.39%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-semibold mb-1.5">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span>Class 1: Default (Credit Breach / Write-Off)</span>
                    </span>
                    <strong className="text-red-600 dark:text-red-400">29,653 (11.61%)</strong>
                  </div>
                  <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-emerald-900/20">
                    <div className="h-full bg-gradient-to-r from-red-500 to-rose-600" style={{ width: "11.61%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <AlertTriangle size={15} />
                  <span>SOP Requirement: Why Class Balancing is Mandatory</span>
                </div>
                If a naive model simply predicts "Non-Default" for every borrower, it would achieve 88.39% accuracy while catching 0% of defaulters, resulting in catastrophic banking losses. Therefore, we utilize <code>class_weight='balanced'</code> and decision threshold optimization.
              </div>
            </div>

            <div className="hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Zero Data Leakage Validation Architecture
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  College SOP rigorously mandates no test-set information influences preprocessing or model training.
                </p>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block mb-1">STEP 1: Stratified Split First</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      <code>train_test_split(..., test_size=0.2, stratify=y, random_state=42)</code> isolates 51,070 holdout test samples before any fitting occurs.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">STEP 2: Scaler Fitted Exclusively on X_train</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      StandardScaler calculates &mu; and &sigma; strictly on 204,277 training records. X_test is transformed using the train parameters.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono text-green-600 dark:text-green-400 font-bold uppercase block mb-1">STEP 3: Unseen Category Fallback</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      LabelEncoders fitted on X_train; any unseen categorical levels in future incoming batches map safely to the most frequent training class.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold border-t border-slate-100 dark:border-white/10 pt-4">
                <span>Verification Status:</span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 size={15} /> 100% Zero Leakage Confirmed
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CATEGORICAL PROFILES ================= */}
        {activeTab === "categorical" && (
          <div className="mt-6 hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Default Rates by Borrower Categorical Profile
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Percentage of applicants within each socioeconomic demographic segment that defaulted on their loan obligation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoricalRates.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.category}</span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{item.total} loans</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">Default Rate:</span>
                    <span className={`text-sm font-black font-mono ${
                      item.defaultRate > 12.0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
                    }`}>
                      {item.defaultRate}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-2 overflow-hidden">
                    <div
                      className={`h-full ${item.defaultRate > 12.0 ? "bg-red-500" : "bg-emerald-500"}`}
                      style={{ width: `${item.defaultRate * 4}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
              <strong className="block mb-1">Key Underwriting Findings:</strong>
              1. <strong>Co-Signer Protection:</strong> Borrowers with a co-signer show an 8.1% default rate vs 15.1% without (almost 50% risk reduction).<br />
              2. <strong>Employment Stability:</strong> Full-time workers default at 7.2% vs 16.4% for unemployed applicants.<br />
              3. <strong>Education Attainment:</strong> Advanced degrees (Master&apos;s/PhD) demonstrate substantially lower default rates than High School diplomas.
            </div>
          </div>
        )}

        {/* ================= TAB 3: NUMERICAL DISTRIBUTIONS & IQR ================= */}
        {activeTab === "numerical" && (
          <div className="mt-6 hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Numerical Feature Statistics & IQR Outlier Analysis
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Evaluation of statistical spreads, Interquartile Ranges (Q3 - Q1), and domain reasons for preserving financial observations without artificial deletion.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <th className="pb-3 font-bold">FEATURE</th>
                    <th className="pb-3 font-bold">MEAN</th>
                    <th className="pb-3 font-bold">RANGE [MIN, MAX]</th>
                    <th className="pb-3 font-bold">IQR</th>
                    <th className="pb-3 font-bold">OUTLIERS DETECTED</th>
                    <th className="pb-3 font-bold font-sans">DOMAIN INSIGHT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {numericalFeatures.map((f, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 font-bold text-emerald-700 dark:text-emerald-400">{f.name}</td>
                      <td className="py-3.5 text-slate-900 dark:text-white">{f.mean}</td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-300">[{f.min} - {f.max}]</td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-300">{f.iqr}</td>
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">{f.outliers}</td>
                      <td className="py-3.5 font-sans text-slate-600 dark:text-slate-300">{f.insight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                SOP Guideline — Outlier Preservation Policy:
              </span>
              In financial underwriting, higher-income applicants or larger principal requests fall outside typical median bounds but reflect legitimate, viable credit opportunities. Blindly truncating these using standard 1.5 &times; IQR rules would inject severe survivorship bias and truncate the bank&apos;s most profitable high-value customer segment.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EdaDashboard;
