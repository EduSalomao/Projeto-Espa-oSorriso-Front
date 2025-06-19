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
  max-height: 88vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #3a5289 #EDF2FD;

  display: flex;
  width: 100%;
  justify-content: center;
`;
export const ContainerAgenda = styled.div`  
  
  width: 80%;
  padding-top: 40px;
`