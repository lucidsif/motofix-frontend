import { css } from 'styled-components';

const buttonStyles = css`
  box-sizing: border-box;
  padding: 0.45em 2em;
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
  background-color: #38BEA0;
  color: #fff;
  position: absolute;
  top: 19em;
  right: 34em;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

export default buttonStyles;
