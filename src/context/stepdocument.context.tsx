import React, { createContext, ReactNode, useContext, useState } from "react";

interface StepContextProps {
  showStep: boolean;
  updateStep: (newStatus: boolean) => void;
  clearStep: () => void;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export const StepProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showStep, setShowStep] = useState<boolean>(false);

  const updateStep = (newStatus: boolean) => {
    setShowStep(newStatus);
  };

  const clearStep = () => {
    setShowStep(false);
  };

  return (
    <StepContext.Provider value={{ showStep, updateStep, clearStep }}>
      {children}
    </StepContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStepContext = (): StepContextProps => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
