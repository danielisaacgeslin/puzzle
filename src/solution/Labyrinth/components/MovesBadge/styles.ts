import { css } from '@emotion/css';

export const styles = {
  container: css`
    font-size: 12px;
    min-width: 25px;
    min-height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    padding: 5px;
    border: 2px solid black;
    border-radius: 50%;
    color: black;
    background: white;
  `,
  normal: css`
    background: white;
  `,
  warn: css`
    background: yellow;
  `,
  danger: `
    background: red;
    color: white;
    `,
  killed: css`
    background: red;
    color: white;
  `
};
