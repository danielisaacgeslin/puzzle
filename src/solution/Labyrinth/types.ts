export type Position = [/** row */ number, /** col */ number];

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export enum Theme {
  MOUSE = 'mouse',
  POKEMON = 'pokemon'
}

export interface IconSet {
  HOME: string;
  AVAILABLE: string;
  LOCKED: string;
  POSITION: string;
  TARGET: string;
}

export interface ThemeSet {
  key: Theme;
  iconSet: IconSet;
}
