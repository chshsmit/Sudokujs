/**
 * Cell.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:48:46.510Z-07:00
 * @last-modified 2020-10-20T15:20:37.959Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const CellStyles = makeStyles({
  mainCell: {
    width: "50px",
    height: "50px",
    borderLeft: "1px solid",
    borderTop: "1px solid",
  },
  activeCell: {
    background: "yellow",
  },
  lastColumn: {
    borderRight: "4px solid",
  },
  lastRow: {
    borderBottom: "4px solid",
  },
  thickLeft: {
    borderLeft: "4px solid",
  },
  thickTop: {
    borderTop: "4px solid",
  },
});

interface CellProps {
  active: boolean;
  value: number;
  rowPosition: number;
  columnPosition: number;
}

const Cell = ({
  active,
  value,
  rowPosition,
  columnPosition,
}: CellProps): React.ReactElement => {
  const styles = CellStyles();

  const cellClass = clsx(
    styles.mainCell,
    active ? styles.activeCell : "",
    columnPosition === 8 ? styles.lastColumn : "",
    rowPosition === 8 ? styles.lastRow : "",
    columnPosition % 3 === 0 ? styles.thickLeft : "",
    rowPosition % 3 === 0 ? styles.thickTop : ""
  );

  return <div className={cellClass}>{value}</div>;
};

export default Cell;
