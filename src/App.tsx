import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { Scoreboard } from './components/Scoreboard';
import { useTicTacToe } from './hooks/useTicTacToe';

export default function App() {
  const { board, result, score, playMove, newRound, resetScore } = useTicTacToe();

  const isGameOver = result.status !== 'playing';
  const winningLine = result.status === 'won' ? result.line : [];

  return (
    <main className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <Scoreboard score={score} />
      <GameStatus result={result} />
      <Board board={board} winningLine={winningLine} isGameOver={isGameOver} onSelect={playMove} />
      <div className="actions">
        <button type="button" className="button button--primary" onClick={newRound}>
          New round
        </button>
        <button type="button" className="button" onClick={resetScore}>
          Reset score
        </button>
      </div>
    </main>
  );
}
