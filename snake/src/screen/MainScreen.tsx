import ReadyBoard from "./component/ReadyBox";
import Board from "./component/Board";
import ChatBox from "./component/ChatBox";
import Modal from "../modal/Modal";
import { useWebSocket } from "../hook/useWebSocket";

import styles from "./MainScreen.module.css";

export default function MainScreen() {
  const { playerId, readyState, chatMessages, sendMessage, board } =
    useWebSocket();

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
    </div>
  );
}
