import { css } from 'styled-components';

const buttonStyles = css`
  box-sizing: border-box;
  padding: 0.6em 2em;
  text-decoration: none;
  border-radius: 18px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

export default buttonStyles;
