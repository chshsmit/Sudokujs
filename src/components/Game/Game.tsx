/**
 * Game.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:39:32.323Z-07:00
 * @copyright
 * @last-modified 2020-10-21T14:55:21.407Z-07:00
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Grid } from "@material-ui/core";

import { NUMBER_KEYS, NAVIGATION_KEYS } from "components/Game/GameConstants";
import { createNewGrid, determineUneditableCells } from "utils/utils";
import Board from "components/Board/Board";
import Actions from "components/Actions/Actions";

const Game = (): React.ReactElement => {
  // ---------------------------------------------------------------
  // State and Refs
  // ---------------------------------------------------------------
  const [sudokuGrid, updateGrid] = useState(createNewGrid());
  const [uneditableCells] = useState(determineUneditableCells(sudokuGrid));

  const [selectedPosition, changeSelectedPosition] = useState({
    rowPosition: 0,
    columnPosition: 0,
  });
  const selectedPositionRef = useRef(selectedPosition);

  // ---------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------

  useEffect(() => {
    document.addEventListener("keydown", newKeyBoardInput);

    return () => {
      document.removeEventListener("keydown", newKeyBoardInput);
    };
  });

  // ---------------------------------------------------------------
  // Keyboard handlers
  // ---------------------------------------------------------------

  const newKeyBoardInput = useCallback((event: KeyboardEvent): void => {
    if (
      NUMBER_KEYS.includes(event.key) &&
      !uneditableCells.includes(
        `${selectedPositionRef.current.rowPosition}-${selectedPositionRef.current.columnPosition}`
      )
    ) {
      putNewNumberInGrid(event.key === "Backspace" ? 0 : Number(event.key));
    } else if (NAVIGATION_KEYS.includes(event.key)) {
      navigateGrid(event.key);
    } else {
      console.log("None of these were valid");
    }
  }, []);

  // ---------------------------------------------------------------

  const putNewNumberInGrid = (value: number): void => {
    const copyOfGrid = [...sudokuGrid];
    copyOfGrid[selectedPositionRef.current.rowPosition][
      selectedPositionRef.current.columnPosition
    ] = value;
    updateGrid(copyOfGrid);
  };

  // ---------------------------------------------------------------

  const navigateGrid = (direction: string): void => {
    switch (direction) {
      case "ArrowUp":
        if (selectedPositionRef.current.rowPosition !== 0)
          changeActiveCell(
            selectedPositionRef.current.rowPosition - 1,
            selectedPositionRef.current.columnPosition
          );
        break;
      case "ArrowDown":
        if (selectedPositionRef.current.rowPosition !== 8)
          changeActiveCell(
            selectedPositionRef.current.rowPosition + 1,
            selectedPositionRef.current.columnPosition
          );
        break;
      case "ArrowLeft":
        if (selectedPositionRef.current.columnPosition !== 0)
          changeActiveCell(
            selectedPositionRef.current.rowPosition,
            selectedPositionRef.current.columnPosition - 1
          );
        break;
      case "ArrowRight":
        if (selectedPositionRef.current.columnPosition !== 8)
          changeActiveCell(
            selectedPositionRef.current.rowPosition,
            selectedPositionRef.current.columnPosition + 1
          );
        break;
      default:
        break;
    }
  };

  // ---------------------------------------------------------------

  const changeActiveCell = (
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
    <Grid container direction="row" justify="center">
      <Board
        sudokuGrid={sudokuGrid}
        uneditableCells={uneditableCells}
        activeRowPosition={selectedPosition.rowPosition}
        activeColumnPosition={selectedPosition.columnPosition}
        changeActiveCell={changeActiveCell}
      />
      <Actions
        activeCellEditable={
          !uneditableCells.includes(
            `${selectedPosition.rowPosition}-${selectedPosition.columnPosition}`
          )
        }
        deleteCell={putNewNumberInGrid}
      />
    </Grid>
  );
};

export default Game;
