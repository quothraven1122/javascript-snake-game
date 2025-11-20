import React from "react";
import styles from "./Input.module.css";

interface Input {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onEnter: () => void;
}

export default function Input({ input, setInput, onEnter }: Input) {
  return (
    <div className={styles.inputContainer}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        className={styles.input}
      />
    </div>
  );
}
