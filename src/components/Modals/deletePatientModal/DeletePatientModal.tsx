import { useState } from "react";
import * as S from "./DeletePatientModal.style";
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
  isOpen: boolean;
  onClose: (isDeleted) => void;
};

function DeletePacientModal({ isOpen, onClose }: Props) {
  const { id } = useParams(); 
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/pacientes/${id}`, {
          method: "DELETE"});
        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error("Erro ao excluir paciente");
        }
        const data = await response.json();
        setIsDeleted(true);

    } catch (error) {
        console.error("Erro ao excluir paciente:", error);
    }

    console.log("Teste" + isDeleted)
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
