import { useState, useEffect } from "react";
import ReadyBoard from "./component/ReadyBox";
import Board from "./component/Board";
import ChatBox from "./component/ChatBox";
import Modal from "../modal/Modal";
import { useWebSocket } from "../hook/useWebSocket";

import styles from "./MainScreen.module.css";

export default function MainScreen() {
  const { playerId, readyState, chatMessages, sendMessage, board, result } =
    useWebSocket();
  const [showModal, setShowModal] = useState(result);
  useEffect(() => {
    if (result) {
      setShowModal(true);
    }
  }, [result]);

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
          handleSend={sendMessage}
          className={styles.chatBox}
        />
      </div>
      {showModal && (
        <Modal
          title={
            result == "tie"
              ? "동점입니다!"
              : result == "p1"
              ? "Player1이 우승했습니다!"
              : "Player2가 우승했습니다!"
          }
          onClose={() => {
            setShowModal(false);
          }}
        >
          {playerId === result ? (
            <p className={styles.win}>WIN</p>
          ) : (
            <p className={styles.lose}>LOSE</p>
          )}
        </Modal>
      )}
    </div>
  );
}
