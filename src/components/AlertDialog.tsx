import React, { ReactNode } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


type Props = {
  open: boolean,
  children: ReactNode,
  handleClose?: () => void
};

export default function AlertDialog({ open, children, handleClose, ...props }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}