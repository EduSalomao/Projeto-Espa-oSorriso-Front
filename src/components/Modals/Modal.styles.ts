import styled from "styled-components";
import { IMaskInput } from "react-imask";

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
  max-width: 60%;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  background-color: #5a75a3;
  font-family: var(--font-roboto);
  color: white;
  padding: 0.75rem;
  border-radius: 8px 8px 0 0;
  margin: -2rem -2rem 1rem -2rem;
  font-size: 32px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
`

export const FieldWrapper = styled.div`
  text-align: left;
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
  font-family: var(--font-roboto);
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  color: #000;
  width: 100%;
  background-color: #fff;
  border: none;
  border-radius: 6px;
  text-align: left;
  &::placeholder {
    color: #000; /* Altere para a cor que quiser */
    opacity: 1;  /* Garante que a cor será visível */
  }
`;

export const MaskedInput = styled(IMaskInput)`
  padding: 0.5rem;
  font-size: 1rem;
  color: #000;
  width: 100%;
  background-color: #fff;
  border: none;
  border-radius: 6px;
  text-align: left;

  &::placeholder {
    color: #000;
    opacity: 1;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-top: 150px;
`;

export const Button = styled.button`
  padding: 0.05rem 2.5rem;
  background-color: white;
  color: #3a5a99;
  border: 1px solid #3a5a99;
  border-radius: 6px;
  font-family: var(--font-roboto);
  font-size: 24px;
  cursor: pointer;
  font-weight: 200;
  
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
