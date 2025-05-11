import { useState } from "react";
import * as S from "./DeleteDentistModal.style";
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
  isOpen: boolean;
  onClose: (isDeleted) => void;
};

function DeleteDentistModal({ isOpen, onClose }: Props) {
  const { id } = useParams(); 
  const [isDeleted, setIsDeleted] = useState(false);
  
  const handleDelete = async () => {
    if (!id) {
      alert("ID do dentista não encontrado.");
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
  
      alert("Dentista excluído com sucesso!");
  
    } catch (error) {
      console.error("Erro ao excluir Dentista:", error);
      alert("Erro ao excluir Dentista.");
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
