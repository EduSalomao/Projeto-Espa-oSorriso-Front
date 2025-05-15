import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const SidebarContent = styled(motion.div)<{ collapsed: boolean }>`
  height: 100%;
  background-color: #405c9b;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1px;
`;

export const CollapseButton = styled(motion.button)<{ collapsed?: boolean }>`
  display: flex;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  background-color: #2f4370;
  border-radius: 0 50% 50% 0;
  position: absolute;
  top: 0;
  right: -35px;
  &:focus {
    outline: none;
  }
`;



export const MenuButton = styled.button<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  background: black;
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

  &&:focus {
    outline: none;
    background: #7bb59e;
  }
  &:hover {
    background: #3a5289;
  }
`;
