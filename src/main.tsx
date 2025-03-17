import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { SimulationProvider } from "./context/SimulationContext.tsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SimulationProvider>
      <App />
    </SimulationProvider>
  </StrictMode>
);
