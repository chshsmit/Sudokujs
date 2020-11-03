/**
 * Game.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:39:32.323Z-07:00
 * @copyright
 * @last-modified 2020-11-03T11:16:29.259Z-08:00
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Grid } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

import { determineUneditableCells, createInitialCellNotes } from "utils/utils";
import SudokuHelper from "utils/SudokuHelper";
import SudokuSolver from "utils/SudokuSolver";
import Board from "components/Board/Board";
import Actions from "components/Actions/Actions";
import TimeAndDifficulty from "components/TimeAndDifficulty/TimeAndDifficulty";
import GamePaused from "components/GamePaused/GamePaused";
import Congratulations from "components/Congratulations/Congratulations";

// ---------------------------------------------------------------

interface GameProps {
  difficulty: string;
  goBackHome: () => void;
}

// ---------------------------------------------------------------

const Game = ({ difficulty, goBackHome }: GameProps): React.ReactElement => {
  // ---------------------------------------------------------------
  // State and Refs
  // ---------------------------------------------------------------

  const sudokuHelper = useMemo(() => new SudokuHelper(), []);
  const sudokuSolver = useMemo(() => new SudokuSolver(difficulty), [
    difficulty,
  ]);

  const [sudokuGrid, updateGrid] = useState(sudokuSolver.createNewGrid());
  const [sudokuIsSolved, setSudokuIsSolved] = useState(false);
  const [uneditableCells] = useState(determineUneditableCells(sudokuGrid));
  const [cellNotes, updateCellNotes] = useState(
    createInitialCellNotes(sudokuGrid)
  );
  const [gameIsPaused, setGameIsPaused] = useState(false);
  const [noteModeActive, changeNoteMode] = useState(false);
  const noteModeRef = useRef(noteModeActive);

  const [selectedPosition, changeSelectedPosition] = useState({
    rowPosition: 0,
    columnPosition: 0,
  });
  const selectedPositionRef = useRef(selectedPosition);

  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const secondsPlayedRef = useRef(secondsPlayed);

  // ---------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      secondsPlayedRef.current = secondsPlayedRef.current + 1;
      setSecondsPlayed(secondsPlayedRef.current);
    }, 1000);

    if (gameIsPaused || sudokuIsSolved) clearInterval(interval);

    return () => clearInterval(interval);
  }, [gameIsPaused, sudokuIsSolved]);

  useEffect(() => {
    document.addEventListener("keydown", newKeyBoardInput);

    return () => {
      document.removeEventListener("keydown", newKeyBoardInput);
    };
  });

  const putNewNumberInGrid = useCallback(
    (value: number): void => {
      const { rowPosition, columnPosition } = selectedPositionRef.current;

      if (value === 0) {
        const copyOfCellNotes = { ...cellNotes };
        copyOfCellNotes[`${rowPosition}-${columnPosition}`] = new Array(9).fill(
          false
        );

        updateCellNotes(copyOfCellNotes);
      }
      const copyOfGrid = [...sudokuGrid];
      copyOfGrid[selectedPositionRef.current.rowPosition][
        selectedPositionRef.current.columnPosition
      ] = value;

      const fullGrid = sudokuHelper.determineIfGridIsFull(copyOfGrid);

      if (fullGrid) {
        const validSolution = sudokuHelper.boardIsValid(copyOfGrid);

        setSudokuIsSolved(validSolution);
      }

      updateGrid(copyOfGrid);
    },
    [cellNotes, sudokuHelper, sudokuGrid]
  );

  // ---------------------------------------------------------------
  // Keyboard handlers
  // ---------------------------------------------------------------

  const newKeyBoardInput = useCallback(
    (event: KeyboardEvent): void => {
      const addNoteToCell = (noteValue: number): void => {
        const { rowPosition, columnPosition } = selectedPositionRef.current;

        const copyOfCellNotes = { ...cellNotes };
        copyOfCellNotes[`${rowPosition}-${columnPosition}`][
          noteValue - 1
        ] = !cellNotes[`${rowPosition}-${columnPosition}`][noteValue - 1];

        updateCellNotes(copyOfCellNotes);
      };

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

      if (
        sudokuHelper.NUMBER_KEYS.includes(event.key) &&
        !uneditableCells.includes(
          `${selectedPositionRef.current.rowPosition}-${selectedPositionRef.current.columnPosition}`
        )
      ) {
        if (noteModeRef.current && event.key !== "Backspace") {
          addNoteToCell(Number(event.key));
        } else {
          putNewNumberInGrid(event.key === "Backspace" ? 0 : Number(event.key));
        }
      } else if (sudokuHelper.NAVIGATION_KEYS.includes(event.key)) {
        navigateGrid(event.key);
      } else if (event.key === "n") {
        toggleNoteMode();
      } else {
        console.log("Not a valid keypress");
      }
    },
    [
      cellNotes,
      putNewNumberInGrid,
      uneditableCells,
      sudokuHelper.NAVIGATION_KEYS,
      sudokuHelper.NUMBER_KEYS,
    ]
  );

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------

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

  // ---------------------------------------------------------------
  // ---------------------------------------------------------------

  const toggleNoteMode = (): void => {
    noteModeRef.current = !noteModeRef.current;
    changeNoteMode(noteModeRef.current);
  };

  // ---------------------------------------------------------------

  const toggleGamePaused = (): void => {
    setGameIsPaused(!gameIsPaused);
  };

  // ---------------------------------------------------------------

  return (
    <Zoom in>
      <Grid container direction="column" justify="center"
        alignItems="center">
        <TimeAndDifficulty
          toggleGamePaused={toggleGamePaused}
          difficulty={difficulty}
          gamePaused={gameIsPaused}
          solved={sudokuIsSolved}
          secondsPlayed={secondsPlayed}
        />
        <Board
          sudokuGrid={sudokuGrid}
          uneditableCells={uneditableCells}
          activeRowPosition={selectedPosition.rowPosition}
          activeColumnPosition={selectedPosition.columnPosition}
          changeActiveCell={changeActiveCell}
          cellNotes={cellNotes}
          sudokuHelper={sudokuHelper}
        />
        <Actions
          activeCellEditable={
            !uneditableCells.includes(
              `${selectedPosition.rowPosition}-${selectedPosition.columnPosition}`
            )
          }
          deleteCell={putNewNumberInGrid}
          toggleNoteMode={toggleNoteMode}
          noteModeActive={noteModeActive}
        />
        <Congratulations
          totalSolveTime={secondsPlayed}
          returnHome={goBackHome}
          gameIsOver={sudokuIsSolved}
        />
        <GamePaused isOpen={gameIsPaused} toggleGamePaused={toggleGamePaused} />
      </Grid>
    </Zoom>
  );
};

export default Game;
