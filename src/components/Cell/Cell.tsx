/**
 * Cell.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:48:46.510Z-07:00
 * @last-modified 2020-10-22T16:43:51.299Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const CellStyles = makeStyles({
  mainCell: {
    width: "75px",
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
    background: "rgba(60, 60, 60, 0.1)",
  },
  sameAsActiveCellValue: {
    background: "rgba(60, 60, 60, 0.3)",
  },
  lastColumn: {
    borderRight: "4px solid",
    width: "71px",
  },
  lastRow: {
    borderBottom: "4px solid",
  },
  thickLeft: {
    borderLeft: "4px solid",
    width: "71px",
  },
  thickTop: {
    borderTop: "4px solid",
    height: "71px",
  },
  notesCell: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 24px)",
    gridTemplateRows: "repeat(3, 24px)",
    color: "rgba(60, 60, 60, 0.5)",
    fontSize: "medium",
  },
  activeCellValueNote: {
    color: "black",
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
  notes: Array<boolean>;
  activeCellValue: number;
}

const Cell = ({
  active,
  value,
  rowPosition,
  columnPosition,
  onClick,
  isConstrainingActive,
  editable,
  notes,
  activeCellValue,
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
    rowPosition % 3 === 0 ? styles.thickTop : "",
    activeCellValue === value && value !== 0 && !active
      ? styles.sameAsActiveCellValue
      : ""
  );

  return (
    <div
      className={cellClass}
      onClick={() => onClick(rowPosition, columnPosition)}
    >
      {value ? (
        value
      ) : notes.length !== 0 ? (
        <div className={styles.notesCell}>
          {notes.map((value, index) => {
            return (
              <div
                key={index}
                className={
                  activeCellValue === index + 1
                    ? styles.activeCellValueNote
                    : ""
                }
              >
                {value ? index + 1 : ""}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cell;
