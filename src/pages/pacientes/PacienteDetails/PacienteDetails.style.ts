import styled from "styled-components";

export const ContainerDetails = styled.div`
  display: flex;
  justify-content: space-between
  align-items: flex-start;
  height: 100%;
  gap: 2px;
  background-color: #fff;
`;

export const ContainerAside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    background-color: #fff;
    padding: 16px;
    gap: 16px;
`;

export const Title = styled.div`
    color: #000;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 40px;
    padding-left: 10px;
`

export const Data = styled.div`
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
`

export const DescriptionArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    width: 100%;
    padding-left: 40px;
`

export const ContainerOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
    width: 95%;
    background-color: #EDF2FD;
    padding: 16px;
    gap: 16px;
`;

export const ContainerOptionsMenu = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    
`

export const OptionsMenu = styled.p`
    color: #3d5582;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
`

export const Line = styled.hr`
    border: none;
    height: 2px;
    background-color: #3d5582;
    margin: 0 0;
`;

export const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 20%;
  background-color: #EDF2FD;
  border-radius: 6px;
  padding: 16px;
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