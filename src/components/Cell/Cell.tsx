/**
 * Cell.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:48:46.510Z-07:00
 * @last-modified 2020-11-06T12:26:14.698Z-08:00
 */

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import clsx from "clsx";
import { Typography } from "@material-ui/core";

const CellStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainCell: {
      borderLeft: "1px solid",
      borderTop: "1px solid",
      borderColor: "black !important",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      [theme.breakpoints.up("lg")]: {
        fontSize: "2em",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1.5em",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.25em",
      },
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
    notesCell: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 33%)",
      gridTemplateRows: "repeat(3, 33%)",
      color: "rgba(60, 60, 60, 0.5)",
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
    activeCellValueNote: {
      color: "black",
      fontWeight: "bold",
    },
    editableCellError: {
      color: "rgba(255, 0, 0, .8)",
    },
    uneditableCellError: {
      background: "rgba(255, 0, 0, .3)",
    },
  })
);

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
  cellIsCausingError: boolean;
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
  cellIsCausingError,
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
      : "",
    cellIsCausingError && editable ? styles.editableCellError : "",
    cellIsCausingError && !editable ? styles.uneditableCellError : ""
  );

  return (
    <div
      className={cellClass}
      onClick={() => onClick(rowPosition, columnPosition)}
    >
      {value ? (
        <Fade in>
          <div>{value}</div>
        </Fade>
      ) : notes.length !== 0 ? (
        <div className={styles.notesCell}>
          {notes.map((value, index) => {
            return (
              <Typography
                key={index}
                className={
                  activeCellValue === index + 1
                    ? styles.activeCellValueNote
                    : ""
                }
              >
                {value ? index + 1 : ""}
              </Typography>
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
