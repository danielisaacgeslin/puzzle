import { memo, useContext, useMemo } from 'react';

import { ThemeContext } from '../../Theme';
import { Theme } from '../../types';
import { styles } from './styles';

export interface Props {
  onRestart: () => void;
}

const Header = ({ onRestart }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeList = useMemo(() => Object.values(Theme), []);
  return (
    <header className={styles.container}>
      <div>
        {themeList.map(key => (
          <button key={key} className={`${styles.button} ${theme.key === key && styles.activeButton}`} onClick={() => setTheme(key)}>
            {key}
          </button>
        ))}
      </div>
      <button onClick={onRestart} className={styles.button}>
        restart
      </button>
    </header>
  );
};

export default memo(Header);
