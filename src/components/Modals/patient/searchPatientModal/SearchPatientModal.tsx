import { useState, useEffect } from "react";
import * as S from "./SearchPatientModal.style";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useSnackbar } from 'notistack';


type Props = {
  isOpen: boolean;
  onClose: (pacientes) => void;
};

function SearchPatientModal({ isOpen, onClose }: Props) {
  const [term, setTerm] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = async () => {
    if (!term) {
      enqueueSnackbar('Por favor, digite o Nome ou CPF!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/pacientes?termo=${term}&page=1&limit=5`);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar paciente");
      }
  
      const data = await response.json();
      console.log(data);
      if (data.pacientes.length == 0) {
        enqueueSnackbar('Paciente não encontrado!', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

        return;
      }

      onClose(data.pacientes);

    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      enqueueSnackbar('Erro ao buscar paciente!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

    }

  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Pesquisar Paciente</S.Title>
        <S.Description>Digite o Nome ou CPF do Paciente abaixo:</S.Description>
        <S.MaskedInput
          value={term}
          onChange={(e: any) => setTerm(e.target.value)}
          placeholder="Nome ou CPF"
        />
        
        <S.ButtonGroup>
          <S.Button onClick={handleSearch}>Pesquisar</S.Button>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default SearchPatientModal;
