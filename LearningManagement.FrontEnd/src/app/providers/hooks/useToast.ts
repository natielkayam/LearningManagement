import { ToastLayout } from "../ToastProvider/ToastLayout";
import { useSnackbar } from "notistack";

export function useToast() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSuccess = (message: string) => {
    enqueueSnackbar("", {
      content: (key) => ToastLayout(key, message, closeSnackbar, "success"),
    });
  };

  const showError = (message: string) => {
    enqueueSnackbar("", {
      content: (key) => ToastLayout(key, message, closeSnackbar, "error"),
    });
  };

  const showInfo = (message: string) => {
    enqueueSnackbar("", {
      content: (key) => ToastLayout(key, message, closeSnackbar, "info"),
    });
  };

  const showWarning = (message: string) => {
    enqueueSnackbar("", {
      content: (key) => ToastLayout(key, message, closeSnackbar, "warning"),
    });
  };

  return { showSuccess, showError, showInfo, showWarning };
}
