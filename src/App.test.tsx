import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function cell(row: number, column: number) {
  return screen.getByRole('button', { name: new RegExp(`^Row ${row}, column ${column},`) });
}

describe('App', () => {
  it('plays a full game, updates the score, and starts a new round', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent("Player X's turn");

    // X: top row. O: middle row.
    await user.click(cell(1, 1));
    await user.click(cell(2, 1));
    await user.click(cell(1, 2));
    await user.click(cell(2, 2));
    await user.click(cell(1, 3));

    expect(screen.getByRole('status')).toHaveTextContent('Player X wins');
    expect(cell(3, 3)).toBeDisabled();
    expect(screen.getByText('Player X').nextSibling).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: 'New round' }));
    expect(cell(1, 1)).toHaveAccessibleName('Row 1, column 1, empty');
    expect(screen.getByText('Player X').nextSibling).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: 'Reset score' }));
    expect(screen.getByText('Player X').nextSibling).toHaveTextContent('0');
  });
});
