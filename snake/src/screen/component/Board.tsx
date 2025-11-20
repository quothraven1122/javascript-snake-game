import styles from "./Board.module.css";

interface Board {
  board: number[][];
  className?: string;
}

export default function Board({ board, className }: Board) {
  return (
    <div className={`${styles.board} ${className}`}>
      {board.map((row, rIndex) => (
        <div className={styles.row} key={rIndex}>
          {row.map((cell, cIndex) => (
            <div
              className={`
                ${styles.cell}
                ${cell === 1 ? styles.purple : ""}
                ${cell === 2 ? styles.blue : ""}
              `}
              key={cIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
