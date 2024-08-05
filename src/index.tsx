import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </Router>
    </StyledEngineProvider>
  </React.StrictMode>,
);

reportWebVitals();
