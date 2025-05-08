import styled from "styled-components";

export const Container = styled.div`
  background-color: #edf2fd;
  min-height: 100vh;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: left;
`;

export const Card = styled.div`
  background-color: white;
  width: 100%;
  max-width: 800px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  border-top: 4px solid #3fb6a8;
  padding: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000
`;

export const CardInfo = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #333;
`;


export const CardLine = styled.hr`
  border: none;
  height: 2px;
  background-color: #3fb6a8;
  margin: 0 0;
`;

export const CardInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
  row-gap: 2px;
`;

export const ListaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
`;

export const CardsArea = styled.div`
  flex: 1;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: left;
`;

export const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 150px;
`;

export const ActionButton = styled.button`
  background-color: #153e75;
  color: white;
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
