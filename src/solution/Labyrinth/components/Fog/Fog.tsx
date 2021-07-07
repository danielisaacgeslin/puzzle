import { memo } from 'react';

import { styles } from './styles';

export interface Props {
  row: number;
  col: number;
  colCount: number;
  cellSize: number;
  fogSize: number;
  visible: boolean;
}

const Fog = ({ row, col, colCount, cellSize, fogSize, visible }: Props) => {
  return (
    <div
      data-testid="fog"
      className={styles.container}
      style={{
        top: row * cellSize + (cellSize / 2 - fogSize / 2),
        left: col * cellSize + (cellSize / 2 - fogSize / 2),
        width: fogSize,
        height: fogSize,
        opacity: visible ? 1 : 0
      }}
    >
      <div
        className={styles.fog}
        style={{
          boxShadow: `0 0 0 ${colCount * cellSize * 2}px rgba(0,0,0,1)`
        }}
      />
      <div
        className={styles.fog}
        style={{
          boxShadow: `inset 0 0 ${cellSize / 2}px ${cellSize / 2}px rgba(0,0,0,0.5)`
        }}
      />
    </div>
  );
};

export default memo(Fog);
