import { useState, useEffect, useRef } from "react";
import ReadyBoard from "./component/ReadyBox";
import Board from "./component/Board";
import ChatBox from "./component/ChatBox";
import Modal from "../modal/Modal";
import { useGameLogic } from "../hook/useGameLogic";

import styles from "./MainScreen.module.css";

interface ChatMessage {
  playerId: "string";
  text: string;
}

export default function MainScreen() {
  const [playerId, setPlayerId] = useState("");
  const [readyState, setReadyState] = useState({ p1: true, p2: false });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { ready, setReady, board } = useGameLogic("p2");
  const wsRef = useRef<WebSocket | null>(null);

  const handleSend = (input: string) => {
    if (!input.trim()) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ type: "chat", message: input.trim() })
      );
    }
  };

  useEffect(() => {
    wsRef.current = new WebSocket(
      "wss://javascript-snake-game-server.onrender.com"
      //"ws://localhost:3000"
    );
    wsRef.current.onopen = () => {
      console.log("connected to WS");
    };
    wsRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "waiting") {
        console.log("Waiting");
        setPlayerId("p1");
        setReadyState({ p1: true, p2: false });
      }
      if (data.type === "matched") {
        console.log("Matched in room:", data.roomId);
        setPlayerId(data.playerId);
        setReadyState({ p1: true, p2: true });
      }
      if (data.type === "chat") {
        setChatMessages((prev) => [
          ...prev,
          { playerId: data.playerId, text: data.message },
        ]);
      }
    };
    wsRef.current.onerror = (err) => console.error("WS error:", err);
    wsRef.current.onclose = () => {
      console.log("WS CLOSED");
    };
    return () => wsRef.current?.close();
  }, []);

  return (
    <div className={styles.mainScreen}>
      <div className={styles.gameContainer}>
        <ReadyBoard
          isReady={readyState}
          playerId={playerId}
          className={styles.readyBox}
        />
        <Board board={board} className={styles.board} />
        <ChatBox
          playerId={playerId}
          messages={chatMessages}
          handleSend={handleSend}
          className={styles.chatBox}
        />
      </div>
    </div>
  );
}
