import ScoreBoard from "./component/ScoreBoard";
import Board from "./component/Board";
import ChatBox from "./component/ChatBox";
import { useGameLogic } from "../hook/useGameLogic";

import styles from "./MainScreen.module.css";

export default function MainScreen() {
  const { ready, setReady, board } = useGameLogic("p2");
  return (
    <div
      className={styles.mainScreen}
      onClick={() => {
        setReady(true);
      }}
    >
      <div className={styles.gameContainer}>
        <ScoreBoard score={{ p1: 1, p2: 2 }} className={styles.scoreBoard} />
        <Board board={board} className={styles.board} />
        <ChatBox className={styles.chatBox} />
      </div>
    </div>
  );
}
