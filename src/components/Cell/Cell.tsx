/**
 * Cell.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:48:46.510Z-07:00
 * @last-modified 2020-10-21T14:06:42.324Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const CellStyles = makeStyles({
  mainCell: {
    width: "70px",
    borderLeft: "1px solid",
    borderTop: "1px solid",
    borderColor: "black !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2em",
    fontWeight: "bold",
  },
  editableCell: {
    color: "blue",
  },
  activeCell: {
    background: "#fafaa0",
  },
  constrainingCell: {
    background: "rgba(230, 230, 230, .8)",
  },
  lastColumn: {
    borderRight: "4px solid",
    width: "66px",
  },
  lastRow: {
    borderBottom: "4px solid",
  },
  thickLeft: {
    borderLeft: "4px solid",
    width: "66px",
  },
  thickTop: {
    borderTop: "4px solid",
    height: "66px",
  },
});

interface CellProps {
  active: boolean;
  isConstrainingActive: boolean;
  value: number;
  rowPosition: number;
  columnPosition: number;
  onClick: (rowPosition: number, columnPosition: number) => void;
  editable: boolean;
}

const Cell = ({
  active,
  value,
  rowPosition,
  columnPosition,
  onClick,
  isConstrainingActive,
  editable,
}: CellProps): React.ReactElement => {
  const styles = CellStyles();

  const cellClass = clsx(
    styles.mainCell,
    active ? styles.activeCell : "",
    editable ? styles.editableCell : "",
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
      {value ? value : ""}
    </div>
  );
};

export default Cell;
