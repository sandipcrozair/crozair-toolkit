import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop"; // 👈 import it

const Home = React.lazy(() => import("./routes/Home"));
const Tools = React.lazy(() => import("./routes/Tools"));
const Calculators = React.lazy(() => import("./routes/Calculators"));
const CalculatorPage = React.lazy(() => import("./routes/CalculatorPage"));
const ToolsPage = React.lazy(() => import("./routes/ToolsPage"));

const App = () => (
  <Router>
    {/* 👇 this listens to route changes */}
    <ScrollToTop />

    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolName" element={<ToolsPage />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/:calcName" element={<CalculatorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  </Router>
);

export default App;
