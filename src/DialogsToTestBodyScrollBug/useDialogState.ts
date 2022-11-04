import { useState } from "react";

export interface IDialogState {
  dialogIsOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export function useDialogState() {
  const [ dialogIsOpen, setDialogisOpen] = useState(false);

  function openDialog() {
    setDialogisOpen(true);
  }
  function closeDialog() {
    setDialogisOpen(false);
  }
  return {
    dialogIsOpen,
    openDialog,
    closeDialog,
  }
}