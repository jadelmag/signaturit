import { CustomButton, CustomFileInput, CustomStep } from "@/components";
import { EMPTY_STRING } from "@/constants/string.constants";
import { useDocumentContext } from "@/context/document.context";
import { useStepContext } from "@/context/stepdocument.context";
import { NewDocument } from "@/interfaces/document.interface";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./uploaddocument.css";

const UploadDocument: React.FC = () => {
  const { showStep, updateStep } = useStepContext();
  const { addDocument } = useDocumentContext();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(EMPTY_STRING);

  const handleUpload = () => {
    if (file) {
      const newDocument: NewDocument = {
        id: uuidv4(),
        name: file.name,
        status: "Pending",
        signers: [],
      };
      addDocument(newDocument);
      setFile(null);
      updateStep(true);
    }
  };

  const onHandleFile = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files: FileList | null = (event.target as HTMLInputElement).files;
    if (!files) return;
    const file: File = files[0];
    setFile(file);
    setFileName(file.name);
  };

  useEffect(() => {
    if (!showStep) {
      setFile(null);
      setFileName(EMPTY_STRING);
    }
  }, [showStep]);

  return (
    <div className="upload-document">
      <CustomStep title="Paso 1" />

      <CustomFileInput
        fileName={fileName}
        disabled={fileName.length > 0 && !file}
        accept={".pdf,.docx"}
        title="Seleccionar archivo:"
        handleFileChange={onHandleFile}
      />

      <CustomButton
        disabled={!file}
        title="Subir Documentos"
        type="button"
        variant="contained"
        onClick={handleUpload}
      />
    </div>
  );
};

export default UploadDocument;
