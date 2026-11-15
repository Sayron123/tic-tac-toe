import type { GameResult } from '../game/types';

function getStatusMessage(result: GameResult): string {
  switch (result.status) {
    case 'won':
      return `Player ${result.winner} wins`;
    case 'draw':
      return "It's a draw";
    case 'playing':
      return `Player ${result.nextPlayer}'s turn`;
  }
}

export function GameStatus({ result }: { result: GameResult }) {
  return (
    <p className="status" role="status" aria-live="polite">
      {getStatusMessage(result)}
    </p>
  );
}
