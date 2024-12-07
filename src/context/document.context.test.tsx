/* eslint-disable @typescript-eslint/no-explicit-any */
import { EMPTY_STRING } from "@/constants/string.constants";
import {
  DocumentProvider,
  useDocumentContext,
} from "@/context/document.context";
import { NewDocument } from "@/interfaces/document.interface";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { ReactPortal } from "react";
import { beforeEach, describe, expect, it } from "vitest";

describe("DocumentContext", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = ({ children }: ReactPortal) => (
      <DocumentProvider>{children}</DocumentProvider>
    );
  });

  it("should initialize with empty documents and EMPTY_STRING as currentId", () => {
    const { result } = renderHook(() => useDocumentContext(), { wrapper });

    expect(result.current.currentId).toBe(EMPTY_STRING);
    expect(result.current.documents).toEqual([]);
  });

  it("should add a document and update currentId", () => {
    const { result } = renderHook(() => useDocumentContext(), { wrapper });

    const newDoc: NewDocument = {
      id: "1",
      name: "Test Document",
      status: "Pending",
      signers: [],
    };

    act(() => {
      result.current.addDocument(newDoc);
    });

    expect(result.current.currentId).toBe("1");
    expect(result.current.documents).toContainEqual(newDoc);
  });

  it("should update the status of a document", () => {
    const { result } = renderHook(() => useDocumentContext(), { wrapper });

    const newDoc: NewDocument = {
      id: "1",
      name: "Test Document",
      status: "Pending",
      signers: [],
    };

    act(() => {
      result.current.addDocument(newDoc);
    });

    act(() => {
      result.current.updateStatus("1", "Signed");
    });

    expect(result.current.documents[0].status).toBe("Signed");
  });

  it("should add emails to the signers of a document", () => {
    const { result } = renderHook(() => useDocumentContext(), { wrapper });

    const newDoc: NewDocument = {
      id: "1",
      name: "Test Document",
      status: "Pending",
      signers: [],
    };
    const newSigners = ["test1@example.com", "test2@example.com"];

    act(() => {
      result.current.addDocument(newDoc);
    });

    act(() => {
      result.current.addEmailToDocument("1", newSigners);
    });

    expect(result.current.documents[0].signers).toEqual(newSigners);
  });

  it("should throw an error if useDocumentContext is used outside DocumentProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useDocumentContext();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toEqual(
      new Error("useDocumentContext must be used within a DocumentProvider")
    );
  });
});
