/**
 * TimeAndDifficulty.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-28T14:44:41.098Z-07:00
 * @last-modified 2020-10-30T14:23:11.704Z-07:00
 */

// ---------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
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
  toggleGamePaused,
  gamePaused,
  solved,
}: TimeAndDifficultyProps): React.ReactElement => {
  const classes = TimeAndDifficultyStyles();

  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      secondsRef.current = secondsRef.current + 1;
      setSeconds(secondsRef.current);
    }, 1000);

    if (gamePaused || solved) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gamePaused]);

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
          {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TimeAndDifficulty;
