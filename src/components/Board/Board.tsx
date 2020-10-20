/**
 * Board.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T11:40:07.951Z-07:00
 * @last-modified 2020-10-20T15:16:59.919Z-07:00
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Cell from "components/Cell/Cell";

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
}

const Board = ({ sudokuGrid }: BoardProps): React.ReactElement => {
  const classes = BoardStyles();
  console.log(sudokuGrid);

  const allCells = sudokuGrid.map((row, rowIndex) => {
    return row.map((value, columnIndex) => {
      return (
        <Cell
          active={false}
          rowPosition={rowIndex}
          columnPosition={columnIndex}
          value={value}
          key={`${rowIndex - columnIndex}`}
        />
      );
    });
  });

  return <div className={classes.boardGrid}>{allCells}</div>;
};

export default Board;
