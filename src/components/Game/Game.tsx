/**
 * Game.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:39:32.323Z-07:00
 * @copyright
 * @last-modified 2020-10-20T15:36:35.312Z-07:00
 */

import React, { useState } from "react";

import Board from "components/Board/Board";
import SudokuGrid from "classes/SudokuGrid/SudokuGrid";

const Game = (): React.ReactElement => {
  const [sudokuGrid] = useState(new SudokuGrid());
  const [selectedRowPosition, changeSelectedRowPosition] = useState(8);
  const [selectedColumnPosition, changeSelectedColumnPosition] = useState(1);

  const updateActiveCell = (
    rowPosition: number,
    columnPosition: number
  ): void => {
    changeSelectedRowPosition(rowPosition);
    changeSelectedColumnPosition(columnPosition);
  };

  return (
    <Board
      sudokuGrid={sudokuGrid.grid}
      activeColumnPosition={selectedColumnPosition}
      activeRowPosition={selectedRowPosition}
      changeActiveCell={updateActiveCell}
    />
  );
};

export default Game;
