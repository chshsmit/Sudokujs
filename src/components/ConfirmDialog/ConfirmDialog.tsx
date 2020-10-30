/**
 * ConfirmDialog.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-30T11:55:42.660Z-07:00
 * @last-modified 2020-10-30T12:19:42.898Z-07:00
 */

// ---------------------------------------------------------------

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// ---------------------------------------------------------------

interface ConfirmDialogProps {
  isOpen: boolean;
  toggleConfirm: () => void;
  title: string;
  message: string;
  confirmAction: () => void;
  confirmActionText?: string;
  cancelAction: () => void;
  cancelActiontext?: string;
}

// ---------------------------------------------------------------

const ConfirmDialog = ({
  isOpen,
  toggleConfirm,
  title,
  message,
  confirmAction,
  confirmActionText = "Continue",
  cancelAction,
  cancelActiontext = "Cancel",
}: ConfirmDialogProps): React.ReactElement => (
  <Dialog open={isOpen} onClose={toggleConfirm}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={cancelAction} color="primary">
        {cancelActiontext}
      </Button>
      <Button onClick={confirmAction} color="primary">
        {confirmActionText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
