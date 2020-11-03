import React, { useState } from "react";
import "./App.css";

import NavBar from "components/NavBar/NavBar";
import Game from "components/Game/Game";
import HomePage from "components/HomePage/HomePage";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

const App = (): React.ReactElement => {
  const [sudokuGameIsActive, toggleSudokuGameIsActive] = useState(false);
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState<string>("");

  const makeGameActive = (wantedDifficulty: string) => {
    setGameDifficulty(wantedDifficulty);
    toggleSudokuGameIsActive(true);
  };

  const resetGameState = () => {
    setGameDifficulty("");
    toggleSudokuGameIsActive(false);
    setConfirmLeaveOpen(false);
  };

  const toggleConfirmLeaveOpen = (): void => {
    setConfirmLeaveOpen(!confirmLeaveOpen);
  };

  return (
    <div className="App">
      <NavBar
        goBackToHome={
          sudokuGameIsActive ? toggleConfirmLeaveOpen : resetGameState
        }
      />
      {sudokuGameIsActive ? (
        <Game goBackHome={resetGameState} difficulty={gameDifficulty} />
      ) : (
        <HomePage setGameDifficulty={makeGameActive} />
      )}
      <ConfirmDialog
        isOpen={confirmLeaveOpen}
        toggleConfirm={toggleConfirmLeaveOpen}
        title="Leave?"
        message="All of your progress will be lost, are you sure you want to continue?"
        confirmAction={resetGameState}
        confirmActionText="Leave"
        cancelAction={toggleConfirmLeaveOpen}
      />
    </div>
  );
};

export default App;
