/**
 * Game.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:39:32.323Z-07:00
 * @copyright
 * @last-modified 2020-10-20T14:54:08.243Z-07:00
 */

import React, { useState } from "react";

import Board from "components/Board/Board";
import SudokuGrid from "classes/SudokuGrid/SudokuGrid";

const Game = (): React.ReactElement => {
  const [sudokuGrid] = useState(new SudokuGrid());

  return <Board sudokuGrid={sudokuGrid.grid} />;
};

export default Game;
