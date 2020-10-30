import React, { useState } from "react";
import "./App.css";

import NavBar from "components/NavBar/NavBar";
import Game from "components/Game/Game";
import HomePage from "components/HomePage/HomePage";

const App = (): React.ReactElement => {
  const [sudokuGameIsActive, toggleSudokuGameIsActive] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState<string>("");

  const makeGameActive = (wantedDifficulty: string) => {
    setGameDifficulty(wantedDifficulty);
    toggleSudokuGameIsActive(true);
  };

  return (
    <div className="App">
      <NavBar />
      {sudokuGameIsActive ? (
        <Game difficulty={gameDifficulty} />
      ) : (
        <HomePage setGameDifficulty={makeGameActive} />
      )}
    </div>
  );
};

export default App;
