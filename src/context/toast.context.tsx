import React, { createContext, ReactNode, useContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextProps {
  showToastSuccess: (message: string) => void;
  showToastInfo: (message: string) => void;
  showToastWarning: (message: string) => void;
  showToastError: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showToastSuccess = (message: string) => {
    toast.success(message);
  };

  const showToastInfo = (message: string) => {
    toast.info(message);
  };

  const showToastWarning = (message: string) => {
    toast.warning(message);
  };

  const showToastError = (message: string) => {
    toast.error(message);
  };

  return (
    <ToastContext.Provider
      value={{
        showToastSuccess,
        showToastInfo,
        showToastWarning,
        showToastError,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {children}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToastContext = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
