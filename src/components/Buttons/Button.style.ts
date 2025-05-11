import styled from 'styled-components';

export const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 0 16px;
`;

export const ActionButton = styled.button`
  background-color: #153e75;
  color: white;
  margin-top: 16px;
  border: none;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #0e2c57;
  }
`;