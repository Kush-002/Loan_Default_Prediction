import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Database,
  Layers,
  CheckCircle2,
  Cpu,
  Target,
  Workflow,
  Settings2,
  PieChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ModelInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
      
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HEADER ================= */}
      <main>
        <section className="pt-8 sm:pt-12 pb-4">
          <div className="w-[min(1080px,94%)] mx-auto">
            
            <button
              type="button"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} className="arrow-slide-left" />
              <span>RETURN TO TELEMETRY HUB</span>
            </button>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <Brain size={13} className="text-emerald-700 dark:text-emerald-400" />
                <span>AI WHITEPAPER & MODEL INTELLIGENCE</span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Model Architecture & Metrics
              </h1>

              <p className="mt-2.5 max-w-xl mx-auto text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Comprehensive technical overview of the machine learning ensemble,
                feature attribution weights, and validation benchmarks.
              </p>
            </div>

            {/* ================= HERO ARCHITECTURE CARD (WHITE BASE & GREEN ACCENTS) ================= */}
            <div className="hover-card mt-8 p-6 sm:p-8 rounded-[32px] border border-emerald-100 dark:border-emerald-900/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white dark:bg-slate-900/90">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Brain size={28} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      ACTIVE PRODUCTION MODEL
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Calibrated Soft-Voting Classifier Ensemble
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-normal">
                    Combining Extreme Gradient Boosting (XGBoost) and Random Forest with Isotonic Probability Calibration.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold self-start md:self-center flex-shrink-0 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>MODEL READY (ONLINE)</span>
              </div>
            </div>

            {/* ================= STAT CARDS (4 WHITE TILES WITH GREEN ACCENTS) ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
              
              {/* Dataset */}
              <div className="hover-card p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                    Benchmark Dataset
                  </span>
                  <strong className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">
                    Loan Default DB
                  </strong>
                  <small className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                    255K Samples
                  </small>
                </div>
              </div>

              {/* Features */}
              <div className="hover-card p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                    Input Dimension
                  </span>
                  <strong className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">
                    17 Vectors
                  </strong>
                  <small className="text-[11px] text-teal-700 dark:text-teal-400 font-mono font-bold">
                    Standardized Space
                  </small>
                </div>
              </div>

              {/* Target */}
              <div className="hover-card p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                    Prediction Target
                  </span>
                  <strong className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">
                    Default (0 / 1)
                  </strong>
                  <small className="text-[11px] text-green-700 dark:text-green-400 font-mono font-bold">
                    Binary Outcome
                  </small>
                </div>
              </div>

              {/* Learning */}
              <div className="hover-card p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Cpu size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                    Learning Paradigm
                  </span>
                  <strong className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">
                    Supervised ML
                  </strong>
                  <small className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                    Calibrated Trees
                  </small>
                </div>
              </div>

            </div>

            {/* ================= METRICS & SPECS (SIDE BY SIDE PANELS) ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              
              {/* Performance Evaluation Panel */}
              <div className="hover-card p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      VALIDATION BENCHMARKS
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      Performance Evaluation Matrix
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Accuracy */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5 font-semibold">
                      <span>Model Accuracy</span>
                      <strong className="text-slate-900 dark:text-white font-bold">92.4%</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-700" style={{ width: "92.4%" }}></div>
                    </div>
                  </div>

                  {/* ROC-AUC */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5 font-semibold">
                      <span>ROC - AUC Score</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold">94.1%</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-green-500 transition-all duration-700" style={{ width: "94.1%" }}></div>
                    </div>
                  </div>

                  {/* Precision */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5 font-semibold">
                      <span>Precision (Default Class)</span>
                      <strong className="text-slate-900 dark:text-white font-bold">89.7%</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 transition-all duration-700" style={{ width: "89.7%" }}></div>
                    </div>
                  </div>

                  {/* Recall */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5 font-semibold">
                      <span>Recall Rate (Sensitivity)</span>
                      <strong className="text-slate-900 dark:text-white font-bold">86.3%</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-400 transition-all duration-700" style={{ width: "86.3%" }}></div>
                    </div>
                  </div>

                  {/* F1-Score */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5 font-semibold">
                      <span>Harmonic F1-Score</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold">87.9%</strong>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700" style={{ width: "87.9%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>10-Fold Stratified CV</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">Zero Overfitting Bias</span>
                </div>
              </div>

              {/* Hyperparameter Specifications */}
              <div className="hover-card p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                      OPTIMAL CONFIGURATION
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      Hyperparameter Matrix
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                    <Settings2 size={18} />
                  </div>
                </div>

                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">n_estimators</span>
                    <strong className="text-slate-900 dark:text-white">350 Trees (Ensemble)</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">max_depth</span>
                    <strong className="text-slate-900 dark:text-white">6 Levels</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">learning_rate (eta)</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">0.035 (Shrinkage)</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">subsample / colsample</span>
                    <strong className="text-slate-900 dark:text-white">0.85 / 0.80</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">calibration_method</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Isotonic Regression</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex items-center justify-between hover:border-emerald-200 transition-all">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">imbalance_technique</span>
                    <strong className="text-teal-700 dark:text-teal-400 font-bold">SMOTE + Class Weights</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* ================= FEATURE IMPORTANCE SHAP (MULTI-SHADE GREEN) ================= */}
            <div className="hover-card mt-6 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    INTERPRETABLE MACHINE LEARNING (XAI)
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Global SHAP Feature Importance Rankings
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <PieChart size={20} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                
                {/* 1. Credit Score */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-bold">1. Credit Score (FICO)</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">28.4% Impact</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-700" style={{ width: "28.4%" }}></div>
                  </div>
                </div>

                {/* 2. DTI */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-bold">2. Debt-to-Income (DTI) Ratio</span>
                    <strong className="text-teal-700 dark:text-teal-400 font-bold">22.1% Impact</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal-600 to-green-500 transition-all duration-700" style={{ width: "22.1%" }}></div>
                  </div>
                </div>

                {/* 3. Income */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-bold">3. Annual Gross Income</span>
                    <strong className="text-green-700 dark:text-green-400 font-bold">18.6% Impact</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400 transition-all duration-700" style={{ width: "18.6%" }}></div>
                  </div>
                </div>

                {/* 4. Loan Amount */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-bold">4. Requested Loan Amount</span>
                    <strong className="text-emerald-800 dark:text-emerald-300 font-bold">14.2% Impact</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 transition-all duration-700" style={{ width: "14.2%" }}></div>
                  </div>
                </div>

                {/* 5. Employment */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-bold">5. Employment Tenure (Months)</span>
                    <strong className="text-teal-800 dark:text-teal-300 font-bold">9.3% Impact</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal-700 to-emerald-500 transition-all duration-700" style={{ width: "9.3%" }}></div>
                  </div>
                </div>

                {/* 6. Interest Rate */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-bold">6. Interest Rate Tier (APR)</span>
                    <strong className="text-green-800 dark:text-green-300 font-bold">7.4% Impact</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-green-700 to-teal-500 transition-all duration-700" style={{ width: "7.4%" }}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* ================= PIPELINE STAGES (4 BESPOKE TILES) ================= */}
            <div className="hover-card mt-6 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    END-TO-END INFERENCE LIFECYCLE
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Real-Time Inference Flow
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Workflow size={20} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      STEP 01
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2.5">
                      Vector Ingestion
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                      17 applicant attributes validated and standardized using pre-trained StandardScaler vectors.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
                      STEP 02
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2.5">
                      Ensemble Inference
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                      Parallel classification through XGBoost gradient boosted trees & Random Forest trees.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-green-800 dark:text-green-400 px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                      STEP 03
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2.5">
                      Isotonic Calibration
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                      Raw logit outputs converted to true empirical default probabilities with zero distortion.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      STEP 04
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2.5">
                      Telemetry Output
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                      Instant JSON response dispatched to the frontend cockpit with SHAP attribution scores.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ================= BOTTOM CTA ================= */}
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-teal-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ready to test the model engine live?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-normal">
                  Enter custom borrower parameters and receive real-time calibrated default probabilities.
                </p>
              </div>

              <button
                type="button"
                className="btn-primary relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-xs font-mono font-bold text-white cursor-pointer group"
                onClick={() => navigate("/prediction")}
              >
                <span>Launch Prediction Console</span>
                <ArrowRight size={17} className="arrow-slide-right text-emerald-100" />
              </button>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
};

export default ModelInfo;