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
  max-width: 600px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  background-color: #3a5a99;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 8px 8px 0 0;
  margin: -2rem -2rem 1.5rem -2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: #222;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  &:focus {
    outline: none;
    border-color: #3a5a99;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  &:focus {
    outline: none;
    border-color: #3a5a99;
  }
  &[multiple] {
    height: 120px;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  &:focus {
    outline: none;
    border-color: #3a5a99;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const Button = styled.button`
  padding: 0.7rem 2.5rem;
  background-color: #3a5a99;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
  transition: background 0.3s;
  &:hover {
    background-color: #153e75;
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