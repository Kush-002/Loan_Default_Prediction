import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  DollarSign,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ErrorAnalysis = () => {
  const navigate = useNavigate();
  const [sliderThreshold, setSliderThreshold] = useState(0.50);

  // Precomputed sensitivity data across holdout test set (51,070 samples)
  const thresholdTable = [
    { t: 0.20, prec: 14.1, rec: 98.2, f1: 24.6, fn: 107, fp: 35400, cost: 712 },
    { t: 0.30, prec: 16.5, rec: 92.4, f1: 28.0, fn: 451, fp: 27600, cost: 532 },
    { t: 0.40, prec: 19.3, rec: 81.6, f1: 31.2, fn: 1091, fp: 20200, cost: 486 },
    { t: 0.50, prec: 22.7, rec: 68.0, f1: 34.0, fn: 1906, fp: 13610, cost: 477 },
    { t: 0.60, prec: 27.8, rec: 51.5, f1: 36.1, fn: 2877, fp: 7920, cost: 503 },
    { t: 0.70, prec: 35.1, rec: 33.2, f1: 34.1, fn: 3965, fp: 3640, cost: 568 },
    { t: 0.80, prec: 47.2, rec: 15.6, f1: 23.4, fn: 5005, fp: 1030, cost: 655 },
  ];

  // Interpolate closest metrics for slider
  const closestData = thresholdTable.reduce((prev, curr) =>
    Math.abs(curr.t - sliderThreshold) < Math.abs(prev.t - sliderThreshold) ? curr : prev
  );

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
      <Navbar />

      <main className="w-[min(1280px,94%)] mx-auto pt-8 sm:pt-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-emerald-900/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
              <AlertTriangle size={13} className="text-amber-600 dark:text-amber-400" />
              <span>Adapted ML Work • Weeks 9 & 10 (In Place of CNN)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Underwriting Error Telemetry & Risk Trade-Offs
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Financial risk analysis examining False Positives vs. False Negatives, credit write-off exposure, and interactive threshold optimization.
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

        {/* ================= CONFUSION MATRIX CARDS ================= */}
        <div className="mt-8">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">
            Holdout Test Confusion Matrix (51,070 Evaluated Loans)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* True Negative */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300">
                  True Negative (TN)
                </span>
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <div className="text-2xl font-black font-mono text-emerald-900 dark:text-emerald-200 mt-2">
                31,529
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                Safe borrowers correctly approved. Interest capital earned cleanly.
              </p>
            </div>

            {/* False Positive */}
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300">
                  False Positive (FP)
                </span>
                <AlertTriangle size={18} className="text-amber-600" />
              </div>
              <div className="text-2xl font-black font-mono text-amber-900 dark:text-amber-200 mt-2">
                13,610
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                Safe applicants rejected/flagged. Lost interest profit & customer friction.
              </p>
            </div>

            {/* False Negative */}
            <div className="p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-red-800 dark:text-red-300">
                  False Negative (FN)
                </span>
                <ShieldAlert size={18} className="text-red-600" />
              </div>
              <div className="text-2xl font-black font-mono text-red-900 dark:text-red-200 mt-2">
                1,906
              </div>
              <p className="text-xs text-red-800 dark:text-red-300 mt-1 leading-relaxed">
                Defaulters mistakenly approved. Results in severe principal write-off.
              </p>
            </div>

            {/* True Positive */}
            <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-500/30 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-800 dark:text-teal-300">
                  True Positive (TP)
                </span>
                <ShieldCheck size={18} className="text-teal-600" />
              </div>
              <div className="text-2xl font-black font-mono text-teal-900 dark:text-teal-200 mt-2">
                4,025
              </div>
              <p className="text-xs text-teal-800 dark:text-teal-300 mt-1 leading-relaxed">
                Defaulters proactively intercepted before disbursal. Capital protected.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FINANCIAL IMPACT SECTION ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-600" />
              <span>Asymmetric Cost Matrix in Financial Underwriting</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              In academic ML, Type I and Type II errors are often weighted equally. In commercial banking, a False Negative is roughly <strong>7.4&times; more costly</strong> than a False Positive.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-900 dark:text-white">
                  <span>Type II Error (False Negative) Cost</span>
                  <span className="text-red-500">~$127,579 / event</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  When a defaulter is labeled &quot;Safe&quot;, the bank disburses the full loan principal. On default, recovery rates are low, resulting in major write-offs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-900 dark:text-white">
                  <span>Type I Error (False Positive) Cost</span>
                  <span className="text-amber-500">~$17,210 / event</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  When a safe borrower is denied or sent to secondary review, the bank only forfeits the expected net interest margin (opportunity cost).
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
              <strong>Risk Governance Policy:</strong>
              Because FN cost &gt;&gt; FP cost, the credit risk committee configures the decision threshold to maximize default capture rate (Sensitivity/Recall), accepting a moderate increase in manual underwriting reviews.
            </div>
          </div>

          {/* ================= INTERACTIVE THRESHOLD SLIDER ================= */}
          <div className="hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Interactive Decision Threshold Optimizer
                </h3>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
                  Threshold: {sliderThreshold.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Drag the slider to observe how altering the probability cutoff impacts Precision, Recall, and portfolio risk.
              </p>

              {/* Slider Input */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0.20"
                  max="0.80"
                  step="0.05"
                  value={sliderThreshold}
                  onChange={(e) => setSliderThreshold(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-800 accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
                  <span>0.20 (Conservative: Catch all defaults)</span>
                  <span>0.50 (Standard)</span>
                  <span>0.80 (Aggressive: High volume)</span>
                </div>
              </div>

              {/* Live Metric Gauges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Precision</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 block">
                    {closestData.prec}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Recall (Captured)</span>
                  <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                    {closestData.rec}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">F1-Score</span>
                  <span className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                    {closestData.f1}%
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between text-xs font-mono">
                <span className="text-slate-500">Estimated Undetected Defaults (FN):</span>
                <span className="font-bold text-red-500">{closestData.fn.toLocaleString()} loans</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Optimal F1 Peak: <strong>0.60</strong></span>
              <span>Optimal Risk Minimization: <strong>0.40 - 0.50</strong></span>
            </div>
          </div>
        </div>

        {/* ================= CALIBRATION & RELIABILITY ================= */}
        <div className="mt-8 hover-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Probability Calibration & Reliability Metrics (Week 10)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            In credit underwriting, raw classifier scores must reflect genuine empirical default probabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block mb-1">Brier Score Metric</span>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">0.1842</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Mean squared difference between predicted probabilities and actual default outcomes. Low values confirm superior probabilistic calibration.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">Calibration Method</span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">Isotonic Regression</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Non-parametric monotonic mapping transforming raw tree margins into calibrated empirical probabilities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-green-600 dark:text-green-400 font-bold uppercase block mb-1">Underwriting Usage</span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">Direct Risk Tiering</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Calibrated probabilities directly feed interest pricing models (e.g. higher default probability = wider credit spread).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorAnalysis;
