import type { BoardState, GameResult, Player } from './types';

export const BOARD_SIZE = 9;

/** Every row, column and diagonal that wins the game. */
const WINNING_LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export function createEmptyBoard(): BoardState {
  return Array(BOARD_SIZE).fill(null);
}

/** X always goes first, so the next player follows from how many moves were made. */
export function getNextPlayer(board: BoardState): Player {
  const movesMade = board.filter(Boolean).length;
  return movesMade % 2 === 0 ? 'X' : 'O';
}

/** Returns the winner and the winning line, or null if nobody has won. */
export function findWinner(board: BoardState): { winner: Player; line: number[] } | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const player = board[a];
    if (player && player === board[b] && player === board[c]) {
      return { winner: player, line };
    }
  }
  return null;
}

export function getGameResult(board: BoardState): GameResult {
  const win = findWinner(board);
  if (win) return { status: 'won', ...win };

  const isBoardFull = board.every(Boolean);
  if (isBoardFull) return { status: 'draw' };

  return { status: 'playing', nextPlayer: getNextPlayer(board) };
}

/** Returns a new board with the move applied, or the same board if the move is not allowed. */
export function applyMove(board: BoardState, index: number): BoardState {
  const isGameOver = getGameResult(board).status !== 'playing';
  const isCellTaken = board[index] !== null;
  if (isGameOver || isCellTaken) return board;

  const next = [...board];
  next[index] = getNextPlayer(board);
  return next;
}
