import styled, { css } from "styled-components";

export const MenuButton = styled.button<{ collapsed?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  background: #2f4370;
  color: white;
  border: none;
  padding: 12px 16px;
  margin: 4px 8px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: padding 0.3s ease;

  svg {
    margin-right: ${({ collapsed }) => (collapsed ? "0" : "10px")};
  }

  ${({ collapsed }) =>
    collapsed &&
    css`
      justify-content: center;
    `}

  &:focus {
    outline: none;
  }
  
  ${({ $active }) =>
    $active &&
    css`
      background: #7bb59e; /* mesma cor do :active ou o que você quiser */
    `}

  &:hover {
    background: #3a5289;
  }
`;