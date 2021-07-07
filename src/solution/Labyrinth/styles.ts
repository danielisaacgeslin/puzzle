import { css } from '@emotion/css';

export const containerPadding = 15;

export const styles = {
  container: css`
    padding: ${containerPadding}px;
  `,
  restartBtn: css`
    margin-bottom: 10;
    background: 0;
    border: 0;
    padding: 0;
  `,
  mazeContainer: css`
    position: relative;
    overflow: hidden;
    border: 2px solid black;
    width: 100%;
  `,
  movesBadge: css`
    position: absolute;
    top: 3px;
    right: 3px;
    z-index: 6;
  `,
  footer: css`
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  `
};
