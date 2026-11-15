import { applyMove, createEmptyBoard, findWinner, getGameResult, getNextPlayer } from './logic';
import type { BoardState } from './types';

/** Builds a board from a 9-char string, e.g. "XO-------" ("-" = empty). */
function board(cells: string): BoardState {
  return cells.split('').map((c) => (c === '-' ? null : (c as 'X' | 'O')));
}

describe('getNextPlayer', () => {
  it('starts with X', () => {
    expect(getNextPlayer(createEmptyBoard())).toBe('X');
  });

  it('alternates to O after X moves', () => {
    expect(getNextPlayer(board('X--------'))).toBe('O');
  });
});

describe('findWinner', () => {
  it.each([
    ['row', 'XXX------', [0, 1, 2]],
    ['column', 'O--O--O--', [0, 3, 6]],
    ['diagonal', 'X---X---X', [0, 4, 8]],
    ['anti-diagonal', '--O-O-O--', [2, 4, 6]],
  ])('detects a %s win', (_, cells, line) => {
    expect(findWinner(board(cells))?.line).toEqual(line);
  });

  it('returns null when nobody has won', () => {
    expect(findWinner(board('XO-------'))).toBeNull();
  });
});

describe('getGameResult', () => {
  it('reports a draw on a full board with no winner', () => {
    expect(getGameResult(board('XOXXOOOXX'))).toEqual({ status: 'draw' });
  });

  it('prefers a win over a draw when the last move fills the board', () => {
    expect(getGameResult(board('XOXOXOOXX')).status).toBe('won');
  });
});

describe('applyMove', () => {
  it('places the current player in an empty cell', () => {
    expect(applyMove(createEmptyBoard(), 4)[4]).toBe('X');
  });

  it('ignores moves on a taken cell', () => {
    const start = board('X--------');
    expect(applyMove(start, 0)).toBe(start);
  });

  it('ignores moves after the game is won', () => {
    const won = board('XXXOO----');
    expect(applyMove(won, 8)).toBe(won);
  });

  it('does not mutate the original board', () => {
    const start = createEmptyBoard();
    applyMove(start, 0);
    expect(start[0]).toBeNull();
  });
});
