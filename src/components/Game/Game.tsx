/**
 * Game.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:39:32.323Z-07:00
 * @copyright
 * @last-modified 2020-10-20T16:01:25.230Z-07:00
 */

import React, { useState } from "react";

import Board from "components/Board/Board";
import SudokuGrid from "classes/SudokuGrid/SudokuGrid";

const Game = (): React.ReactElement => {
  const [sudokuGrid] = useState(new SudokuGrid());
  const [selectedPosition, changeSelectedPosition] = useState({
    rowPosition: 0,
    columnPosition: 0,
  });

  const updateActiveCell = (
    rowPosition: number,
    columnPosition: number
  ): void => {
    changeSelectedPosition({
      rowPosition,
      columnPosition,
    });
  };

  return (
    <Board
      sudokuGrid={sudokuGrid.grid}
      activeRowPosition={selectedPosition.rowPosition}
      activeColumnPosition={selectedPosition.columnPosition}
      changeActiveCell={updateActiveCell}
    />
  );
};

export default Game;
