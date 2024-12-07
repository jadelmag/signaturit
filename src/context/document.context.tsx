import { EMPTY_STRING } from "@/constants/string.constants";
import { Document, NewDocument } from "@/interfaces/document.interface";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface DocumentContextProps {
  currentId: string;
  documents: Document[];
  addDocument: (doc: NewDocument) => void;
  addEmailToDocument: (id: string, signers: string[]) => void;
  updateStatus: (id: string, status: "Signed" | "Declined") => void;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(
  undefined
);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentId, setCurrentId] = useState<string>(EMPTY_STRING);

  const addDocument = (doc: Document) => {
    setCurrentId(doc.id);
    setDocuments([...documents, doc]);
  };

  const updateStatus = (id: string, status: "Signed" | "Declined") => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, status } : doc))
    );
  };

  const addEmailToDocument = (id: string, signers: string[]) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, signers } : doc))
    );
  };

  return (
    <DocumentContext.Provider
      value={{
        currentId,
        documents,
        addDocument,
        updateStatus,
        addEmailToDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDocumentContext = (): DocumentContextProps => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentProvider"
    );
  }
  return context;
};
