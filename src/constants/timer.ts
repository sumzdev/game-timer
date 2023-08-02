export const MIN_TIMER_MIN = 1;
export const MAX_TIMER_MIN = 99;
export const MIN_LIMIT_MIN = 1;

export const DEFAULT_TOTAL_MINUTES = 10;
export const DEFAULT_TURN_MINUTES = 1;

export const TURN = {
  player1: "player1",
  player2: "player2",
} as const;

export const STATUS = {
  init: "init",
  running: "running",
  pause: "pause",
  stop: "stop",
  end: "end",
} as const;

export const TIMER_STATUS = {
  init: "init",
  running: "running",
  wait: "wait",
  pause: "pause",
  stop: "stop",
  end: "end",
  endTurn: "endTurn",
} as const;

export const BTN_DISABLE_BY_STATUS = {
  init: {
    start: false,
    pause: true,
    stop: true,
    reset: true,
    setting: false,
  },
  running: {
    start: true,
    pause: false,
    stop: false,
    reset: true,
    setting: true,
  },
  pause: {
    start: false,
    pause: true,
    stop: true,
    reset: false,
    setting: true,
  },
  stop: {
    start: true,
    pause: true,
    stop: true,
    reset: false,
    setting: false,
  },
  end: {
    start: true,
    pause: true,
    stop: true,
    reset: false,
    setting: false,
  },
} as const;
