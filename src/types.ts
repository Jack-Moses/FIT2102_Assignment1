export type Key = "Space" | "ArrowUp";

export type Direction = "up" | "down";

export type Vec2 = Readonly<{ x: number; y: number }>;

export type Bird = Readonly<{
  id: string;
  pos: Vec2;
  vel: Vec2;
  radius: number;
}>;

export type Pipe = Readonly<{
  id: string;
  x: number;
  gapY: number;
  gapHeight: number;
  width: number;
  passed: boolean;
}>;

export type Ghost = Readonly<{
  id: string;
  path: ReadonlyArray<Vec2>;
  currentIndex: number;
}>;

export type State = Readonly<{
  time: number;
  bird: Bird;
  pipes: ReadonlyArray<Pipe>;
  lives: number;
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  ghosts: ReadonlyArray<Ghost>;
  currentRunHistory: ReadonlyArray<Vec2>;
}>;