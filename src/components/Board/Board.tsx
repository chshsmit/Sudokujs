/**
 * Board.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:40:07.951Z-07:00
 * @last-modified 2020-10-21T12:06:45.624Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cell from "components/Cell/Cell";
import { checkIfIndexInBox } from "utils/utils";

const BoardStyles = makeStyles({
  boardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 50px)",
    gridTemplateRows: "repeat(9, 50px)",
    width: "fit-content",
    margin: "auto",
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
            )
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
