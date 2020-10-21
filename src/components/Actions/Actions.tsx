/**
 * Actions.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-21T13:12:57.896Z-07:00
 * @last-modified 2020-10-21T14:56:27.765Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ActionIcon from "components/Actions/ActionIcon";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";

// ---------------------------------------------------------------

const ActionsStyles = makeStyles({
  mainActionContainer: {
    marginTop: "3%",
    width: "10%",
    // margin: "auto",
  },
});

interface ActionsProps {
  activeCellEditable: boolean;
  deleteCell: (value: number) => void;
}

// ---------------------------------------------------------------

const Actions = ({
  activeCellEditable,
  deleteCell,
}: ActionsProps): React.ReactElement => {
  const classes = ActionsStyles();
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="flex-start"
      direction="column"
      className={classes.mainActionContainer}
    >
      <ActionIcon
        action={() => console.log("Hello")}
        actionText="Undo"
        icon={<UndoIcon fontSize="large" />}
      />
      <ActionIcon
        action={() => deleteCell(0)}
        active={activeCellEditable}
        actionText="Delete"
        icon={<DeleteIcon fontSize="large" />}
      />
      <ActionIcon
        action={() => console.log("Hello")}
        actionText="Notes"
        icon={<NotesIcon fontSize="large" />}
      />
    </Grid>
  );
};

export default Actions;
