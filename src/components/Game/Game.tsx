/**
 * Game.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:39:32.323Z-07:00
 * @copyright
 * @last-modified 2020-10-21T12:05:53.973Z-07:00
 */

import React, { useState, useEffect, useCallback, useRef } from "react";

import { NUMBER_KEYS, NAVIGATION_KEYS } from "components/Game/GameConstants";
import { createNewGrid, determineUneditableCells } from "utils/utils";
import Board from "components/Board/Board";

const Game = (): React.ReactElement => {
  // ---------------------------------------------------------------
  const [sudokuGrid, updateGrid] = useState(createNewGrid());
  const [uneditableCells] = useState(determineUneditableCells(sudokuGrid));

  console.log(uneditableCells);

  const [selectedPosition, changeSelectedPosition] = useState({
    rowPosition: 0,
    columnPosition: 0,
  });
  const selectedPositionRef = useRef(selectedPosition);

  // ---------------------------------------------------------------

  const newKeyBoardInput = useCallback((event: KeyboardEvent): void => {
    console.log(selectedPositionRef.current);

    if (NUMBER_KEYS.includes(event.key)) {
      console.log("We are adding a new number to the grid");
      const copyOfGrid = [...sudokuGrid];
      copyOfGrid[selectedPositionRef.current.rowPosition][
        selectedPositionRef.current.columnPosition
      ] = Number(event.key);
      updateGrid(copyOfGrid);
    } else if (NAVIGATION_KEYS.includes(event.key)) {
      console.log("We are navigating");
    } else {
      console.log("None of these were valid");
    }
  }, []);

  // ---------------------------------------------------------------

  useEffect(() => {
    document.addEventListener("keydown", newKeyBoardInput);

    return () => {
      document.removeEventListener("keydown", newKeyBoardInput);
    };
  }, [selectedPosition]);

  // ---------------------------------------------------------------

  const selectNewActiveCell = (
    rowPosition: number,
    columnPosition: number
  ): void => {
    selectedPositionRef.current = { rowPosition, columnPosition };
    changeSelectedPosition({
      rowPosition,
      columnPosition,
    });
  };

  return (
    <Board
      sudokuGrid={sudokuGrid}
      uneditableCells={uneditableCells}
      activeRowPosition={selectedPosition.rowPosition}
      activeColumnPosition={selectedPosition.columnPosition}
      changeActiveCell={selectNewActiveCell}
    />
  );
};

export default Game;
