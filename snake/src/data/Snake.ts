import { BoardData } from "./BoardData";

interface Coordinate {
  x: number;
  y: number;
}
interface SnakeInfo extends Coordinate {
  name: string;
}
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export class Snake {
  public name: string;
  public length: number;
  public body: Coordinate[];
  public direction: Direction;
  public isDead: boolean;

  #boardCols = BoardData.COLS;
  #boardRows = BoardData.ROWS;

  constructor(initialLength: number, snakeInfo: SnakeInfo) {
    const initialPosition = { x: snakeInfo.x, y: snakeInfo.y };
    this.body = [];
    for (let i = 0; i < initialLength; i++) {
      this.body.push({
        x: initialPosition.x - i,
        y: initialPosition.y,
      });
    }

    this.name = snakeInfo.name;
    this.length = initialLength;
    this.direction = "RIGHT";
    this.isDead = false;
  }

  setDirection(newDirection: Direction) {
    const current = this.direction;
    // Prevent 180-degree turns
    if (
      (newDirection === "LEFT" && current === "RIGHT") ||
      (newDirection === "RIGHT" && current === "LEFT") ||
      (newDirection === "UP" && current === "DOWN") ||
      (newDirection === "DOWN" && current === "UP")
    ) {
      return;
    }
    this.direction = newDirection;
  }

  move() {
    if (this.isDead) return;

    // Calculate new head position based on the current direction
    const head = this.body[0];
    let newHead: Coordinate = { ...head };

    switch (this.direction) {
      case "RIGHT":
        newHead.x++;
        break;
      case "LEFT":
        newHead.x--;
        break;
      case "UP":
        newHead.y--;
        break; // Y decreases when moving up (common screen coords)
      case "DOWN":
        newHead.y++;
        break;
    }

    // Add new head to the front of the array
    this.body.unshift(newHead);

    // Remove the tail segment (the last element) to simulate movement
    this.body.pop();

    // Check for death after moving
    this.checkCollision();
  }
  checkCollision() {
    const head = this.body[0];

    // Check for collision with walls
    const hitWall =
      head.x < 0 ||
      head.x >= this.#boardCols ||
      head.y < 0 ||
      head.y >= this.#boardRows;

    // Check for collision with itself
    let hitSelf = false;
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        hitSelf = true;
        break;
      }
    }

    if (hitWall || hitSelf) {
      this.die(); // Call the internal death handler
    }
  }

  die() {
    this.isDead = true;
    this.body = [];
    console.log("Game Over! Snake died.");
  }
}
