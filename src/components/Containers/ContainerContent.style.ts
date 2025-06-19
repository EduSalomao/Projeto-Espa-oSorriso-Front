import styled from "styled-components";

export const MainContainerContent = styled.div`

  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
  gap: 2px;
`;

export const MainContainerAgendaContent = styled.div`

  display: flex;
  flex: 1;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
export const ContainerAgenda = styled.div`  
  
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #3a5289 #EDF2FD;

  width: 80%;
  padding-top: 40px;
`