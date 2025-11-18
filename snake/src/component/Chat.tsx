import React from "react";
import styles from "./Chat.module.css";

interface Chat {
  text: string;
  type: "p1" | "p2";
}

export default function Chat({ text, type }: Chat) {
  return (
    <div className={`${styles.chat} ${styles[type]}`}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
