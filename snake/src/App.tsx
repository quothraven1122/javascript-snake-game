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
