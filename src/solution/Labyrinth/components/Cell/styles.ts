import { css } from '@emotion/css';

export const styles = {
  container: css`
    position: absolute;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    z-index: 1;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `,
  avaiable: css`
    background-color: white;
  `,
  locked: css`
    background-color: gray;
  `,
  target: css`
    background-color: green;
    background: 0;
    z-index: 4;
  `,
  initial: css`
  background-color: yellow;
  `
};
