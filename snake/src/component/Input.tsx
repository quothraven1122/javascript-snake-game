import React from "react";
import styles from "./Input.module.css";

export default function Input() {
  return (
    <div className={styles.inputContainer}>
      <input className={styles.input} />
    </div>
  );
}
