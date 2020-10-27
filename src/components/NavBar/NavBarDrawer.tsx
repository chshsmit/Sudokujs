/**
 * NavBarDrawer.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-27T14:50:36.032Z-07:00
 * @last-modified 2020-10-27T14:58:47.728Z-07:00
 */

//---------------------------------------------------------------------------------------------------

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";

//---------------------------------------------------------------------------------------------------

interface NavBarDrawerProps {
  drawerIsOpen: boolean;
  toggleDrawer: () => void;
}

const NavBarDrawerStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

//---------------------------------------------------------------------------------------------------

const NavBarDrawer = ({
  drawerIsOpen,
  toggleDrawer,
}: NavBarDrawerProps): React.ReactElement => {
  const classes = NavBarDrawerStyles();

  const list = () => (
    <div className={classes.list}>
      <List>
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={drawerIsOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  );
};

export default NavBarDrawer;
