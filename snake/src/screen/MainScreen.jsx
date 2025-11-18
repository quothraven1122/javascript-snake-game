import React from "react";

import ScoreBoard from "./component/ScoreBoard";
import Board from "./component/Board";
import ChatBox from "./component/ChatBox";
import { BoardData } from "../data/BoardData";
import styles from "./MainScreen.module.css";

export default function MainScreen() {
  const ROWS = BoardData.ROWS;
  const COLS = BoardData.COLS;

  const emptyBoard = Array.from(
    { length: ROWS },
    () => Array.from({ length: COLS }, () => 0) // 0 = empty
  );
  return (
    <div className={styles.mainScreen}>
      <div className={styles.gameContainer}>
        <ScoreBoard score={{ p1: 1, p2: 2 }} className={styles.scoreBoard} />
        <Board board={emptyBoard} className={styles.board} />
        <ChatBox className={styles.chatBox} />
      </div>
    </div>
  );
}
