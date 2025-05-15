import styled, { css } from "styled-components";

export const MenuButton = styled.button<{ collapsed?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  background: #2f4370;
  color: white;
  border: none;
  padding: 15px 16px;
  margin: 4px 8px;
  font-size: 30px;
  border-radius: 6px;
  cursor: pointer;
  
  span.label {
    font-size: 20px;
    transition: opacity 0.3s ease, width 0.3s ease, margin 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
  }

  svg {
    margin-right: 10px;
    flex-shrink: 0;
  }

  ${({ collapsed }) =>
    collapsed &&
    css`
      justify-content: left;
      span.label {
        opacity: 0;
        width: 0;
        margin: 0;
      }
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

export const Test = styled.button<{ collapsed?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  background: #2f4370;
  color: white;
  border: none;
  padding: 20px 16px;
  margin: 4px 8px;
  font-size: 20px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;

  svg {
    margin-right: 10px;
    flex-shrink: 0;
  }

  span.label {
    transition: opacity 0.3s ease, width 0.3s ease, margin 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
  }

  ${({ collapsed }) =>
    collapsed &&
    css`
      justify-content: center;

      span.label {
        opacity: 0;
        width: 0;
        margin: 0;
      }

      svg {
        margin-right: 0;
      }
    `}

  &:focus {
    outline: none;
  }

  ${({ $active }) =>
    $active &&
    css`
      background: #7bb59e;
    `}

  &:hover {
    background: #3a5289;
  }
`;

/* 
transition: padding 0.3s ease;
*/