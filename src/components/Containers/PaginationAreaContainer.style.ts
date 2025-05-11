import styled, { keyframes, css }  from 'styled-components';
import { FaSync } from 'react-icons/fa';

export const PaginationAreaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px; /* opcional, só pra dar espaçamento lateral */
`

export const PaginationButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`
// Animação de rotação
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Ícone estilizado que gira enquanto `spinning` for true
export const RotatingIcon = styled(FaSync)<{ spinning: boolean }>`
  cursor: pointer;
  transition: transform 0.3s ease;
  color: black;
  ${({ spinning }) =>
    spinning &&
    css`
      animation: ${rotate} 1s linear infinite;
    `}
`;