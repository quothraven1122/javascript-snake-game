import React from "react";

import ReadyBar from "./ReadyBar";
import styles from "./ReadyBox.module.css";

interface ReadyBox {
  isReady: boolean;
  className?: string;
}

export default function ReadyBox({ isReady, className }: ReadyBox) {
  return (
    <div className={`${styles.readyBox} ${className}`}>
      <p>Ready</p>
      <ReadyBar userName={"Guest1"} isReady={isReady} />
      <ReadyBar userName={"Guest2"} isReady={false} />
    </div>
  );
}
