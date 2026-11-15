import { useState } from 'react';
import { applyMove, createEmptyBoard, getGameResult } from '../game/logic';
import type { BoardState, GameResult, Score } from '../game/types';

const EMPTY_SCORE: Score = { X: 0, O: 0, draw: 0 };

/** Returns a new score with the finished game counted. A game still in progress leaves it unchanged. */
function addResultToScore(score: Score, result: GameResult): Score {
  if (result.status === 'won') return { ...score, [result.winner]: score[result.winner] + 1 };
  if (result.status === 'draw') return { ...score, draw: score.draw + 1 };
  return score;
}

/**
 * Holds the board and the running score, and exposes the actions the UI needs.
 *
 * @returns board - current 9 cells
 * @returns result - derived from the board on every render (never stored, so it can't go stale)
 * @returns score - wins per player and draws across rounds
 * @returns playMove(index) - plays for the current player; ignored if the cell is taken or the game is over
 * @returns newRound() - clears the board, keeps the score
 * @returns resetScore() - clears the board and the score
 */
export function useTicTacToe() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [score, setScore] = useState<Score>(EMPTY_SCORE);

  const result = getGameResult(board);

  function playMove(index: number) {
    const nextBoard = applyMove(board, index);
    if (nextBoard === board) return; // move was rejected

    setBoard(nextBoard);
    // The score only changes on the move that ends the game, so it is counted exactly once.
    setScore((current) => addResultToScore(current, getGameResult(nextBoard)));
  }

  function newRound() {
    setBoard(createEmptyBoard());
  }

  function resetScore() {
    setBoard(createEmptyBoard());
    setScore(EMPTY_SCORE);
  }

  return { board, result, score, playMove, newRound, resetScore };
}
