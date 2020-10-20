/**
 * Cell.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:48:46.510Z-07:00
 * @last-modified 2020-10-20T15:42:59.798Z-07:00
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "large",
  },
  activeCell: {
    background: "#fafaa0",
  },
  constrainingCell: {
    background: "#d4d4d4",
  },
  lastColumn: {
    borderRight: "4px solid",
    width: "46px",
  },
  lastRow: {
    borderBottom: "4px solid",
  },
  thickLeft: {
    borderLeft: "4px solid",
    width: "46px",
  },
  thickTop: {
    borderTop: "4px solid",
    height: "46px",
  },
});

interface CellProps {
  active: boolean;
  isConstrainingActive: boolean;
  value: number;
  rowPosition: number;
  columnPosition: number;
  onClick: (rowPosition: number, columnPosition: number) => void;
}

const Cell = ({
  active,
  value,
  rowPosition,
  columnPosition,
  onClick,
  isConstrainingActive,
}: CellProps): React.ReactElement => {
  const styles = CellStyles();

  const cellClass = clsx(
    styles.mainCell,
    active ? styles.activeCell : "",
    isConstrainingActive && !active ? styles.constrainingCell : "",
    columnPosition === 8 ? styles.lastColumn : "",
    rowPosition === 8 ? styles.lastRow : "",
    columnPosition % 3 === 0 ? styles.thickLeft : "",
    rowPosition % 3 === 0 ? styles.thickTop : ""
  );

  return (
    <div
      className={cellClass}
      onClick={() => onClick(rowPosition, columnPosition)}
    >
      {value}
    </div>
  );
};

export default Cell;
