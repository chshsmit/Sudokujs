/**
 * Actions.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-21T13:12:57.896Z-07:00
 * @last-modified 2020-11-06T12:06:05.294Z-08:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ActionIcon from "components/Actions/ActionIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";

// ---------------------------------------------------------------

const ActionsStyles = makeStyles({
  mainActionContainer: {
    marginTop: "1%",
    marginLeft: "1%",
    width: "75vw",
    // margin: "auto",
  },
});

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
