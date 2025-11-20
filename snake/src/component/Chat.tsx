import React from "react";
import styles from "./Chat.module.css";

interface Chat {
  text: string;
  isMe: boolean;
}

export default function Chat({ text, isMe }: Chat) {
  return (
    <div className={`${styles.chat} ${isMe ? styles.me : styles.opponent}`}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
