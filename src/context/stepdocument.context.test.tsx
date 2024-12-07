/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepProvider, useStepContext } from "@/context/stepdocument.context";
import { act, renderHook, waitFor } from "@testing-library/react";
import { ReactPortal } from "react";
import { beforeEach, describe, expect, it } from "vitest";

describe("StepProvider", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = ({ children }: ReactPortal) => (
      <StepProvider>{children}</StepProvider>
    );
  });

  it("should provide default values", () => {
    const { result } = renderHook(() => useStepContext(), { wrapper });

    expect(result.current.showStep).toBeFalsy();
  });

  it("should updateStep step status", () => {
    const { result } = renderHook(() => useStepContext(), { wrapper });

    act(() => {
      result.current.updateStep(true);
    });

    expect(result.current.showStep).toBeTruthy();
  });

  it("should load init showStep value when call clearStep", () => {
    const { result } = renderHook(() => useStepContext(), { wrapper });

    act(() => {
      result.current.updateStep(true);
      result.current.clearStep();
    });

    waitFor(() => {
      expect(result.current.showStep).toBe(false);
    });
  });

  it("should throw an error when useStepContext is used outside of provider", () => {
    const { result } = renderHook(() => useStepContext);
    expect(result.current.name).toBe("useStepContext");
  });

  it("should throw an error if useStepContext is used outside StepProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useStepContext();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toEqual(
      new Error("useStepContext must be used within a StepProvider")
    );
  });
});
