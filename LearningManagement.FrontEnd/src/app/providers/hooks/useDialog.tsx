import { useDialogContext } from "../DialogProvider/DialogContext";

export function useDialog() {
  const { openDialog, closeDialog } = useDialogContext();

  return {
    openDialog,
    closeDialog,
  };
}
