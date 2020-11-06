/**
 * TimeAndDifficulty.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-28T14:44:41.098Z-07:00
 * @last-modified 2020-11-06T11:55:38.934Z-08:00
 */

// ---------------------------------------------------------------

import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "@material-ui/icons/PlayArrow";

// ---------------------------------------------------------------

interface TimeAndDifficultyProps {
  difficulty: string | null;
  toggleGamePaused: () => void;
  gamePaused: boolean;
  solved: boolean;
  secondsPlayed: number;
}

const TimeAndDifficultyStyles = makeStyles({
  tdRoot: {
    width: "50vw",
    marginTop: "2%",
  },
});

// ---------------------------------------------------------------

const TimeAndDifficulty = ({
  difficulty,
  toggleGamePaused,
  gamePaused,
  secondsPlayed,
}: TimeAndDifficultyProps): React.ReactElement => {
  const classes = TimeAndDifficultyStyles();

  return (
    <Grid
      container
      className={classes.tdRoot}
      direction="row"
      justify="space-between"
      alignItems="baseline"
    >
      <Grid item>
        <Typography>{difficulty && difficulty.toUpperCase()}</Typography>
      </Grid>
      <Grid item>
        {gamePaused ? (
          <Button startIcon={<PlayIcon />}>Paused</Button>
        ) : (
          <Button onClick={toggleGamePaused} startIcon={<PauseIcon />}>
            Pause
          </Button>
        )}
      </Grid>
      <Grid item>
        <Typography>
          {Math.floor(secondsPlayed / 60)}:
          {secondsPlayed % 60 < 10
            ? "0" + (secondsPlayed % 60)
            : secondsPlayed % 60}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TimeAndDifficulty;
