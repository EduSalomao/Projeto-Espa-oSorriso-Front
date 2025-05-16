import styled from "styled-components";

export const ContainerLista = styled.div`
    max-height: 92vh; // ou qualquer valor adequado
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #3a5289 #EDF2FD;

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 80%;
    background-color: #EDF2FD;
    gap: 16px;
    justify-content: space-between;
    padding: 0 16px;
`;


