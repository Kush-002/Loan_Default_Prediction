import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Wallet,
  FileText,
  CreditCard,
  Info,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Sliders,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Prediction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    income: "",
    loanAmount: "",
    creditScore: "",
    monthsEmployed: "",
    creditLines: "",
    interestRate: "",
    loanTerm: "",
    dtiRatio: "",
    education: "",
    employmentType: "",
    maritalStatus: "",
    hasMortgage: "",
    hasDependents: "",
    loanPurpose: "",
    hasCoSigner: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errorMessage) setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Quick-load demo profiles
  const loadLowRiskSample = () => {
    if (errorMessage) setErrorMessage("");
    setFormData({
      age: "38",
      income: "125000",
      loanAmount: "180000",
      creditScore: "780",
      monthsEmployed: "72",
      creditLines: "4",
      interestRate: "6.5",
      loanTerm: "36",
      dtiRatio: "0.22",
      education: "Master's",
      employmentType: "Full-time",
      maritalStatus: "Married",
      hasMortgage: "Yes",
      hasDependents: "Yes",
      loanPurpose: "Home",
      hasCoSigner: "Yes",
    });
  };

  const loadHighRiskSample = () => {
    if (errorMessage) setErrorMessage("");
    setFormData({
      age: "23",
      income: "28000",
      loanAmount: "190000",
      creditScore: "540",
      monthsEmployed: "8",
      creditLines: "1",
      interestRate: "18.5",
      loanTerm: "60",
      dtiRatio: "0.58",
      education: "High School",
      employmentType: "Part-time",
      maritalStatus: "Single",
      hasMortgage: "No",
      hasDependents: "No",
      loanPurpose: "Other",
      hasCoSigner: "No",
    });
  };

  const handleReset = () => {
    setErrorMessage("");
    setFormData({
      age: "",
      income: "",
      loanAmount: "",
      creditScore: "",
      monthsEmployed: "",
      creditLines: "",
      interestRate: "",
      loanTerm: "",
      dtiRatio: "",
      education: "",
      employmentType: "",
      maritalStatus: "",
      hasMortgage: "",
      hasDependents: "",
      loanPurpose: "",
      hasCoSigner: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch (err) {
        throw new Error(`HTTP ${response.status}: Failed to parse JSON from backend.`, { cause: err });
      }

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} ${response.status === 500 ? "Internal Server Error" : "Error"}: ${result?.message || "Model prediction failed on backend server."}`
        );
      }

      console.log("Backend Model Response:", result);

      // Strictly navigate only when a real 200 OK response with prediction is received
      navigate("/result", {
        state: {
          formData: formData,
          prediction: result.prediction,
          riskPercentage: result.risk_percentage,
          confidence: result.confidence,
          featureDrivers: result.feature_drivers,
        },
      });
    } catch (error) {
      console.error("Prediction Error:", error);
      const isConnectionError =
        error.name === "TypeError" ||
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError");

      if (isConnectionError) {
        setErrorMessage(
          "Error 500 / Connection Failed: Backend server is offline! Cannot reach http://127.0.0.1:5000. Start Flask backend by running 'python app.py' in the Backend folder."
        );
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans pb-24">
      
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HEADER ================= */}
      <main>
        <section className="pt-8 sm:pt-12 pb-4 relative">
          <div className="w-[min(1080px,94%)] mx-auto">
            
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group cursor-pointer font-semibold"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={16} className="arrow-slide-left" />
                <span>RETURN TO TELEMETRY HUB</span>
              </button>

              {/* Sample Profile Quick Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadLowRiskSample}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                  title="Auto-fill with high credit, low DTI profile"
                >
                  <Sparkles size={13} className="text-emerald-600" />
                  <span>Preset: Low Risk</span>
                </button>

                <button
                  type="button"
                  onClick={loadHighRiskSample}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                  title="Auto-fill with low credit, high DTI profile"
                >
                  <ShieldAlert size={13} className="text-amber-600" />
                  <span>Preset: High Risk</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs cursor-pointer shadow-xs"
                  title="Reset form"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs">
                <Sliders size={12} className="animate-spin text-emerald-600 dark:text-emerald-400" />
                <span>INFERENCE PARAMETER VECTOR INPUT</span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Loan Default Prediction
              </h1>

              <p className="mt-2.5 max-w-xl mx-auto text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Input applicant demographic, financial stability, and loan terms
                into the calibrated ensemble underwriting engine.
              </p>
            </div>

            {/* ================= STEP TRACKER (EMERALD LASER EFFECT) ================= */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-2.5 text-xs font-bold font-mono text-emerald-800 dark:text-emerald-400">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  01
                </span>
                <span>Applicant Vector Input</span>
              </div>

              <div className="w-16 sm:w-24 h-[2px] bg-slate-200 dark:bg-slate-800 mx-3 sm:mx-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/70 dark:bg-emerald-400/80 animate-laser"></div>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-semibold font-mono text-slate-400 dark:text-slate-500">
                <span className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shadow-xs">
                  02
                </span>
                <span>Risk Decision Score</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= FORM MODULES (WHITE CARDS WITH GREEN ACCENTS) ================= */}
        <section className="mt-4">
          <div className="w-[min(1080px,94%)] mx-auto">
            <form onSubmit={handleSubmit}>
              
              {/* ================= 1. PERSONAL DEMOGRAPHICS ================= */}
              <div className="hover-card mb-6 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
                <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-100 dark:border-white/10">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <User size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Demographic Characteristics</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                        VECTORS 1-6
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      Applicant identity, education qualification, and employment tenure.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Age */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Age <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g. 35"
                        min="18"
                        max="100"
                        required
                        className="input-cyber w-full h-11 px-3.5 pr-16 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono pointer-events-none">
                        yrs
                      </span>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Education Tier <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select qualification</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's Degree</option>
                      <option value="Master's">Master's Degree</option>
                      <option value="PhD">Doctorate / PhD</option>
                    </select>
                  </div>

                  {/* Employment Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Employment Status <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select employment type</option>
                      <option value="Full-time">Full-time Employed</option>
                      <option value="Part-time">Part-time Employed</option>
                      <option value="Self-employed">Self-employed / Business</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>

                  {/* Marital Status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Marital Status <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>

                  {/* Has Dependents */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Has Dependents <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <select
                      name="hasDependents"
                      value={formData.hasDependents}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Has Co-Signer */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Co-Signer Guarantee <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <select
                      name="hasCoSigner"
                      value={formData.hasCoSigner}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select option</option>
                      <option value="Yes">Yes (Guaranteed)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* ================= 2. FINANCIAL STABILITY MATRIX ================= */}
              <div className="hover-card mb-6 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
                <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-100 dark:border-white/10">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Wallet size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Financial Stability & Credit Matrix</span>
                      <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
                        VECTORS 7-12
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      Income telemetry, creditworthiness score, and debt-to-income load.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Annual Income */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Annual Income <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm pointer-events-none">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        placeholder="75000"
                        min="0"
                        required
                        className="input-cyber w-full h-11 pl-8 pr-3.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Credit Score (FICO) <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="creditScore"
                        value={formData.creditScore}
                        onChange={handleChange}
                        placeholder="720"
                        min="300"
                        max="850"
                        required
                        className="input-cyber w-full h-11 px-3.5 pr-16 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono pointer-events-none">
                        / 850
                      </span>
                    </div>
                  </div>

                  {/* Debt-to-Income Ratio */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Debt-to-Income Ratio (DTI) <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="dtiRatio"
                      value={formData.dtiRatio}
                      onChange={handleChange}
                      placeholder="0.32"
                      step="0.01"
                      min="0"
                      max="1"
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                    />
                  </div>

                  {/* Credit Lines */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Active Credit Lines <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="creditLines"
                      value={formData.creditLines}
                      onChange={handleChange}
                      placeholder="e.g. 3"
                      min="0"
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                    />
                  </div>

                  {/* Months Employed */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Employment Tenure <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="monthsEmployed"
                        value={formData.monthsEmployed}
                        onChange={handleChange}
                        placeholder="e.g. 48"
                        min="0"
                        required
                        className="input-cyber w-full h-11 px-3.5 pr-20 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono pointer-events-none">
                        months
                      </span>
                    </div>
                  </div>

                  {/* Has Mortgage */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Existing Mortgage <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <select
                      name="hasMortgage"
                      value={formData.hasMortgage}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select option</option>
                      <option value="Yes">Yes (Active Mortgage)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* ================= 3. LOAN REQUEST SPECIFICATIONS ================= */}
              <div className="hover-card mb-6 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm bg-white dark:bg-slate-900/90">
                <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-100 dark:border-white/10">
                  <div className="w-11 h-11 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Loan Request & Capital Exposure</span>
                      <span className="text-[10px] font-mono font-bold text-green-800 dark:text-green-400 px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                        VECTORS 13-16
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      Principal amount, interest terms, and capital purpose.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Loan Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Requested Principal <span className="text-green-600 dark:text-green-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm pointer-events-none">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="150000"
                        min="0"
                        required
                        className="input-cyber w-full h-11 pl-8 pr-3.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Interest Rate (APR) <span className="text-green-600 dark:text-green-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="interestRate"
                        value={formData.interestRate}
                        onChange={handleChange}
                        placeholder="8.5"
                        step="0.01"
                        min="0"
                        required
                        className="input-cyber w-full h-11 px-3.5 pr-10 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-mono shadow-xs"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono pointer-events-none">
                        %
                      </span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Loan Term <span className="text-green-600 dark:text-green-400">*</span>
                    </label>
                    <select
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select term</option>
                      <option value="12">12 Months (1 Year)</option>
                      <option value="24">24 Months (2 Years)</option>
                      <option value="36">36 Months (3 Years)</option>
                      <option value="48">48 Months (4 Years)</option>
                      <option value="60">60 Months (5 Years)</option>
                    </select>
                  </div>

                  {/* Loan Purpose */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Loan Purpose <span className="text-green-600 dark:text-green-400">*</span>
                    </label>
                    <select
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleChange}
                      required
                      className="input-cyber w-full h-11 px-3.5 rounded-xl text-sm outline-none cursor-pointer font-sans shadow-xs"
                    >
                      <option value="" className="text-slate-400">Select purpose</option>
                      <option value="Home">Home Mortgage / Renovation</option>
                      <option value="Auto">Vehicle / Auto</option>
                      <option value="Education">Higher Education</option>
                      <option value="Business">Commercial / Business</option>
                      <option value="Other">General Consumer / Other</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* ================= NOTICE HUD (WHITE BASE & GREEN ACCENTS) ================= */}
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-500/30 mt-6 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info size={18} />
                </div>
                <div>
                  <strong className="text-xs font-mono font-bold text-emerald-950 dark:text-emerald-300 block uppercase">
                    Neural Pipeline Underwriting Protocol
                  </strong>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Input parameters are scaled via StandardScaler and evaluated across the
                    XGBoost & Random Forest ensemble weights to compute probability of default and SHAP feature attribution.
                  </p>
                </div>
              </div>

              {/* ================= ERROR / BACKEND OFFLINE ALERT ================= */}
              {errorMessage && (
                <div className="mt-6 p-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-300 shadow-sm animate-shake">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-mono font-bold uppercase tracking-wider text-red-900 dark:text-red-200">
                          Backend Connection Failed
                        </strong>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 font-semibold">
                          PORT 5000 UNREACHABLE
                        </span>
                      </div>
                      <p className="text-xs mt-1.5 leading-relaxed text-slate-700 dark:text-slate-300">
                        {errorMessage}
                      </p>
                      <div className="mt-3.5 flex flex-wrap items-center gap-3 pt-3 border-t border-red-200 dark:border-red-500/20">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          Start server:
                        </span>
                        <code className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-emerald-300 dark:bg-black dark:text-emerald-400 border border-slate-700 select-all">
                          cd Backend ; python app.py
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= ACTIONS ================= */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <button
                  type="button"
                  className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-semibold cursor-pointer group shadow-xs"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} className="arrow-slide-left" />
                  <span>Abort to Hub</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white cursor-pointer group"
                >
                  <CreditCard size={18} className="text-emerald-100" />
                  <span className="font-mono tracking-wide">
                    {isSubmitting ? "Running Inference Engine..." : "Execute Neural Risk Inference"}
                  </span>
                  <ArrowRight size={18} className="arrow-slide-right text-emerald-100" />
                </button>
              </div>

            </form>
          </div>
        </section>

      </main>

    </div>
  );
};

export default Prediction;