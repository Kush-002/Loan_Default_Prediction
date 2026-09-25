import {
  ShieldCheck,
  ArrowRight,
  Brain,
  Sliders,
  Sparkles,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();

  return (
    <nav className={`sticky top-0 z-50 w-full backdrop-blur-2xl border-b transition-all duration-300 ${
      isDark 
        ? "bg-slate-950/85 border-emerald-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)]" 
        : "bg-white/90 border-emerald-100 shadow-[0_4px_25px_rgba(16,185,129,0.06)]"
    }`}>
      <div className="w-[min(1280px,94%)] h-[72px] max-sm:h-[64px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* ================= LOGO & SYSTEM TELEMETRY ================= */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => navigate("/")}
          >
            <div className="relative w-10 h-10 max-sm:w-9 max-sm:h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(52,211,153,0.45)] group-hover:-rotate-3">
              <ShieldCheck size={22} className="relative z-10 max-sm:w-5 max-sm:h-5" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="flex flex-col">
              <div className={`flex items-center gap-1.5 text-[19px] max-sm:text-[17px] font-black tracking-tight font-sans ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                LoanGuard
                <span className={`font-extrabold text-xs px-1.5 py-0.5 rounded-md shadow-xs ${
                  isDark 
                    ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30" 
                    : "text-emerald-700 bg-emerald-50 border border-emerald-200"
                }`}>
                  AI
                </span>
              </div>
              <div className={`flex items-center gap-1 text-[9px] font-mono tracking-wider font-semibold ${
                isDark ? "text-emerald-400/80" : "text-emerald-800/70"
              }`}>
                <span>v2.4 ENSEMBLE</span>
              </div>
            </div>
          </div>

          {/* Telemetry pill */}
          <div className={`hidden xl:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-semibold shadow-xs ${
            isDark
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-emerald-50 border border-emerald-200 text-emerald-800"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MODEL ENGINE: ACTIVE (99.8% PRECISION)</span>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className={`hidden md:flex items-center gap-1.5 p-1 rounded-2xl border shadow-xs ${
          isDark 
            ? "bg-slate-900/90 border-emerald-900/30" 
            : "bg-white border-slate-200/80"
        }`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] font-bold"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs font-bold"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50"
              }`
            }
          >
            <Sparkles size={13} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/prediction"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] font-bold"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs font-bold"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50"
              }`
            }
          >
            <Sliders size={13} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
            <span>Risk Prediction</span>
          </NavLink>

          <NavLink
            to="/model"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] font-bold"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs font-bold"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50"
              }`
            }
          >
            <Brain size={13} className={isDark ? "text-teal-300" : "text-emerald-600"} />
            <span>Model Telemetry</span>
          </NavLink>
        </div>

        {/* ================= THEME TOGGLE & CTA BUTTON ================= */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Theme Switcher Toggle Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative flex items-center justify-between p-1 rounded-full cursor-pointer transition-all duration-300 select-none border w-[68px] h-[34px] ${
              isDark
                ? "bg-slate-900 border-emerald-800/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-400"
                : "bg-emerald-50/70 border-emerald-200 text-emerald-700 shadow-xs hover:border-emerald-400"
            }`}
            title={`Switch to ${isDark ? "Light (Pure White & Emerald)" : "Dark (Deep Forest & Mint)"} Theme`}
            aria-label="Toggle Theme"
          >
            {/* Sliding Indicator Ball */}
            <div
              className={`absolute top-[3px] bottom-[3px] w-[26px] h-[26px] rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
                isDark
                  ? "left-[37px] bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 font-bold"
                  : "left-[3px] bg-white border border-emerald-200 text-emerald-700"
              }`}
            >
              {isDark ? (
                <Moon size={14} className="text-white" />
              ) : (
                <Sun size={14} className="text-emerald-600 animate-pulse" />
              )}
            </div>

            {/* Sun Icon Placeholder */}
            <div className="w-[26px] flex items-center justify-center text-emerald-600/80">
              <Sun size={13} />
            </div>

            {/* Moon Icon Placeholder */}
            <div className="w-[26px] flex items-center justify-center text-emerald-400/80">
              <Moon size={13} />
            </div>
          </button>

          <button
            className="btn-primary relative overflow-hidden inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 max-sm:text-[11px] text-xs font-bold rounded-xl group cursor-pointer"
            onClick={() => navigate("/prediction")}
          >
            <Activity size={14} className="text-emerald-100 max-sm:hidden" />
            <span className="tracking-wide">Predictor Console</span>
            <ArrowRight size={15} className="arrow-slide-right text-emerald-100" />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;