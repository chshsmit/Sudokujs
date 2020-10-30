/**
 * HomePage.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-28T14:10:16.632Z-07:00
 * @last-modified 2020-10-30T11:30:42.926Z-07:00
 */

// ---------------------------------------------------------------

import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Done from "@material-ui/icons/Done";

// ---------------------------------------------------------------

const HomePageStyles = makeStyles({
  homepageRoot: {
    width: "100%",
    marginTop: "5%",
  },
  difficultyButton: {
    maxWidth: "120px",
    minWidth: "120px",
    maxHeight: "40px",
    minHeight: "40px",
  },
});

interface HomePageProps {
  setGameDifficulty: (difficulty: string) => void;
}

// ---------------------------------------------------------------

const HomePage = ({ setGameDifficulty }: HomePageProps): React.ReactElement => {
  const classes = HomePageStyles();

  const buttons = ["easy", "medium", "hard", "extreme"].map((difficulty) => {
    return (
      <Grid item key={difficulty}>
        <Button
          className={classes.difficultyButton}
          variant="contained"
          color="primary"
          startIcon={<Done />}
          size="large"
          onClick={() => setGameDifficulty(difficulty)}
        >
          {difficulty}
        </Button>
      </Grid>
    );
  });

  return (
    <Grid
      className={classes.homepageRoot}
      spacing={3}
      container
      direction="column"
      justify="center"
      alignContent="center"
    >
      <Grid item>
        <Typography variant="h5">Select a difficulty to get started</Typography>
      </Grid>
      {buttons}
    </Grid>
  );
};

export default HomePage;
