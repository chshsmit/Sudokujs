/**
 * Actions.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-21T13:12:57.896Z-07:00
 * @last-modified 2020-11-06T12:20:00.581Z-08:00
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
  })
);

interface ActionsProps {
  activeCellEditable: boolean;
  deleteCell: (value: number) => void;
  toggleNoteMode: () => void;
  noteModeActive: boolean;
}

// ---------------------------------------------------------------

const Actions = ({
  activeCellEditable,
  deleteCell,
  toggleNoteMode,
  noteModeActive,
}: ActionsProps): React.ReactElement => {
  const classes = ActionsStyles();
  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      direction="row"
      className={classes.mainActionContainer}
    >
      <ActionIcon
        action={() => deleteCell(0)}
        active={activeCellEditable}
        actionText="Delete (Backspace)"
        icon={<DeleteIcon fontSize="large" />}
      />
      <ActionIcon
        action={toggleNoteMode}
        actionText="Notes (n)"
        icon={(
          <>
            <NotesIcon fontSize="large" />
            {noteModeActive ? "On" : "Off"}
          </>
        )}
      />
    </Grid>
  );
};

export default Actions;
