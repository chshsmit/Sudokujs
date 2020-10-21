/**
 * Board.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:40:07.951Z-07:00
 * @last-modified 2020-10-21T14:55:37.139Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cell from "components/Cell/Cell";
import { checkIfIndexInBox } from "utils/utils";

const BoardStyles = makeStyles({
  boardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 70px)",
    gridTemplateRows: "repeat(9, 70px)",
    width: "fit-content",
    marginTop: "2%",
  },
});

interface BoardProps {
  sudokuGrid: Array<Array<number>>;
  changeActiveCell: (rowPosition: number, columnPosition: number) => void;
  activeRowPosition: number;
  activeColumnPosition: number;
  uneditableCells: Array<string>;
}

const Board = ({
  sudokuGrid,
  changeActiveCell,
  activeRowPosition,
  activeColumnPosition,
  uneditableCells,
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
            ) ||
            (value === sudokuGrid[activeRowPosition][activeColumnPosition] &&
              value !== 0)
          }
          editable={!uneditableCells.includes(`${rowIndex}-${columnIndex}`)}
          rowPosition={rowIndex}
          columnPosition={columnIndex}
          value={value}
          key={`${rowIndex - columnIndex}`}
          onClick={changeActiveCell}
        />
      );
    });
  });

  return <div className={classes.boardGrid}>{allCells}</div>;
};

export default Board;
