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

export const ModalContent = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  background-color: #5a75a3;
  color: white;
  padding: 0.75rem;
  border-radius: 8px 8px 0 0;
  margin: -2rem -2rem 1rem -2rem;
  font-size: 1.25rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  border: 2px dashed #a59bff;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: #3a5a99;
  border: 2px solid #3a5a99;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #3a5a99;
    color: white;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #7b8dbd;
  border: none;
  color: white;

  &:hover {
    background-color: #5a75a3;
  }
`;
