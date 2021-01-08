/**
 * NavBar.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-27T13:50:08.427Z-07:00
 * @last-modified 2021-01-05T18:59:03.600Z-08:00
 */

//---------------------------------------------------------------------------------------------------

import React, { useState } from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Grid,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

import NavBarDrawer from "components/NavBar/NavBarDrawer";

//---------------------------------------------------------------------------------------------------

const NavBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      alignContent: "start",
      cursor: "pointer",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

interface NavBarProps {
  goBackToHome: () => void;
  gameIsActive: boolean;
}

//---------------------------------------------------------------------------------------------------

const NavBar = ({
  goBackToHome,
  gameIsActive,
}: NavBarProps): React.ReactElement => {
  const classes = NavBarStyles();
  const [drawerIsOpen, openCloseDrawer] = useState(false);

  const toggleDrawer = () => {
    openCloseDrawer(!drawerIsOpen);
  };

  return (
    <div className={classes.root}>
      <NavBarDrawer
        goBackToHome={goBackToHome}
        drawerIsOpen={drawerIsOpen}
        toggleDrawer={toggleDrawer}
      />
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" alignItems="center">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              onClick={goBackToHome}
              variant="h6"
              className={classes.title}
            >
              SudokuJs
            </Typography>
          </Grid>
          {gameIsActive && (
            <Tooltip title="Round Settings" placement="left">
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
