import { CustomEmails } from "@/components/customemails/customemails";
import { UserEmail } from "@/interfaces/useremail.interface";
import { validateEmail } from "@/utils/email.functions";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/utils/email.functions", () => ({
  validateEmail: vi.fn(),
}));


describe("CustomEmails", () => {
  let emails: UserEmail[];

  beforeEach(() => {
    emails = [
      { id: "1", email: "test@example.com", valid: true },
      { id: "2", email: "invalid-email", valid: false },
    ];
  });

  it("should render the emails passed as props correctly", () => {
    const onUpdateEmails = vi.fn();
    render(<CustomEmails emails={emails} onUpdateEmails={onUpdateEmails} />);

    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("invalid-email")).toBeInTheDocument();
  });

  it("should add a new email when the icon is clicked", () => {
    const onUpdateEmails = vi.fn();
    render(<CustomEmails emails={emails} onUpdateEmails={onUpdateEmails} />);

    const addButton = screen.getByTestId("svg");
    fireEvent.click(addButton);

    expect(onUpdateEmails).toHaveBeenCalled();

    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(2);
  });

  it("should update the email when the input value changes", () => {
    const onUpdateEmails = vi.fn();
    render(<CustomEmails emails={emails} onUpdateEmails={onUpdateEmails} />);

    const input = screen.getByDisplayValue("test@example.com");
    fireEvent.change(input, { target: { value: "new-email@example.com" } });

    expect(onUpdateEmails).toHaveBeenCalledWith([
      { id: "1", email: "new-email@example.com", valid: undefined },
      { id: "2", email: "invalid-email", valid: false },
    ]);
  });

  it("should remove an email when the delete icon is clicked", () => {
    const onUpdateEmails = vi.fn();
    render(<CustomEmails emails={emails} onUpdateEmails={onUpdateEmails} />);

    const deleteButton = screen.getAllByRole("button")[1]; 
    fireEvent.click(deleteButton);

    expect(onUpdateEmails).toHaveBeenCalledWith([
      { id: "1", email: "test@example.com", valid: true },
    ]);
  });

  it("should call validateEmail to validate an email when it changes", () => {
    const onUpdateEmails = vi.fn();
    render(<CustomEmails emails={emails} onUpdateEmails={onUpdateEmails} />);

    const input = screen.getByDisplayValue("test@example.com");
    fireEvent.change(input, { target: { value: "new-email@example.com" } });


    expect(validateEmail).toHaveBeenCalledWith("new-email@example.com");
  });
});
