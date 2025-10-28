import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      autoHideDuration={3000}>
      {children}
    </SnackbarProvider>
  );
}
