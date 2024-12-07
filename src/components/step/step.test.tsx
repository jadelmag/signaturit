import { CustomStep } from "@/components/step/step";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("CustomInputEmail Component", () => {
  const title = "Test Step";

  it("renders the title passed as a prop", () => {
    render(<CustomStep title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("applies the correct CSS class", () => {
    render(<CustomStep title={title} />);

    const sectionElement = screen.getByText(title).closest("section");
    expect(sectionElement).toHaveClass("custom-step");
  });
});
