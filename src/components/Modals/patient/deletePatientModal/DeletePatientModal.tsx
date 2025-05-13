import { useState } from "react";
import * as S from "./DeletePatientModal.style";
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
  isOpen: boolean;
  onClose: (isDeleted) => void;
};

function DeletePacientModal({ isOpen, onClose }: Props) {
  const { id } = useParams(); 
  const [isDeleted, setIsDeleted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!id) {
      
      enqueueSnackbar('Id do paciente não encontrado!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      onClose(false);
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/pacientes/${id}`, {
        method: "DELETE"
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir paciente");
      }
  
      const data = await response.json();
      setIsDeleted(true);
      
      enqueueSnackbar('Paciente excluído com sucesso!', { variant: 'success', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

    } catch (error) {
      enqueueSnackbar('Erro ao excluir paciente!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      console.error("Erro ao excluir paciente:", error);
    }
  
    onClose(true);
  };
  

  const handleCancel = () => {
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Excluir Paciente</S.Title>
        <S.Description>Deseja excluir este paciente?<br/>Esta ação é irreversível!</S.Description>
        
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default DeletePacientModal;
