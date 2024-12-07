import { DocumentProvider } from "@/context/document.context";
import { StepProvider } from "@/context/stepdocument.context";
import { ToastProvider } from "@/context/toast.context";
import { Router } from "@/router/router";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("Router", () => {
  it("should render the UIHeader and routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ToastProvider>
          <StepProvider>
            <DocumentProvider>
              <Router />
            </DocumentProvider>
          </StepProvider>
        </ToastProvider>
      </MemoryRouter>
    );
    const title = screen.getByText("Document Management System");
    expect(title).toBeInTheDocument();
  });

  it("should navigate to TrackingPage when route is /", () => {
    render(
      <MemoryRouter initialEntries={["/tracking"]}>
        <ToastProvider>
          <StepProvider>
            <DocumentProvider>
              <Router />
            </DocumentProvider>
          </StepProvider>
        </ToastProvider>
      </MemoryRouter>
    );
    const title = screen.getByText("Documentos");
    expect(title).toBeInTheDocument();
  });

  it("should navigate to NotFoundPage for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <ToastProvider>
          <StepProvider>
            <DocumentProvider>
              <Router />
            </DocumentProvider>
          </StepProvider>
        </ToastProvider>
      </MemoryRouter>
    );
    const title = screen.getByText(/404 - Page Not Found/i);
    expect(title).toBeInTheDocument();
  });
});
