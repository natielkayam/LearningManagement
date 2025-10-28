import { Dialog } from "@mui/material";
import { useDialogContext } from "./DialogContext";

export function DialogLayout() {
  const { dialog, closeDialog } = useDialogContext();

  return (
    <Dialog 
      open={!!dialog} 
      onClose={closeDialog}
      maxWidth={dialog?.maxWidth || "sm"}
      fullWidth={dialog?.fullWidth || true}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
          overflow: "hidden",
          background: "transparent",
          border: "none",
          width: "100%",
          maxWidth: "450px",
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          margin: 2,
          maxHeight: "calc(100vh - 32px)",
          position: "relative",
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            zIndex: -1,
            inset: 0,
            backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
            backgroundRepeat: "no-repeat",
            borderRadius: "12px",
          },
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {dialog?.component}
    </Dialog>
  );
}