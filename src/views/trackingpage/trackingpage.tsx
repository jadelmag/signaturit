import { STATUS } from "@/constants/status.constants";
import { useDocumentContext } from "@/context/document.context";
import { useToastContext } from "@/context/toast.context";
import { getColorByStatus } from "@/utils/tracking.functions";
import React from "react";
import "./trackingpage.scss";

const TrackingPage: React.FC = (): JSX.Element => {
  const { showToastInfo, showToastError } = useToastContext();
  const { documents, updateStatus } = useDocumentContext();

  const simulateStatusChange = (id: string, status: "Signed" | "Declined") => {
    updateStatus(id, status);
    if (status === STATUS.SIGNED) {
      showToastInfo("El documento ha sido aprobado!");
    } else {
      showToastError("El documento ha sido declinado!");
    }
  };

  return (
    <div className="management-system">
      <div className="document-list">
        <h2>Documentos</h2>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="list-items">
              <span className="list-items__name">{doc.name}</span>
              <div className="list-items__container">
                <span style={{ backgroundColor: getColorByStatus(doc.status)}}>{doc.status}</span>
                <button onClick={() => simulateStatusChange(doc.id, "Signed")}>
                  Simulate Sign
                </button>
                <button
                  onClick={() => simulateStatusChange(doc.id, "Declined")}
                >
                  Simulate Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackingPage;
