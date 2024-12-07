import { DocumentProvider } from "@/context/document.context";
import { StepProvider } from "@/context/stepdocument.context";
import { ToastProvider } from "@/context/toast.context";
import { Router } from "@/router/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <StepProvider>
        <DocumentProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </DocumentProvider>
      </StepProvider>
    </ToastProvider>
  </StrictMode>
);
