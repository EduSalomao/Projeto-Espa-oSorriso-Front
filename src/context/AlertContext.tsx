// src/context/AlertContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Alert = {
  severity: "success" | "error" | "warning" | "info";
  message: string;
};

type AlertContextType = {
  showAlert: (alert: Alert, duration?: number) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within an AlertProvider");
  return context;
};

import AutoAlert from "../components/Alerts/CustomAlert";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (newAlert: Alert, duration = 4000) => {
    setAlert(newAlert);
    setTimeout(() => setAlert(null), duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <AutoAlert
          severity={alert.severity}
          message={alert.message}
          duration={4000}
          onDone={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};
