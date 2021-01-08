/**
 * Actions.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-21T13:12:57.896Z-07:00
 * @last-modified 2021-01-08T14:47:23.298Z-08:00
 */

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ActionIcon from "components/Actions/ActionIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";

// ---------------------------------------------------------------

const ActionsStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainActionContainer: {
      marginTop: "1%",
      marginLeft: "1%",
      // margin: "auto",
      [theme.breakpoints.up("lg")]: {
        width: "40vw",
      },
      [theme.breakpoints.down("md")]: {
        width: "50vw",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80vw",
      },
      [theme.breakpoints.down("xs")]: {
        width: "90vw",
      },
    },
    numbersGrid: {
      marginTop: "2%",
      marginBottom: "2%",
    },
    numbers: {
      borderRadius: "5px",
      [theme.breakpoints.up("lg")]: {
        fontSize: "2em",
        width: "4vw",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1.5em",
        width: "5vw",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
        width: "8vw",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.25em",
        width: "10vw",
      },
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, .05)",
        cursor: "pointer",
      },
    },
  })
);

interface ActionsProps {
  activeCellEditable: boolean;
  deleteCell: (value: number) => void;
  toggleNoteMode: () => void;
  noteModeActive: boolean;
  addNumberToGrid: (value: number) => void;
}

// ---------------------------------------------------------------

const Actions = ({
  activeCellEditable,
  deleteCell,
  toggleNoteMode,
  noteModeActive,
  addNumberToGrid,
}: ActionsProps): React.ReactElement => {
  const classes = ActionsStyles();

  const numbers = [...Array.from(Array(9).keys())]
    .map((n) => n + 1)
    .map((num) => (
      <Grid item key={num}>
        <div
          onClick={() => {
            if (activeCellEditable) addNumberToGrid(num);
          }}
          className={classes.numbers}
        >
          {num}
        </div>
      </Grid>
    ));

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      direction="column"
      className={classes.mainActionContainer}
    >
      <Grid container justify="space-around" className={classes.numbersGrid}>
        {numbers}
      </Grid>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        direction="row"
      >
        <ActionIcon
          action={() => deleteCell(0)}
          active={activeCellEditable}
          actionText="Delete (Backspace)"
          icon={<DeleteIcon fontSize="large" />}
        />
        <ActionIcon
          action={toggleNoteMode}
          actionText="Notes (n or shift)"
          icon={(
            <>
              <NotesIcon fontSize="large" />
              {noteModeActive ? "On" : "Off"}
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Actions;
