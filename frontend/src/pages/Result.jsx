import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Brain,
  TrendingDown,
  RotateCcw,
  Activity,
  ShieldAlert,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const predictionData = location.state;

  // Guard: If no prediction was executed by the backend, require submission
  if (!predictionData || predictionData.prediction === undefined) {
    return (
      <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
        <Navbar />
        <main className="pt-16 pb-12">
          <div className="w-[min(640px,92%)] mx-auto text-center">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-emerald-100 dark:border-white/10 shadow-xl backdrop-blur-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-5 shadow-xs">
                <ShieldAlert size={32} />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase block mb-1">
                Awaiting Model Inference
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                No Prediction Telemetry Found
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                No applicant data has been evaluated by the backend model yet. Please enter applicant parameters in the predictor to generate live machine learning inference.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/prediction")}
                  className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-mono font-bold text-white shadow-md cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Go to Prediction Form</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const riskPercentage = predictionData.riskPercentage;
  const confidence = predictionData.confidence;
  const prediction = predictionData.prediction;
  const isLowRisk = prediction === 0;

  const conicColor = isLowRisk ? "#10b981" : "#ef4444";
  const glowClass = isLowRisk ? "animate-glow-emerald" : "animate-glow-crimson";

  // Multi-tier Shades of Green for feature attribution bars
  const greenSchemes = [
    {
      badge: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300",
      bar: "from-emerald-600 to-teal-500",
      text: "text-emerald-700 dark:text-emerald-400",
    },
    {
      badge: "bg-teal-50 dark:bg-teal-500/10 border-teal-300 dark:border-teal-500/20 text-teal-800 dark:text-teal-300",
      bar: "from-teal-600 to-emerald-500",
      text: "text-teal-700 dark:text-teal-400",
    },
    {
      badge: "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/20 text-green-800 dark:text-green-300",
      bar: "from-green-600 to-emerald-400",
      text: "text-green-700 dark:text-green-400",
    },
    {
      badge: "bg-emerald-100/60 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-300",
      bar: "from-emerald-700 to-green-600",
      text: "text-emerald-800 dark:text-emerald-300",
    },
    {
      badge: "bg-teal-100/60 dark:bg-teal-950/40 border-teal-300 dark:border-teal-500/30 text-teal-900 dark:text-teal-300",
      bar: "from-teal-700 to-emerald-600",
      text: "text-teal-800 dark:text-teal-300",
    },
  ];

  const featureDrivers = (predictionData.featureDrivers || []).slice(0, 5);

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
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
              onClick={() => navigate("/prediction")}
            >
              <ArrowLeft size={16} className="arrow-slide-left" />
              <span>RETURN TO PREDICTOR</span>
            </button>

            <div className="mt-6 text-center">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs ${
                isLowRisk
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                  : "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300"
              }`}>
                <CheckCircle2 size={13} className="animate-pulse" />
                <span>REAL MODEL INFERENCE COMPLETE • FLASK API 5000</span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Risk Assessment Cockpit
              </h1>

              <p className="mt-2.5 max-w-xl mx-auto text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Ensemble model telemetry output, default probability calibration, and
                feature attribution matrix for the evaluated applicant.
              </p>
            </div>

          </div>
        </section>

        {/* ================= RESULT CONTENT ================= */}
        <section className="mt-4">
          <div className="w-[min(1080px,94%)] mx-auto">
            
            {/* ================= MAIN RESULT HUD (WHITE CARD WITH BESPOKE GAUGES) ================= */}
            <div className={`hover-card p-6 sm:p-9 rounded-[32px] border shadow-lg relative overflow-hidden transition-all duration-500 bg-white dark:bg-slate-900/90 ${
              isLowRisk
                ? "border-emerald-200 dark:border-emerald-500/30 shadow-[0_15px_45px_rgba(16,185,129,0.12)]"
                : "border-red-200 dark:border-red-500/30 shadow-[0_15px_45px_rgba(239,68,68,0.12)]"
            }`}>
              
              {/* Card Top */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase block">
                    NEURAL DEFAULT PROBABILITY MATRIX
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Prediction Telemetry
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50/60 dark:bg-slate-950/80 border border-emerald-200 dark:border-white/10 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold">
                  <Brain size={15} className="text-emerald-700 dark:text-emerald-400" />
                  <span>XGBoost + RF Ensemble</span>
                </div>
              </div>

              {/* ================= RISK DISPLAY GRID ================= */}
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] items-center gap-8 sm:gap-12 mt-8 pt-2">
                
                {/* Conic HUD Circle with Green Glow */}
                <div
                  className={`w-52 h-52 sm:w-56 sm:h-56 mx-auto rounded-full flex items-center justify-center relative p-4 transition-all duration-700 ${glowClass}`}
                  style={{
                    background: `conic-gradient(${conicColor} 0% ${riskPercentage}%, rgba(167, 243, 208, 0.25) ${riskPercentage}% 100%)`,
                  }}
                >
                  <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white dark:bg-slate-950 border border-emerald-100 dark:border-white/10 flex flex-col items-center justify-center shadow-lg relative z-10">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Default Risk
                    </span>
                    <strong className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono mt-0.5">
                      {riskPercentage}%
                    </strong>
                    <span className={`text-[10px] font-mono font-bold mt-1.5 px-3 py-0.5 rounded-lg uppercase ${
                      isLowRisk 
                        ? "text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40" 
                        : "text-red-800 dark:text-red-300 bg-red-100/80 dark:bg-red-500/20 border border-red-300 dark:border-red-500/40"
                    }`}>
                      {isLowRisk ? "● Safe" : "▲ High"}
                    </span>
                  </div>
                </div>

                {/* Risk Result Info */}
                <div className="flex flex-col justify-center">
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${
                      isLowRisk 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30" 
                        : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30"
                    }`}>
                      {isLowRisk ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 block uppercase">
                        Model Classification Result
                      </span>
                      <h3 className={`text-2xl font-black tracking-tight font-mono ${
                        isLowRisk ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                      }`}>
                        {isLowRisk ? "LOW DEFAULT RISK (APPROVED)" : "HIGH DEFAULT RISK (FLAGGED)"}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    The calibrated neural ensemble calculates a{" "}
                    <strong className="text-slate-900 dark:text-white font-mono font-bold">
                      {riskPercentage}%
                    </strong>{" "}
                    probability of default. {isLowRisk
                      ? "Applicant demonstrates resilient liquidity, strong credit history, and a safe debt profile."
                      : "Applicant vector shows elevated risk factors. Enhanced underwriting review or collateral requirement advised."}
                  </p>

                  {/* ================= PROBABILITY SCALE ================= */}
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-100 dark:border-white/10">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Safe Tier (0-30%)</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">Review (31-65%)</span>
                      <span className="text-red-600 dark:text-red-400 font-bold">Critical (66-100%)</span>
                    </div>

                    <div className="relative w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300/80 dark:border-white/10 flex">
                      <div className="h-full w-[30%] bg-emerald-500/60 border-r border-emerald-600/50"></div>
                      <div className="h-full w-[35%] bg-amber-500/50 border-r border-amber-600/50"></div>
                      <div className="h-full w-[35%] bg-red-500/50"></div>
                      
                      {/* Active Indicator Pin */}
                      <div
                        className="absolute top-0 bottom-0 w-3.5 -ml-1.5 rounded-full bg-slate-900 dark:bg-white shadow-md transition-all duration-700"
                        style={{ left: `${Math.min(98, Math.max(2, riskPercentage))}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1.5 font-semibold">
                      <span>Model Confidence (Calibration Score)</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">
                        {confidence}%
                      </strong>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 shadow-xs transition-all duration-700"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* ================= TELEMETRY ANALYSIS GRID (3 WHITE TILES WITH GREEN ACCENTS) ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
              
              {/* 1. Risk Decision */}
              <div className="hover-card p-6 rounded-3xl border border-emerald-100 dark:border-white/10 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <ShieldCheck size={18} />
                    </div>
                    <span>Decision Vector</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                    OUTPUT
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {isLowRisk ? "Recommended Approval" : "Flagged for Audit"}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[48px] font-normal">
                  {isLowRisk
                    ? "Demographic and liquidity factors indicate high loan repayment probability with minimal loss exposure."
                    : "Elevated risk profile detected. Consider loan amount reduction, higher interest APR, or collateral."}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 pt-3 border-t border-slate-100 dark:border-white/10">
                  <CheckCircle2 size={16} />
                  <span>
                    {isLowRisk ? "Favorable Credit Standing" : "Conditional Review Needed"}
                  </span>
                </div>
              </div>

              {/* 2. Confidence */}
              <div className="hover-card p-6 rounded-3xl border border-emerald-100 dark:border-white/10 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                      <Brain size={18} />
                    </div>
                    <span>Neural Precision</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
                    CV 10-FOLD
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {confidence}% Reliability
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[48px] font-normal">
                  Score derived from 10-fold cross-validated XGBoost decision trees and Random Forest voting matrix.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 pt-3 border-t border-slate-100 dark:border-white/10">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  <span>High Statistical Significance</span>
                </div>
              </div>

              {/* 3. Assessment Type */}
              <div className="hover-card p-6 rounded-3xl border border-emerald-100 dark:border-white/10 shadow-xs bg-white dark:bg-slate-900/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 flex items-center justify-center">
                      <Activity size={18} />
                    </div>
                    <span>Inference Type</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-green-800 dark:text-green-400 px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                    BINARY CLF
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white font-mono">
                  Supervised Classification
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[48px] font-normal">
                  Parameters scaled and weighted against non-linear default patterns across 255K historical banking cases.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-green-700 dark:text-green-400 pt-3 border-t border-slate-100 dark:border-white/10">
                  <TrendingDown size={16} />
                  <span>Real-Time Calibrated Output</span>
                </div>
              </div>

            </div>

            {/* ================= KEY RISK INDICATORS / SHAP (SHADES OF GREEN) ================= */}
            <div className="hover-card mt-6 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-white/10 shadow-sm bg-white dark:bg-slate-900/90">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                    FEATURE ATTRIBUTION MATRIX (SHAP VALUES)
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Key Risk Drivers
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                    Dominant parameters influencing the ensemble prediction outcome.
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                  TOP ATTRIBUTES
                </span>
              </div>

              <div className="mt-6 divide-y divide-slate-100 dark:divide-white/10">
                {featureDrivers.map((driver, index) => {
                  const scheme = greenSchemes[index % greenSchemes.length];
                  // Calculate relative visual width: normalize against top importance
                  const maxImp = featureDrivers[0]?.importance || 100;
                  const barWidthPercent = Math.min(100, Math.max(15, Math.round((driver.importance / maxImp) * 95)));

                  return (
                    <div
                      key={driver.name || index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3.5 min-w-[240px]">
                        <div
                          className={`w-8 h-8 rounded-xl border text-xs font-mono font-bold flex items-center justify-center ${scheme.badge}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <strong className="text-xs font-mono font-bold text-slate-900 dark:text-white block flex items-center gap-2">
                            <span>{driver.name}</span>
                            {driver.value && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                                Input: {driver.value}
                              </span>
                            )}
                          </strong>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                            {driver.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:w-72">
                        <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-emerald-100 dark:border-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${scheme.bar}`}
                            style={{ width: `${barWidthPercent}%` }}
                          />
                        </div>
                        <strong className={`text-xs font-mono w-28 text-right font-bold ${scheme.text}`}>
                          {driver.importance}% Model Weight
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <button
                type="button"
                className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-mono font-bold cursor-pointer shadow-xs"
                onClick={() => navigate("/prediction")}
              >
                <RotateCcw size={16} />
                <span>Initialize New Assessment</span>
              </button>

              <button
                type="button"
                className="btn-primary relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white cursor-pointer group"
                onClick={() => navigate("/")}
              >
                <span className="font-mono">Return to Telemetry Hub</span>
                <ArrowRight size={17} className="arrow-slide-right text-emerald-100" />
              </button>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
};

export default Result;