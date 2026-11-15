import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { Scoreboard } from './components/Scoreboard';
import { useTicTacToe } from './hooks/useTicTacToe';

export default function App() {
  const { board, result, score, playMove, newRound, resetScore } = useTicTacToe();

  const isGameOver = result.status !== 'playing';
  const winningLine = result.status === 'won' ? result.line : [];

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Tic Tac Toe</h1>
        <GameStatus result={result} />
      </header>

      <main className="content">
        <Scoreboard score={score} />
        <Board board={board} winningLine={winningLine} isGameOver={isGameOver} onSelect={playMove} />
      </main>

      <footer className="actions">
        <button type="button" className="button button--filled" onClick={newRound}>
          New round
        </button>
        <button type="button" className="button button--destructive" onClick={resetScore}>
          Reset score
        </button>
      </footer>
    </div>
  );
}
