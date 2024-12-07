import { CustomButton, CustomEmails, CustomStep } from "@/components";
import { EMPTY_STRING } from "@/constants/string.constants";
import { useDocumentContext } from "@/context/document.context";
import { useStepContext } from "@/context/stepdocument.context";
import { useToastContext } from "@/context/toast.context";
import { UserEmail } from "@/interfaces/useremail.interface";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./signerdocument.css";

const SignerDocument: React.FC = () => {
  const { showToastSuccess } = useToastContext();
  const { showStep, clearStep } = useStepContext();
  const { currentId, addEmailToDocument } = useDocumentContext();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [emails, setEmails] = useState<UserEmail[]>([
    { id: uuidv4(), email: EMPTY_STRING, valid: false },
  ]);

  const onChangeEmails = (currentEmails: UserEmail[]) => {
    setEmails(currentEmails);
    onHandleEmails(currentEmails);
  };

  const onHandleEmails = (currentEmails: UserEmail[]) => {
    const areAllValids = currentEmails.every((user) => user.valid);
    if (disabled === areAllValids) {
      setDisabled(!areAllValids);
    }
  };

  const onUpdateDocuments = () => {
    const signers: string[] = emails.map((user) => user.email);
    addEmailToDocument(currentId, signers);
    clearStep();
    showToastSuccess("Firma enviada!");
  };

  useEffect(() => {
    if (!showStep) {
      setEmails([]);
      setDisabled(true);
    }
  }, [showStep]);

  return (
    <div className="sign-document">
      <CustomStep title="Paso 2" />

      <CustomEmails emails={emails} onUpdateEmails={onChangeEmails} />

      <CustomButton
        disabled={disabled}
        title="Añadir Email/s"
        type="button"
        variant="contained"
        onClick={onUpdateDocuments}
      />
    </div>
  );
};

export default SignerDocument;
