import { DialogProvider } from "./DialogProvider";
import { LoadingProvider } from "./LoadingProvider";
import { ToastProvider } from "./ToastProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <ToastProvider>
      <DialogProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </DialogProvider>
    </ToastProvider>
);
