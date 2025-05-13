import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AlertProvider } from "./context/AlertContext.tsx";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  //</StrictMode>,
)
