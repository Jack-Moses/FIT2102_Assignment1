export const Viewport = {
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 400,
} as const;

export const BirdConstants = {
  WIDTH: 42,
  HEIGHT: 30,
  INITIAL_X: 180, 
  GRAVITY: 0.5,
  FLAP_STRENGTH: -8,
  RADIUS: 15,
} as const;

export const GameConstants = {
  PIPE_WIDTH: 50,
  PIPE_SPEED: 2,
  TICK_RATE_MS: 16, 
  INITIAL_LIVES: 3,
  PIPE_GAP_HEIGHT: 100,
} as const;