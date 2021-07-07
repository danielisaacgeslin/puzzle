import { memo, useMemo, useContext } from 'react';

import { ThemeContext } from '../../Theme';
import { styles } from './styles';

export enum CellType {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  TARGET = 'target',
  INITIAL = 'initial'
}

export interface Props {
  type: CellType;
  top: number;
  left: number;
  width: number;
  height: number;
}

const Cell = ({ type, top, left, width, height }: Props) => {
  const { theme } = useContext(ThemeContext);
  const cellStyle = useMemo(() => {
    switch (type) {
      case CellType.AVAILABLE:
        return styles.avaiable;
      case CellType.LOCKED:
        return styles.locked;
      case CellType.INITIAL:
      default:
        return styles.initial;
    }
  }, [type]);

  return (
    <>
      <div
        data-testid="cell"
        className={`${styles.container} ${cellStyle}`}
        style={{ top, left, width, height, backgroundImage: `url("${type === CellType.LOCKED ? theme.iconSet.LOCKED : theme.iconSet.AVAILABLE}")` }}
      >
        {type === CellType.INITIAL && <img src={theme.iconSet.HOME} alt="start" style={{ width: '100%', height: 'auto' }} />}
      </div>
      {type === CellType.TARGET && (
        <div className={`${styles.container} ${styles.target}`} style={{ top, left, width, height }}>
          <img src={theme.iconSet.TARGET} alt="target" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </>
  );
};

export default memo(Cell);
