import { useState } from "react";
import * as S from "./DeleteDentistModal.style";
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useSnackbar } from 'notistack';

type Props = {
  isOpen: boolean;
  onClose: (isDeleted) => void;
};

function DeleteDentistModal({ isOpen, onClose }: Props) {
  const { id } = useParams(); 
  const [isDeleted, setIsDeleted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!id) {
      enqueueSnackbar('ID do dentista não encontrado.', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      onClose(false);
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/dentistas/${id}`, {
        method: "DELETE"
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir Dentista");
      }
  
      const data = await response.json();
      setIsDeleted(true);
  
      enqueueSnackbar('Dentista excluído com sucesso!', { variant: 'success', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      
    } catch (error) {
      console.error("Erro ao excluir Dentista:", error);
      enqueueSnackbar('Erro ao excluir Dentista', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
  
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
        <S.Title>Excluir Dentista</S.Title>
        <S.Description>Deseja excluir este dentista?<br/>Esta ação é irreversível!</S.Description>
        
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default DeleteDentistModal;
