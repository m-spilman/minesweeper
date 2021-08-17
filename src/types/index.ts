export enum CellState {
  hidden,
  visible,
  flagged,
}

export enum Face {
  observe = "🧐",
  concern = "😬",
  flag = "⛳️",
  dead = "🤬",
  winner = "😎",
}

export type Cell = { value: number; state: CellState };
