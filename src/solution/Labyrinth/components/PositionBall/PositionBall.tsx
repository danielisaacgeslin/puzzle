import { memo, useContext } from 'react';

import { styles } from './styles';
import { Direction } from '../../types';
import { ThemeContext } from '../../Theme';

export interface Props {
  width: number | string;
  height: number;
  top: number;
  left: number;
  direction: Direction;
}

const PositionBall = ({ width, height, top, left, direction }: Props) => {
  const { theme } = useContext(ThemeContext);
  const angleMap = {
    [Direction.UP]: 180,
    [Direction.DOWN]: 0,
    [Direction.LEFT]: 90,
    [Direction.RIGHT]: 270
  };
  return (
    <div
      data-testid="position-ball"
      className={styles.container}
      style={{ width, height, top, left, transform: `rotate(${angleMap[direction]}deg)`, backgroundImage: `url("${theme.iconSet.POSITION}")` }}
    />
  );
};

export default memo(PositionBall);
