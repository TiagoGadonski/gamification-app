import { createGlobalStyle } from 'styled-components';
import { cyberpunkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${cyberpunkTheme.colors.background};
    color: ${cyberpunkTheme.colors.text};
    font-family: ${cyberpunkTheme.fonts.main};
    min-height: 100vh;
  }

  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
`;

export default GlobalStyle;