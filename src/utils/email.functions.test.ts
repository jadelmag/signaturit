import { describe, expect, it } from "vitest";
import { validateEmail } from "./email.functions";

describe("validateEmail", () => {
  it("should return true for valid email addresses", () => {
    const validEmails = [
      "test@example.com",
      "user.name+tag+sorting@example.com",
      "user_name@example.co.uk",
      "user-name@sub.example.com",
      "1234567890@example.com",
      "email@example.museum",
      "email@example.travel",
      "firstname.lastname@example.com",
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBeTruthy();
    });
  });

  it("should return false for invalid email addresses", () => {
    const invalidEmails = [
      "plainaddress",
      "@missingusername.com",
      "username@com",
      "username@.com",
      "username@yahoo.com.",
      "username@yahoo.c",
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBeFalsy();
    });
  });

  it("should handle edge cases", () => {
    const edgeCaseEmails = [
      "", // Empty string
      " ", // Space
    ];

    edgeCaseEmails.forEach((email) => {
      expect(validateEmail(email)).toBeFalsy();
    });
  });
});
