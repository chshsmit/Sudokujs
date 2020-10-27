/**
 * NavBar.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-27T13:50:08.427Z-07:00
 * @last-modified 2020-10-27T13:59:47.678Z-07:00
 */

//---------------------------------------------------------------------------------------------------

import React from "react";

import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

//---------------------------------------------------------------------------------------------------

const NavBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      alignContent: "start",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

//---------------------------------------------------------------------------------------------------

const NavBar = (): React.ReactElement => {
  const classes = NavBarStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SudokuJs
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
