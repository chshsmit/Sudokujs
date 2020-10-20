/**
 * Cell.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:48:46.510Z-07:00
 * @last-modified 2020-10-20T12:12:27.464Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const CellStyles = makeStyles({
  mainCell: {
    width: "50px",
    height: "50px",
    border: "solid 2px",
  },
  activeCell: {
    background: "yellow",
  },
});

interface CellProps {
  active: boolean;
}

const Cell = ({ active }: CellProps): React.ReactElement => {
  const styles = CellStyles();

  return (
    <div className={clsx(styles.mainCell, active ? styles.activeCell : null)}>
      9
    </div>
  );
};

export default Cell;
