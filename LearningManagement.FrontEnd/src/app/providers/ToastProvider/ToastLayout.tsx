import { Box, Typography } from "@mui/material";
import type { SnackbarKey, SnackbarMessage } from "notistack";
import type { VariantType } from "notistack";
import type { JSX } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

export function ToastLayout(
  key: SnackbarKey,
  message: SnackbarMessage,
  closeSnackbar: (key: SnackbarKey) => void,
  variant: VariantType
) {
  const variantColors: Record<VariantType, string> = {
    success: "#edf7ed",
    error: "#fdecea",
    warning: "#fff4e5",
    info: "#e8f4fd",
    default: "",
  };

  const textColors: Record<VariantType, string> = {
    success: "#2e7d32",
    error: "#d32f2f",
    warning: "#ed6c02",
    info: "#0288d1",
    default: "",
  };

  const iconMap: Record<VariantType, JSX.Element> = {
    success: <CheckCircleIcon style={{ color: "#4caf50" }} />,
    error: <ErrorIcon style={{ color: "#f44336" }} />,
    info: <InfoIcon style={{ color: "#fff" }} />,
    warning: <WarningIcon style={{ color: "#fff" }} />,
    default: <></>,
  };

  return (
    <Box
      role="alert"
      tabIndex={0}
      onClick={() => closeSnackbar(key)}
      sx={{
        cursor: "pointer",
        p: 1,
        borderRadius: 1,
        backgroundColor: variantColors[variant],
        color: textColors[variant],
        "&:hover": { opacity: 0.8 },
        maxWidth: "100%",
      }}>
      <Box display="flex" alignItems="center">
        <Box sx={{ ml: 1, mr: 1 }}>{iconMap[variant]}</Box>
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
}
