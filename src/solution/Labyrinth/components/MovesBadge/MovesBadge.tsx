import { memo, useMemo } from 'react';

import { styles } from './styles';

export interface Props {
  moveCount: number;
  moveLimit: number;
}

const MovesBadge = ({ moveCount, moveLimit }: Props) => {
  const stateStyle = useMemo(() => {
    const movesLeft = moveLimit - moveCount;
    if (movesLeft <= 0) return styles.killed;
    if (movesLeft < moveLimit / 3) return styles.danger;
    if (movesLeft < moveLimit / 2) return styles.warn;
    if (movesLeft < moveLimit / 1.5) return styles.normal;
  }, [moveCount, moveLimit]);
  return (
    moveLimit !== Infinity && (
      <div data-testid="moves-message" className={`${styles.container} ${stateStyle}`}>
        {moveLimit - moveCount}
      </div>
    )
  );
};

export default memo(MovesBadge);
