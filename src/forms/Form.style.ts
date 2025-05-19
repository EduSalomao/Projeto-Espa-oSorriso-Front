import styled from "styled-components";
import { IMaskInput } from "react-imask";


export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
`

export const FieldWrapper = styled.div`
  text-align: left;
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

