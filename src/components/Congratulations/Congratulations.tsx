/**
 * Congratulations.tsx
 * @author Christopher Smith
 * @description Congratulations dialog when the user completes the puzzle successfully
 * @created 2020-11-01T10:08:18.911Z-08:00
 * @last-modified 2020-11-06T11:25:17.026Z-08:00
 */

// ---------------------------------------------------------------

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HomeIcon from "@material-ui/icons/Home";

import trophy from "static/trophy.png";

// -----------------------------------------------------------

interface CongratulationsProps {
  gameIsOver: boolean;
  returnHome: () => void;
  totalSolveTime: number;
}

const CongratulationsStyles = makeStyles({
  centeredText: {
    textAlign: "center",
  },
  trophyImage: {
    width: "75%",
  },
  dialogActions: {
    justifyContent: "space-around",
    marginTop: "2%",
  },
  dialogActionButton: {
    minWidth: "45%",
    maxWidth: "45%",
  },
});

const CongratulationsTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="down"
      ref={ref}
      {...props}
      timeout={{ enter: 500, exit: 500 }}
    />
  );
});

// -----------------------------------------------------------

const Congratulations = ({
  gameIsOver,
  returnHome,
  totalSolveTime,
}: CongratulationsProps): React.ReactElement => {
  const classes = CongratulationsStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={gameIsOver}
      fullScreen={fullScreen}
      TransitionComponent={CongratulationsTransition}
    >
      <DialogTitle className={classes.centeredText}>
        Congratulations
      </DialogTitle>
      <DialogContent className={classes.centeredText}>
        <DialogContentText>You completed the puzzle!</DialogContentText>
        <DialogContentText>
          Your total solve time was {Math.floor(totalSolveTime / 60)}:
          {totalSolveTime % 60 < 10
            ? "0" + (totalSolveTime % 60)
            : totalSolveTime % 60}
        </DialogContentText>
        <img src={trophy} alt="trophy" className={classes.trophyImage} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.dialogActionButton}
          color="primary"
          onClick={returnHome}
          startIcon={<HomeIcon />}
        >
          Return Home
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// -----------------------------------------------------------

export default Congratulations;
