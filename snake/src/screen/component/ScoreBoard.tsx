import React from "react";
import styles from "./ScoreBoard.module.css";

interface ScoreBoard {
  score: { p1: number; p2: number };
  className?: string;
}

export default function ScoreBoard({ score, className }: ScoreBoard) {
  return (
    <div className={`${styles.scoreBoard} ${className}`}>
      <p>Scoreboard</p>
      <p>
        {score.p1} : {score.p2}
      </p>
    </div>
  );
}
