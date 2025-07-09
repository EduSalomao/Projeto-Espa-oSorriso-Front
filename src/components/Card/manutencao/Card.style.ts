import styled from "styled-components";

export const Card = styled.div`
  text-align: left;
  background-color: #EDF2FD;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  padding: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #fff;
  }
  cursor: pointer;
`;

export const CardTitle = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin: 2px 0px 2px 10px;
  color: #000;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

export const CardInfo = styled.p`
  margin: 2px 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #000;
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
  row-gap: 0px;
  padding: 0 10px;
`;