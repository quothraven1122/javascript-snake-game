import React from "react";

import Input from "../../component/Input";
import styles from "./ChatBox.module.css";
import Chat from "../../component/Chat";

interface ChatBox {
  className?: string;
}

export default function ChatBox({ className }: ChatBox) {
  return (
    <div className={`${styles.chatBox} ${className}`}>
      <div className={styles.chatContainer}>
        <Chat text={"잠와요 으흐흑"} type={"p1"} />
        <Chat text={"잠와요 으흐흑"} type={"p1"} />
        <Chat text={"잠와요 으흐흑"} type={"p2"} />
        <Chat
          text={"잠와요 으흐흑으흐흑으흐흑으흐흑으흐흑으흐흑으흐흑으흐흑으흐흑"}
          type={"p1"}
        />
      </div>
      <Input />
    </div>
  );
}
