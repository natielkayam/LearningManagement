import { createContext, useContext, useState, type ReactNode } from "react";

type DialogData = {
  component: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
} | null;

const DialogContext = createContext<{
  dialog: DialogData;
  openDialog: (data: DialogData) => void;
  closeDialog: () => void;
}>({
  dialog: null,
  openDialog: () => {},
  closeDialog: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogData>(null);

  const openDialog = (data: DialogData) => setDialog(data);
  const closeDialog = () => setDialog(null);

  return (
    <DialogContext.Provider value={{ 
      dialog,
      openDialog, 
      closeDialog
    }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
