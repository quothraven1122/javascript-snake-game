import React, { useState } from "react";

import Input from "../../component/Input";
import styles from "./ChatBox.module.css";
import Chat from "../../component/Chat";

interface ChatMessage {
  playerId: string;
  text: string;
}
interface ChatBox {
  playerId: string;
  messages: ChatMessage[];
  handleSend: (input: string) => void;
  className?: string;
}

export default function ChatBox({
  playerId,
  messages,
  handleSend,
  className,
}: ChatBox) {
  const [input, setInput] = useState("");

  return (
    <div className={`${styles.chatBox} ${className}`}>
      <div className={styles.chatContainer}>
        {messages.map((m, i) => (
          <Chat text={m.text} isMe={m.playerId === playerId} key={i} />
        ))}
      </div>
      <Input
        input={input}
        setInput={setInput}
        onEnter={() => {
          handleSend(input);
          setInput("");
        }}
      />
    </div>
  );
}
