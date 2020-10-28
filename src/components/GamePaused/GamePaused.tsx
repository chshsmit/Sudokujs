/**
 * GamePaused.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-28T15:36:15.542Z-07:00
 * @last-modified 2020-10-28T16:00:35.750Z-07:00
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

interface GamePausedProps {
  isOpen: boolean;
  toggleGamePaused: () => void;
}

// ---------------------------------------------------------------

const GamePaused = ({
  isOpen,
  toggleGamePaused,
}: GamePausedProps): React.ReactElement => {
  return (
    <Dialog open={isOpen} onClose={toggleGamePaused}>
      <DialogTitle>Paused</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your game is currently paused, press continue or anywhere else outside
          of this box to continue.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleGamePaused} color="primary">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GamePaused;
