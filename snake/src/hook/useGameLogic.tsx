import { useState, useCallback, useEffect } from "react";
import { useWS } from "../context/ws-context";
import { GameData, BoardData, Snake } from "../data";

export function useGameLogic(player: string) {
  const wsRef = useWS()!;
  const ROWS = BoardData.ROWS;
  const COLS = BoardData.COLS;

  const [ready, setReady] = useState(false);
  const [snake, setSnake] = useState(
    () => new Snake(GameData.size, GameData[player])
  );
  const [board, setBoard] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0))
  );

  //플레이어 움직임 중심으로 보드 상태 업데이트하기
  const updateBoard = useCallback(
    (snakes: Record<"p1" | "p2", Snake>) => {
      const newBoard = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => 0)
      );

      Object.entries(snakes).forEach(([p, s]) => {
        s.body.forEach((coord) => {
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

  // 서버로부터 게임 상태 듣기
  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.type === "gameState") {
        // 서버가 p1과 p2 위치를 알려줌
        const snakes = {
          p1: new Snake(GameData.size, data.p1),
          p2: new Snake(GameData.size, data.p2),
        };
        setSnake(snakes[player]); // update local snake
        updateBoard(snakes);
      }

      if (data.type === "ready") {
        setReady(true);
      }
    };
  }, [player, wsRef, updateBoard]);

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

  return {
    ready,
    setReady,
    board,
  };
}
