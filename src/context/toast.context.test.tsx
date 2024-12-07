/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastProvider, useToastContext } from "@/context/toast.context";
import { act, renderHook, waitFor } from "@testing-library/react";
import { ReactPortal } from "react";
import { beforeEach, describe, expect, it } from "vitest";

describe("ToastProvider", () => {
  let wrapper: any;
  let message: string;

  beforeEach(() => {
    message = "Mensaje de prueba!";
    wrapper = ({ children }: ReactPortal) => (
      <ToastProvider>{children}</ToastProvider>
    );
  });

  it("should show showToastSuccess", () => {
    const { result } = renderHook(() => useToastContext(), { wrapper });

    act(() => {
      result.current.showToastSuccess(message);
    });

    waitFor(() => {
      expect(result.current.showToastSuccess).toBeCalledWith(message);
    });
  });

  it("should show showToastInfo", () => {
    const { result } = renderHook(() => useToastContext(), { wrapper });

    act(() => {
      result.current.showToastInfo(message);
    });

    waitFor(() => {
      expect(result.current.showToastInfo).toBeCalledWith(message);
    });
  });

  it("should show showToastWarning", () => {
    const { result } = renderHook(() => useToastContext(), { wrapper });

    act(() => {
      result.current.showToastWarning(message);
    });

    waitFor(() => {
      expect(result.current.showToastWarning).toBeCalledWith(message);
    });
  });

  it("should show showToastError", () => {
    const { result } = renderHook(() => useToastContext(), { wrapper });

    act(() => {
      result.current.showToastError(message);
    });

    waitFor(() => {
      expect(result.current.showToastError).toBeCalledWith(message);
    });
  });

  it("should throw an error when useToastContext is used outside of provider", () => {
    const { result } = renderHook(() => useToastContext);

    expect(result.current.name).toBe("useToastContext");
  });

  it("should throw an error if useToastContext is used outside ToastProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useToastContext();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toEqual(
      new Error("useToastContext must be used within a ToastProvider")
    );
  });
});
