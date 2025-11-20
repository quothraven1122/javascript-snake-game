import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { WSProvider } from "./context/ws-context";
import MainScreen from "./screen/MainScreen";

function App() {
  return (
    <div className="App">
      <WSProvider>
        <MainScreen />
      </WSProvider>
    </div>
  );
}

export default App;
