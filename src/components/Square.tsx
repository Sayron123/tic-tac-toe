import type { Cell } from '../game/types';

type SquareProps = {
  value: Cell;
  index: number;
  isWinning: boolean;
  isDisabled: boolean;
  onSelect: (index: number) => void;
};

export function Square({ value, index, isWinning, isDisabled, onSelect }: SquareProps) {
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  const label = `Row ${row}, column ${column}, ${value ?? 'empty'}`;

  const classNames = ['square', value && `square--${value.toLowerCase()}`, isWinning && 'square--winning']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      aria-label={label}
      disabled={isDisabled}
      onClick={() => onSelect(index)}
    >
      {value}
    </button>
  );
}
