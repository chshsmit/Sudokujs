import React from "react";
import "./App.css";

import NavBar from "components/NavBar/NavBar";
import Game from "components/Game/Game";

const App = (): React.ReactElement => (
  <div className="App">
    <NavBar />
    <Game />
  </div>
);

export default App;
