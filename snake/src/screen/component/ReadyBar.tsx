import styles from "./ReadyBar.module.css";
interface ReadyBar {
  userName: string;
  isReady: boolean;
}

export default function ReadyBar({ userName, isReady }: ReadyBar) {
  return (
    <div className={styles.readyBar}>
      <p>{userName}</p>
      <div
        className={styles.circle}
        style={
          isReady ? { backgroundColor: "green" } : { backgroundColor: "red" }
        }
      ></div>
    </div>
  );
}
