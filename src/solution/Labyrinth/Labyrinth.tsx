import { memo, useMemo, useCallback, useState, useEffect } from 'react';

import { Cell } from './components/Cell';
import { CellType } from './components/Cell/Cell';
import { Fog } from './components/Fog';
import { styles, containerPadding } from './styles';
import { MovesBadge } from './components/MovesBadge';
import { Position, Direction } from './types';
import { PositionBall } from './components/PositionBall';
import { Header } from './components/Header';

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  moveLimit?: number;
  cellSize?: number;
  fog?: boolean;
  visibleCells?: number;
  initialDirection?: Direction;
}

const Labyrinth = ({
  availableCells,
  targetPosition,
  startingPosition = [0, 0],
  moveLimit = Infinity,
  cellSize = 30,
  fog = true,
  visibleCells = 4,
  initialDirection = Direction.RIGHT
}: Props) => {
  const initialState = useMemo(() => ({ moveCount: 0, position: startingPosition, direction: initialDirection }), []); // eslint-disable-line
  const [state, setState] = useState<{ moveCount: number; position: Position; direction: Direction }>(initialState);
  const getPositionKey = useCallback(([row, col]: Position) => `${row}-${col}`, []);

  const { rows, cols } = useMemo(() => ({ rows: availableCells.length, cols: availableCells.reduce((total, curr) => Math.max(total, curr.length), 0) }), [
    availableCells
  ]);
  const grid = useMemo(() => Array.from(Array(rows)).map((_, rowIndex) => Array.from(Array(cols)).map((_2, colIndex) => [rowIndex, colIndex])), [rows, cols]);
  const startingCellKey = getPositionKey(startingPosition);
  const targetCellKey = getPositionKey(targetPosition);
  const hasWon = getPositionKey(state.position) === getPositionKey(targetPosition);
  const hasMovesLeft = state.moveCount < moveLimit;
  const hasLost = !hasMovesLeft && !hasWon;
  const ballSize = cellSize / 1.5;
  const fogSize = cellSize * visibleCells;

  const isCellAvailable = useCallback(([row, col]: Position) => !!(availableCells[row] && availableCells[row][col]), [availableCells]);
  const onRestart = useCallback(() => setState({ ...initialState }), [initialState]);
  const onMove = useCallback(
    (event: KeyboardEvent) => {
      const nextPosition: Position = (() => {
        switch (event.key) {
          case 'ArrowUp':
            return [state.position[0] - 1, state.position[1]] as Position;
          case 'ArrowDown':
            return [state.position[0] + 1, state.position[1]] as Position;
          case 'ArrowLeft':
            return [state.position[0], state.position[1] - 1] as Position;
          case 'ArrowRight':
            return [state.position[0], state.position[1] + 1] as Position;
          default:
            return null;
        }
      })();
      const direction: Direction = (() => {
        switch (event.key) {
          case 'ArrowUp':
            return Direction.UP;
          case 'ArrowDown':
            return Direction.DOWN;
          case 'ArrowLeft':
            return Direction.LEFT;
          default:
          case 'ArrowRight':
            return Direction.RIGHT;
        }
      })();
      const isPositionValid = nextPosition && isCellAvailable(nextPosition);
      if (isPositionValid && hasMovesLeft && !hasWon) {
        setState(prevState => ({ ...prevState, position: nextPosition, moveCount: prevState.moveCount + 1, direction }));
      }
    },
    [state, setState, isCellAvailable, hasMovesLeft, hasWon]
  );

  useEffect(() => {
    document.addEventListener('keydown', onMove);
    return () => document.removeEventListener('keydown', onMove);
  }, [onMove]);
  return (
    <div className={styles.container} style={{ width: cols * cellSize + containerPadding * 2 }}>
      <Header onRestart={onRestart} />
      <div className={styles.mazeContainer} style={{ height: rows * cellSize, width: cols * cellSize }}>
        <div className={styles.movesBadge}>
          <MovesBadge moveCount={state.moveCount} moveLimit={moveLimit} />
        </div>
        <PositionBall
          width={ballSize}
          height={ballSize}
          top={state.position[0] * cellSize + (cellSize / 2 - ballSize / 2)}
          left={state.position[1] * cellSize + (cellSize / 2 - ballSize / 2)}
          direction={state.direction}
        />
        {<Fog row={state.position[0]} col={state.position[1]} colCount={cols} cellSize={cellSize} fogSize={fogSize} visible={fog && !hasWon} />}
        {grid.map(positionList =>
          positionList.map(([row, col]) => {
            const positionKey = getPositionKey([row, col]);
            const type = (() => {
              if (positionKey === startingCellKey) return CellType.INITIAL;
              if (positionKey === targetCellKey) return CellType.TARGET;
              if (isCellAvailable([row, col])) return CellType.AVAILABLE;
              return CellType.LOCKED;
            })();
            return <Cell key={positionKey} type={type} top={row * cellSize} left={col * cellSize} width={cellSize} height={cellSize} />;
          })
        )}
      </div>
      <footer className={styles.footer}>
        {hasLost && (
          <p data-testid="lose-message" style={{ color: 'red' }}>
            You lost
          </p>
        )}
        {hasWon && (
          <p data-testid="win-message" style={{ color: 'green' }}>
            You won
          </p>
        )}
      </footer>
    </div>
  );
};

export default memo(Labyrinth);
