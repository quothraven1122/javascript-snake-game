import { useState, useEffect, useCallback } from "react";
import { useWS } from "../context/ws-context";
import Modal from "../modal/Modal";
import { BoardData } from "../data";

export interface ChatMessage {
  playerId: string;
  text: string;
}

interface UseWebSocket {
  playerId: string;
  readyState: { p1: boolean; p2: boolean };
  chatMessages: ChatMessage[];
  sendMessage: (msg: string) => void;
  board: number[][];
}

export function useWebSocket(): UseWebSocket {
  const ROWS = BoardData.ROWS;
  const COLS = BoardData.COLS;
  const wsRef = useWS()!;
  const [result, setResult] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [readyState, setReadyState] = useState({ p1: false, p2: false });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [board, setBoard] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0))
  );

  const sendMessage = (msg: string) => {
    if (!msg.trim() || !wsRef.current) return;
    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "chat", message: msg.trim() }));
    }
  };

  //플레이어 움직임 중심으로 보드 상태 업데이트하기
  const updateBoard = useCallback(
    (snakes: Record<"p1" | "p2", { x: number; y: number }[]>) => {
      const newBoard = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => 0)
      );

      Object.entries(snakes).forEach(([p, body]) => {
        body.forEach((coord) => {
          if (
            coord.y >= 0 &&
            coord.y < ROWS &&
            coord.x >= 0 &&
            coord.x < COLS
          ) {
            newBoard[coord.y][coord.x] = p === "p1" ? 1 : 2;
          }
        });
      });

      setBoard(newBoard);
    },
    [ROWS, COLS]
  );

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onopen = () => console.log("connected to WS");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "waiting") {
        setPlayerId("p1");
        setReadyState({ p1: true, p2: false });
      }
      if (data.type === "matched") {
        setPlayerId(data.playerId);
        setReadyState({ p1: true, p2: true });
      }
      if (data.type === "chat") {
        setChatMessages((prev) => [
          ...prev,
          { playerId: data.playerId, text: data.message },
        ]);
      }
      if (data.type === "gameState") {
        const snakes = {
          p1: data.p1.body,
          p2: data.p2.body,
        };
        updateBoard(snakes);
      }
      if (data.type === "gameOver") {
        setResult(data.result);
      }
    };

    wsRef.current.onerror = (err) => console.error("WS error:", err);
    wsRef.current.onclose = () => console.log("WS CLOSED");

    return () => wsRef.current?.close();
  }, [wsRef, updateBoard]);

  // 서버에 방향 인풋 보내주기
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      let dir: "UP" | "DOWN" | "LEFT" | "RIGHT" | null = null;

      if (e.key === "ArrowUp") dir = "UP";
      if (e.key === "ArrowDown") dir = "DOWN";
      if (e.key === "ArrowLeft") dir = "LEFT";
      if (e.key === "ArrowRight") dir = "RIGHT";
      if (!dir) return;

      wsRef.current?.send(
        JSON.stringify({
          type: "dir",
          direction: dir,
        })
      );
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [wsRef]);

  return { playerId, readyState, chatMessages, sendMessage, board, result };
}
