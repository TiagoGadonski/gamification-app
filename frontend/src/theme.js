import { styled } from 'styled-components'; // Adicione esta importação

export const cyberpunkTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#1A1A1A',
    accent: '#FFE66D',
    text: '#FFFFFF',
    glow: '0 0 10px #FF6B6B, 0 0 20px #4ECDC4'
  },
  fonts: {
    main: '"Orbitron", sans-serif',
    secondary: '"Press Start 2P", cursive'
  }
};

export const pixelBorder = `
  border: 3px solid ${cyberpunkTheme.colors.accent};
  box-shadow: ${cyberpunkTheme.colors.glow};
`;

export const cyberButton = `
  background: transparent;
  ${pixelBorder};
  color: ${cyberpunkTheme.colors.text};
  padding: 12px 24px;
  font-family: ${cyberpunkTheme.fonts.main};
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${cyberpunkTheme.colors.primary};
    text-shadow: ${cyberpunkTheme.colors.glow};
  }
`;

export const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  margin: 2rem 0;
  ${pixelBorder};

  label {
    display: block;
    margin: 1rem 0;
    color: ${cyberpunkTheme.colors.accent}; // Corrigido aqui
  }

  input, select {
    background: ${cyberpunkTheme.colors.background}; // Corrigido aqui
    color: ${cyberpunkTheme.colors.text}; // Corrigido aqui
    border: 2px solid ${cyberpunkTheme.colors.accent}; // Corrigido aqui
    padding: 0.5rem;
    width: 100%;
    margin-top: 0.5rem;
  }
`;