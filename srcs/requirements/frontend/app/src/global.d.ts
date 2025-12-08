// global.d.ts

export {};

declare global {
  // 1. On définit les types ici pour qu'ils soient accessibles partout
  type AlertType = "default" | "primary" | "success" | "warning" | "error";

  interface AlertOptions {
    title?: string;
    message?: string;
    type?: AlertType;
    rounded?: boolean;
    duration?: number;
  }

  interface DialogOptions {
    title?: string;
    message?: string;
    type?: AlertType;
    rounded?: boolean;
    confirmText?: string;
    cancelText?: string | null;
    onConfirm?: () => void;
    onCancel?: () => void;
  }

  interface Window {
    removeAlert: (alertId: string) => void
    createAlert: (options?: AlertOptions) => string;
    createDialog: (options?: DialogOptions) => void;
    isDialogOpen: () => boolean;
    closeDialog: () => void;
  }

  // Cela permet d'appeler createAlert() directement sans écrire window.createAlert()
  var removeAlert: (alertId: string) => void;
  var createAlert: (options?: AlertOptions) => string;
  var createDialog: (options?: DialogOptions) => void;
  var isDialogOpen: () => boolean;
  var closeDialog: () => void;
}