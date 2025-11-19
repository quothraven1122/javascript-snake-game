import { useState, useEffect } from "react";
import ReadyBoard from "./component/ReadyBox";
import Board from "./component/Board";
import ChatBox from "./component/ChatBox";
import Modal from "../modal/Modal";
import { useGameLogic } from "../hook/useGameLogic";

import styles from "./MainScreen.module.css";

export default function MainScreen() {
  const [showModal, setShowModal] = useState(true);
  const { ready, setReady, board } = useGameLogic("p2");
  useEffect(() => {
    const ws = new WebSocket("wss://javascript-snake-game-server.onrender.com");
    ws.onopen = () => console.log("connected to WS");
    ws.onmessage = (msg) => console.log("Message from server:", msg.data);
    ws.onerror = (err) => console.error("WS error:", err);
  }, []);

  return (
    <div className={styles.mainScreen}>
      <div className={styles.gameContainer}>
        <ReadyBoard isReady={ready} className={styles.readyBox} />
        <Board board={board} className={styles.board} />
        <ChatBox className={styles.chatBox} />
      </div>
      {showModal && (
        <Modal
          title="레디해주세요"
          onClose={() => {
            setReady(true);
            setShowModal(false);
          }}
        >
          <p>화면을 클릭하면 레디됩니다!</p>
        </Modal>
      )}
    </div>
  );
}
