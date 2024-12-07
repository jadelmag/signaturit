import { CustomButton } from "@/components/button/button";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("CustomButton Component", () => {
  it("should render the button with the correct title", () => {
    render(
      <CustomButton
        title="Click Me"
        type="button"
        disabled={false}
        variant="contained"
        onClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("should apply the correct class for contained option", () => {
    render(
      <CustomButton
        title="Primary Button"
        type="button"
        disabled={false}
        variant="contained"
        onClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "Primary Button" });
    expect(button).toHaveClass("MuiButton-contained");
  });

  it("should apply the correct class for secondary option", () => {
    render(
      <CustomButton
        title="Secondary Button"
        type="button"
        disabled={false}
        variant="outlined"
        onClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "Secondary Button" });
    expect(button).toHaveClass("MuiButton-outlined");
  });

  it("should apply the disabled class and attribute when disabled is true", () => {
    render(
      <CustomButton
        title="Disabled Button"
        type="button"
        disabled={true}
        variant="contained"
        onClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toHaveClass("custom-button__disabled");
    expect(button).toBeDisabled();
  });

  it("should not apply the disabled class when disabled is false", () => {
    render(
      <CustomButton
        title="Enabled Button"
        type="button"
        disabled={false}
        variant="contained"
        onClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "Enabled Button" });
    expect(button).not.toHaveClass("custom-button__disabled");
    expect(button).not.toBeDisabled();
  });

  it("should call onClick when button is clicked", () => {
    const onClickMock = vi.fn();

    render(
      <CustomButton
        title="Clickable Button"
        type="button"
        disabled={false}
        variant="contained"
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button", { name: "Clickable Button" });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when button is disabled", () => {
    const onClickMock = vi.fn();

    render(
      <CustomButton
        title="Disabled Click"
        type="button"
        disabled={true}
        variant="contained"
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button", { name: "Disabled Click" });
    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("should set the correct type attribute", () => {
    render(
      <CustomButton
        title="Submit Button"
        type="submit"
        disabled={false}
        variant="contained"
        onClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "Submit Button" });
    expect(button).toHaveAttribute("type", "submit");
  });
});
