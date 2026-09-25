import {
  ArrowRight,
  ShieldCheck,
  Brain,
  Zap,
  Database,
  TrendingUp,
  Sparkles,
  Sliders,
  Cpu,
  Layers,
  Lock,
  CheckCircle2,
  BarChart3,
  GitBranch,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans">
      
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO SECTION (ASYMMETRIC 62/38 LAYOUT) ================= */}
      <main id="home">
        <section className="relative min-h-[660px] flex items-center py-12 sm:py-18 overflow-hidden">
          
          <div className="w-[min(1280px,94%)] mx-auto grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] items-center gap-10 lg:gap-14 relative z-10">
            
            {/* ================= LEFT CONTENT ================= */}
            <div className="max-lg:text-center">
              
              {/* Green Shade Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/90 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-bold tracking-wider shadow-xs hover:border-emerald-400 dark:hover:border-emerald-400 hover:shadow-sm transition-all duration-300 animate-fade-up max-lg:mx-auto cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AI-CALIBRATED CREDIT UNDERWRITING ENGINE</span>
              </div>

              {/* Holographic Headline with Shades of Green */}
              <h1 className="mt-5 text-[40px] sm:text-[52px] lg:text-[64px] font-black tracking-[-0.04em] leading-[1.06] text-slate-900 dark:text-white animate-fade-up">
                Predict Loan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-500 dark:from-emerald-400 dark:via-teal-300 dark:to-green-400"> Default Risk</span>
                <br />
                <span className="text-slate-800 dark:text-slate-100">With Neural AI.</span>
              </h1>

              <p className="mt-5 max-w-[580px] text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed animate-fade-up max-lg:mx-auto font-normal">
                Evaluate borrower credit profiles using an ensemble of calibrated
                machine learning classifiers. Real-time default probability scoring,
                SHAP feature contributions, and automated decision intelligence.
              </p>

              {/* ================= TECH TAGS ROW (GREEN ACCENTS) ================= */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 max-lg:justify-center animate-fade-up">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-semibold shadow-xs hover:border-emerald-300 transition-all duration-200 cursor-default">
                  <Zap size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>50ms Inference</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-semibold shadow-xs hover:border-emerald-300 transition-all duration-200 cursor-default">
                  <Cpu size={13} className="text-teal-600 dark:text-teal-400" />
                  <span>92.4% ROC-AUC</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-semibold shadow-xs hover:border-emerald-300 transition-all duration-200 cursor-default">
                  <Layers size={13} className="text-emerald-700 dark:text-emerald-400" />
                  <span>17 Feature Vectors</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-semibold shadow-xs hover:border-emerald-300 transition-all duration-200 cursor-default">
                  <Lock size={13} className="text-green-600 dark:text-green-400" />
                  <span>Zero Data Leakage</span>
                </span>
              </div>

              {/* ================= HERO BUTTONS ================= */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 animate-fade-up max-lg:justify-center">
                <button
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer group"
                  onClick={() => navigate("/prediction")}
                >
                  <Sparkles size={17} className="text-emerald-100" />
                  <span>Initialize Assessment</span>
                  <ArrowRight size={17} className="arrow-slide-right text-emerald-100" />
                </button>

                <button
                  className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold cursor-pointer group"
                  onClick={() => navigate("/model")}
                >
                  <Brain size={17} className="text-emerald-700 dark:text-emerald-400" />
                  <span>Explore Model Architecture</span>
                  <ArrowRight size={16} className="arrow-slide-right text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </button>
              </div>

              {/* ================= TRUST INDICATORS ================= */}
              <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400 max-lg:justify-center animate-fade-up">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default">
                  <ShieldCheck size={17} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Ensemble Supervised ML</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 cursor-default">
                  <Zap size={17} className="text-teal-600 dark:text-teal-400" />
                  <span>Instant Vector Processing</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default">
                  <Database size={17} className="text-emerald-700 dark:text-emerald-400" />
                  <span>255K+ Training Benchmark</span>
                </div>
              </div>

            </div>

            {/* ================= RIGHT PREDICTION COCKPIT (BESPOKE MULTI-TIER DESIGN) ================= */}
            <div className="relative flex flex-col items-center justify-center">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-green-500/20 rounded-[36px] blur-xl opacity-60 pointer-events-none"></div>

              {/* Main Underwriting Card */}
              <div className="hover-card relative z-10 w-full max-w-[440px] p-7 sm:p-8 rounded-[32px] border border-emerald-100 dark:border-emerald-900/40 shadow-xl bg-white dark:bg-slate-900/90">
                
                {/* Header with live telemetry LED */}
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                        NEURAL INFERENCE HUD
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      Loan Risk Assessment
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-xs">
                    <TrendingUp size={20} />
                  </div>
                </div>

                {/* ================= SCORE MODULE ================= */}
                <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-500/20 relative hover:border-emerald-200 transition-all duration-200">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                        Calibrated Default Risk
                      </span>
                      <div className="flex items-baseline text-[54px] font-black leading-none tracking-tight text-slate-900 dark:text-white font-mono mt-1.5">
                        24.2
                        <span className="text-2xl text-emerald-600 dark:text-emerald-400 font-bold ml-1">%</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1 rounded-lg bg-emerald-100/80 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold font-mono uppercase tracking-wider shadow-xs">
                        ● Safe Tier
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold mt-1.5">
                        Risk Class: Low
                      </span>
                    </div>
                  </div>

                  {/* ================= PROGRESS ================= */}
                  <div className="mt-5">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2 font-medium">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">0% Low Risk</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">50% Med</span>
                      <span className="text-red-600 dark:text-red-400 font-bold">100% Critical</span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300/60 dark:border-white/10">
                      <div className="h-full w-[24.2%] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 shadow-xs"></div>
                    </div>
                  </div>
                </div>

                {/* ================= CONFIDENCE & METRIC (WHITE TILES WITH GREEN ACCENTS) ================= */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-emerald-100 dark:border-white/10 flex items-center gap-3 hover:border-emerald-300 transition-all duration-200 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Brain size={17} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                        Confidence
                      </span>
                      <strong className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                        91.8%
                      </strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/80 border border-emerald-100 dark:border-white/10 flex items-center gap-3 hover:border-emerald-300 transition-all duration-200 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <Zap size={17} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                        Latency
                      </span>
                      <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        0.042s
                      </strong>
                    </div>
                  </div>
                </div>

                {/* ================= CONSENSUS BADGE ================= */}
                <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-500/30">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-900 dark:text-emerald-300">
                    <Sliders size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Ensemble Consensus:</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Recommended Approval</span>
                  </span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ================= ASYMMETRIC BENTO-GRID TELEMETRY SECTION ================= */}
        <section className="py-12 pb-24 relative z-10">
          <div className="w-[min(1280px,94%)] mx-auto">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <BarChart3 size={12} className="text-emerald-600" />
                <span>BENCHMARK ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-sans tracking-tight">
                Enterprise ML Underwriting Engine
              </h2>
            </div>

            {/* Asymmetric Bento Grid: 1 Wide Hero Tile + 3 Staggered Companion Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Tile 1: Wide Featured Telemetry Module (Desktop 2 cols) */}
              <div className="lg:col-span-2 hover-card p-7 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shadow-xs">
                        <Database size={22} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                          TRAINING CORPUS & CROSS-VALIDATION
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                          255,000+ Verified Loan Profiles
                        </h3>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      CALIBRATED ACCURACY 92.4%
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-2">
                    Trained on extensive multidimensional banking telemetry with stratified 10-fold cross-validation. Employs advanced SMOTE oversampling and Isotonic probability calibration to eliminate default classification bias.
                  </p>
                </div>

                {/* Mini Visual Metric Bar Sequence */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">ROC-AUC</span>
                    <strong className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">94.1%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/30">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">F1-Score</span>
                    <strong className="text-base sm:text-lg font-black text-teal-700 dark:text-teal-400 font-mono">87.9%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50/50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/30">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">Precision</span>
                    <strong className="text-base sm:text-lg font-black text-green-700 dark:text-green-400 font-mono">89.7%</strong>
                  </div>
                </div>
              </div>

              {/* Tile 2: 17 Vector Space */}
              <div className="hover-card p-7 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20 flex items-center justify-center">
                      <Layers size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
                      INPUT DIMS
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    17 Feature Vectors
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                    Multidimensional demographic, credit history, liquidity ratios, and capital exposure indicators.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-teal-700 dark:text-teal-400 font-semibold flex items-center gap-1.5">
                  <GitBranch size={13} />
                  <span>StandardScaler Normalized</span>
                </div>
              </div>

              {/* Tile 3: Real-Time Latency */}
              <div className="hover-card p-7 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center">
                      <Zap size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      REST API
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    &lt; 50ms Latency
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                    Lightning fast decision telemetry output through Flask microservice inference backend.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Sub-second Underwriting</span>
                </div>
              </div>

              {/* Tile 4: Supervised ML Ensemble */}
              <div className="hover-card p-7 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 flex items-center justify-center">
                      <Brain size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-green-800 dark:text-green-300 px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                      CLASSIFIER
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    XGBoost + RF
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                    Extreme Gradient Boosting coupled with Random Forest soft-voting matrix.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-green-700 dark:text-green-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  <span>Dual Model Consensus</span>
                </div>
              </div>

              {/* Tile 5: Explainable AI & SHAP */}
              <div className="hover-card p-7 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center">
                      <Sliders size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                      XAI COCKPIT
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    SHAP Attribution
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                    Full audit trail of credit score, DTI ratio, and income factors powering the decision score.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>Complete Interpretability</span>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;