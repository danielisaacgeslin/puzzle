import { css } from '@emotion/css';

export const styles = {
  container: css`
    display: flex;
    background: black;
    justify-content: space-between;
    margin-bottom: 10px;
  `,
  button: css`
    background: 0;
    border: 0;
    padding: 5px 10px;
    font-size: 14px;
    background: black;
    transition: all 0.4s;
    color: white;
    border: 1px solid white;
    border-top: 0;
    border-bottom: 0;
  `,
  activeButton: css`
    background: yellow;
    color: black;
    border: 0;
    padding: 6px 10px;
  `
};
