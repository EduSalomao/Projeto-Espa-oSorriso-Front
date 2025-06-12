import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div`
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  background-color: #3a5a99;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 8px 8px 0 0;
  margin: -2rem -2rem 1.5rem -2rem;
`;

export const Message = styled.p`
  color: #222;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Warning = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const DeleteButton = styled.button`
  padding: 0.7rem 2.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
  transition: background 0.3s;
  &:hover {
    background-color: #c82333;
  }
`;

export const CancelButton = styled.button`
  padding: 0.7rem 2.5rem;
  background-color: #b0b0b0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
  transition: background 0.3s;
  &:hover {
    background-color: #888;
  }
`; 