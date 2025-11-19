import { useState, useCallback, useEffect } from "react";
import { GameData, BoardData, Snake } from "../data";

export function useGameLogic(player: string) {
  const ROWS = BoardData.ROWS;
  const COLS = BoardData.COLS;

  const [ready, setReady] = useState(false);
  const [snake, setSnake] = useState(
    () => new Snake(GameData.size, GameData[player])
  );
  const [board, setBoard] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0))
  );

  const updateBoard = useCallback(() => {
    const newBoard = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => 0)
    );

    snake.body.forEach((coord) => {
      if (coord.y >= 0 && coord.y < ROWS && coord.x >= 0 && coord.x < COLS) {
        if (player === "p1") {
          newBoard[coord.y][coord.x] = 1;
        } else if (player === "p2") {
          newBoard[coord.y][coord.x] = 2;
        }
      }
    });

    setBoard(newBoard);
  }, [snake.body, ROWS, COLS]);

  useEffect(() => {
    updateBoard();
  }, [updateBoard]);

  //Game Loop
  useEffect(() => {
    const gameSpeed = 200;

    const intervalId = setInterval(() => {
      if (ready && !snake.isDead) {
        // Update snake's state
        snake.move();
        // Re-render board
        updateBoard();
      }
    }, gameSpeed);

    return () => clearInterval(intervalId);
  }, [snake, updateBoard, ready]);

  // Input Handler to move snake
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          snake.setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
          snake.setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
          snake.setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
          snake.setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [snake]);

  return {
    ready,
    setReady,
    board,
  };
}
