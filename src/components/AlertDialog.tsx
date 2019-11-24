import React, { ReactNode } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


type Props = {
  open: boolean,
  children: ReactNode,
  handleClose?: () => void,
  disableBackdropClick?: boolean,
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined
};

export default function AlertDialog({ open, children, handleClose, disableBackdropClick, maxWidth }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick={disableBackdropClick}
      maxWidth={maxWidth}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}