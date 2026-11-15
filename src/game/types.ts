export type Player = 'X' | 'O';

/** A cell is either empty (null) or taken by a player. */
export type Cell = Player | null;

/** 9 cells, read left-to-right, top-to-bottom. */
export type BoardState = Cell[];

export type GameResult =
  | { status: 'playing'; nextPlayer: Player }
  | { status: 'won'; winner: Player; line: number[] }
  | { status: 'draw' };

export type Score = Record<Player | 'draw', number>;
