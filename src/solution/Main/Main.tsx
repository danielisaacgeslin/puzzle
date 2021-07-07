import { memo, useState, ChangeEvent } from 'react';
import { Labyrinth } from '../Labyrinth';
import { Direction, Theme } from '../Labyrinth/types';
import { ThemeProvider } from '../Labyrinth/Theme';

const Main = () => {
  const [state, setState] = useState({ moveLimit: 42, cellSize: 40, visibleCells: 10, fog: false });

  const onNumberInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <div>
      <div style={{ padding: 15, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: 10 }}>
          <label>move limit</label>
          <input style={{ width: '100%' }} type="number" value={state.moveLimit} onChange={onNumberInputChange('moveLimit')} />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: 10 }}>
          <label>cell size</label>
          <input style={{ width: '100%' }} type="number" value={state.cellSize} onChange={onNumberInputChange('cellSize')} />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: 10 }}>
          <label>visible cells</label>
          <input style={{ width: '100%' }} type="number" value={state.visibleCells} onChange={onNumberInputChange('visibleCells')} />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: 10 }}>
          <label>fog</label>
          <input type="checkbox" checked={state.fog} onChange={() => setState(prevState => ({ ...prevState, fog: !prevState.fog }))} />
        </div>
      </div>
      <ThemeProvider defaultThemeKey={Theme.MOUSE}>
        <Labyrinth
          targetPosition={[15, 17]}
          availableCells={[
            [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1]
          ]}
          startingPosition={[0, 4]}
          moveLimit={state.moveLimit}
          cellSize={state.cellSize}
          fog={state.fog}
          visibleCells={state.visibleCells}
          initialDirection={Direction.DOWN}
        />
      </ThemeProvider>
    </div>
  );
};

export default memo(Main);
