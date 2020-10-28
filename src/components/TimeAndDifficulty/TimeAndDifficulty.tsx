/**
 * TimeAndDifficulty.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-28T14:44:41.098Z-07:00
 * @last-modified 2020-10-28T14:49:35.674Z-07:00
 */

// ---------------------------------------------------------------

import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// ---------------------------------------------------------------

interface TimeAndDifficultyProps {
  difficulty: string;
}

const TimeAndDifficultyStyles = makeStyles({
  tdRoot: {
    width: "675px",
    marginTop: "2%",
  },
});

// ---------------------------------------------------------------

const TimeAndDifficulty = ({
  difficulty,
}: TimeAndDifficultyProps): React.ReactElement => {
  const classes = TimeAndDifficultyStyles();

  return (
    <Grid
      container
      className={classes.tdRoot}
      direction="row"
      justify="space-between"
    >
      <Grid item>
        <Typography>{difficulty.toUpperCase()}</Typography>
      </Grid>
      <Grid item>0:00</Grid>
    </Grid>
  );
};

export default TimeAndDifficulty;
