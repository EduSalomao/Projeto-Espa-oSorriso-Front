import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import type { SlideProps } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface AutoAlertProps {
  severity?: AlertProps["severity"];
  message: string;
  duration?: number; // tempo em ms
  onDone?: () => void; // callback quando fechar
}

export default function AutoAlert({
  severity = "info",
  message,
  duration = 3000,
  onDone,
}: AutoAlertProps) {
  const [open, setOpen] = useState(true);
  console.log("AutoAlert", message);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      if (onDone) onDone();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDone]);

  return (
    <Snackbar
      open={open}
      slots={{ transition: SlideTransition }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
