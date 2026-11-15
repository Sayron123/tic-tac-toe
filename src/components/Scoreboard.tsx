import type { Score } from '../game/types';

export function Scoreboard({ score }: { score: Score }) {
  const entries = [
    { label: 'Player X', value: score.X, className: 'score--x' },
    { label: 'Draws', value: score.draw, className: '' },
    { label: 'Player O', value: score.O, className: 'score--o' },
  ];

  return (
    <dl className="scoreboard">
      {entries.map((entry) => (
        <div key={entry.label} className={`score ${entry.className}`}>
          <dt>{entry.label}</dt>
          <dd>{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
