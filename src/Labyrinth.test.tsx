import { render, fireEvent } from '@testing-library/react';

import { Labyrinth } from './solution/Labyrinth';
import { Props } from './solution/Labyrinth/Labyrinth';
import { ThemeProvider } from './solution/Labyrinth/Theme';

describe('Labyrinth', () => {
  let props: Props;
  beforeEach(() => {
    props = {
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1]
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30
    };
  });

  it('should win', () => {
    const { container, getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <Labyrinth {...props} />
      </ThemeProvider>
    );
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(getByTestId('moves-message').textContent).toEqual('2');
    expect(queryByTestId('win-message')).toBeTruthy();
    expect(queryByTestId('lose-message')).not.toBeTruthy();
  });

  it('should lose', () => {
    const { container, getByTestId, queryByTestId } = render(
      <ThemeProvider>
        <Labyrinth {...props} moveLimit={2} />
      </ThemeProvider>
    );
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(getByTestId('moves-message').textContent).toEqual('0');
    expect(queryByTestId('win-message')).not.toBeTruthy();
    expect(queryByTestId('lose-message')).toBeTruthy();
  });
});
