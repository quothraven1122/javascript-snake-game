import ReadyBar from "./ReadyBar";
import styles from "./ReadyBox.module.css";

interface ReadyBox {
  isReady: { p1: boolean; p2: boolean };
  playerId: string;
  className?: string;
}

export default function ReadyBox({ isReady, playerId, className }: ReadyBox) {
  return (
    <div className={`${className}`}>
      <div className={styles.readyBox}>
        <p>Ready</p>
        <ReadyBar userName={"Player1"} isReady={isReady.p1} />
        <ReadyBar userName={"Player2"} isReady={isReady.p2} />
      </div>
      <p className={styles.playerId}>
        You Are:{" "}
        <span
          className={`
                ${playerId === "p1" ? styles.purple : styles.blue}
              `}
        >
          {playerId === "p1" ? "Player1" : "Player2"}
        </span>
      </p>
    </div>
  );
}
