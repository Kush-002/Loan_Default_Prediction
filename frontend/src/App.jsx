import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Result from "./pages/Result";
import ModelInfo from "./pages/ModelInfo";
import EdaDashboard from "./pages/EdaDashboard";
import ErrorAnalysis from "./pages/ErrorAnalysis";
import AboutProject from "./pages/AboutProject";
import CyberBackground from "./components/CyberBackground";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Dynamic Animated Neural & Cyber Background with Theme support */}
        <CyberBackground />

        <div className="relative z-10 min-h-screen">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/prediction"
              element={<Prediction />}
            />

            <Route
              path="/result"
              element={<Result />}
            />

            <Route
              path="/model"
              element={<ModelInfo />}
            />

            <Route
              path="/eda"
              element={<EdaDashboard />}
            />

            <Route
              path="/error-analysis"
              element={<ErrorAnalysis />}
            />

            <Route
              path="/about"
              element={<AboutProject />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;