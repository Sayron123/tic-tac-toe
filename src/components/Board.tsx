import type { BoardState } from '../game/types';
import { Square } from './Square';

type BoardProps = {
  board: BoardState;
  winningLine: number[];
  isGameOver: boolean;
  onSelect: (index: number) => void;
};

export function Board({ board, winningLine, isGameOver, onSelect }: BoardProps) {
  return (
    <div className="board" role="group" aria-label="Tic Tac Toe board">
      {board.map((value, index) => (
        <Square
          key={index}
          index={index}
          value={value}
          isWinning={winningLine.includes(index)}
          isDisabled={isGameOver || value !== null}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
