import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Result from "./pages/Result";
import ModelInfo from "./pages/ModelInfo";
import CyberBackground from "./components/CyberBackground";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Dynamic, High-Speed Animated Neural & Cyber Background with Theme support */}
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
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;