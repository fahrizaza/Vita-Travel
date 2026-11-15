import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router";

// Same cascade order as the original pages.
import "./styles/webflow-shared.css";
import "./styles/inter.css";
import "./styles/fluid-typography.css";
import "./styles/app.css";
import "./styles/overrides.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
