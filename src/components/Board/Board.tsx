/**
 * Board.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:40:07.951Z-07:00
 * @last-modified 2020-11-06T12:19:54.662Z-08:00
 */

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Cell from "components/Cell/Cell";
import { checkIfIndexInBox, CellNotes } from "utils/utils";
import SudokuHelper from "utils/SudokuHelper";

// const sudokuHelper = new SudokuHelper();

const BoardStyles = makeStyles((theme: Theme) =>
  createStyles({
    boardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(9, 11%)",
      gridTemplateRows: "repeat(9, 11%)",
      [theme.breakpoints.up("lg")]: {
        width: "40vw",
        height: "40vw",
      },
      [theme.breakpoints.down("md")]: {
        width: "50vw",
        height: "50vw",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80vw",
        height: "80vw",
      },
      [theme.breakpoints.down("xs")]: {
        width: "90vw",
        height: "90vw",
      },
      paddingLeft: ".5%",
    },
  })
);

interface BoardProps {
  sudokuGrid: Array<Array<number>>;
  changeActiveCell: (rowPosition: number, columnPosition: number) => void;
  activeRowPosition: number;
  activeColumnPosition: number;
  uneditableCells: Array<string>;
  cellNotes: CellNotes;
  sudokuHelper: SudokuHelper;
}

const Board = ({
  sudokuGrid,
  changeActiveCell,
  activeRowPosition,
  activeColumnPosition,
  uneditableCells,
  cellNotes,
  sudokuHelper,
}: BoardProps): React.ReactElement => {
  const classes = BoardStyles();

  const allCells = sudokuGrid.map((row, rowIndex) => {
    return row.map((value, columnIndex) => {
      return (
        <Cell
          active={
            activeRowPosition === rowIndex &&
            activeColumnPosition === columnIndex
          }
          isConstrainingActive={
            activeRowPosition === rowIndex ||
            activeColumnPosition === columnIndex ||
            checkIfIndexInBox(
              activeRowPosition,
              activeColumnPosition,
              rowIndex,
              columnIndex
            )
          }
          cellIsCausingError={sudokuHelper.determineIfCellCausingError(
            sudokuGrid,
            rowIndex,
            columnIndex
          )}
          editable={!uneditableCells.includes(`${rowIndex}-${columnIndex}`)}
          rowPosition={rowIndex}
          columnPosition={columnIndex}
          value={value}
          key={`${rowIndex - columnIndex}`}
          onClick={changeActiveCell}
          notes={cellNotes[`${rowIndex}-${columnIndex}`]}
          activeCellValue={sudokuGrid[activeRowPosition][activeColumnPosition]}
        />
      );
    });
  });

  return <div className={classes.boardGrid}>{allCells}</div>;
};

export default Board;
