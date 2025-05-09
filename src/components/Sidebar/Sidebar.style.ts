import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const SidebarContent = styled(motion.div)<{ collapsed: boolean }>`
  height: 100%;
  background-color: #405c9b;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 5px;
`;

export const CollapseButton = styled(motion.button)<{ collapsed?: boolean }>`
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  background-color: #2f4370;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: -18px;
  z-index: 2;
`;



export const MenuButton = styled.button<{ collapsed?: boolean }>`
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

  &:hover {
    background: #3a5289;
  }
`;
