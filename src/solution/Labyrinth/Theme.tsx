import { createContext, PropsWithChildren, useState, memo } from 'react';

import { ThemeSet, Theme } from './types';

export const themeSetMap: Record<string, ThemeSet> = {
  [Theme.POKEMON]: {
    key: Theme.POKEMON,
    iconSet: {
      HOME: require('../assets/pokemon/home.jpg').default,
      AVAILABLE: require('../assets/pokemon/available-tile.png').default,
      LOCKED: require('../assets/pokemon/locked-tile.png').default,
      POSITION: require('../assets/pokemon/position.png').default,
      TARGET: require('../assets/pokemon/target.png').default
    }
  },
  [Theme.MOUSE]: {
    key: Theme.MOUSE,
    iconSet: {
      HOME: require('../assets/mouse/home.png').default,
      AVAILABLE: require('../assets/mouse/available-tile.jpg').default,
      LOCKED: require('../assets/mouse/locked-tile.jpg').default,
      POSITION: require('../assets/mouse/position.png').default,
      TARGET: require('../assets/mouse/target.png').default
    }
  }
};

export const ThemeContext = createContext<{ theme: ThemeSet; setTheme: (key: Theme) => void }>({
  theme: null,
  setTheme: () => null
});

export const ThemeProvider = memo(({ children, defaultThemeKey = Theme.MOUSE }: PropsWithChildren<{ defaultThemeKey?: Theme }>) => {
  const [key, setKey] = useState<Theme>(defaultThemeKey);
  return <ThemeContext.Provider value={{ theme: themeSetMap[key] || themeSetMap[defaultThemeKey], setTheme: setKey }}>{children}</ThemeContext.Provider>;
});
