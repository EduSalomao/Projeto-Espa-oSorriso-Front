import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: 100%;
`;



export const SidebarArea = styled(motion.div)<{ collapsed: boolean }>`
  background-color: #405c9b;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;


export const HeaderArea = styled.div`
  background-color: #2f4370;
  padding: 10px 20px;
`


export const Header = styled.div`
  background-color: #2f4370;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0;
  img {
    height: 40px;
  }
`;

export const CollapseButton = styled.button<{ collapsed?: boolean }>`
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  background-color: #2f4370;
  border-radius: 50%;
  position: relative;
`;

export const CollapseTesButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2f4370; // um pouco mais escuro que #405c9b
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #25355c;
  }

  svg {
    width: 16px;
    height: 16px;
  }
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

export const Main = styled.main`
  flex: 1;
  background-color: #e8edf9;
  padding: 0px;
  .welcome {
    margin-top: 80px;
    text-align: center;

    h2 {
      font-weight: bold;
      font-size: 24px;
      color: #2f4370;
    }

    p {
      margin-top: 8px;
      color: #4b5e7a;
    }
  }
`;
export const BodyArea = styled.div`
  display: flex;
  height: 100%;
`

export const UserArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  color: #ffffff;
`;
