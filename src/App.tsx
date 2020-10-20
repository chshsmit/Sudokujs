import React from "react";
import "./App.css";

import Cell from "components/Cell/Cell";

const App = (): React.ReactElement => (
  <div className="App">
    <Cell active={false} />
  </div>
);

export default App;
