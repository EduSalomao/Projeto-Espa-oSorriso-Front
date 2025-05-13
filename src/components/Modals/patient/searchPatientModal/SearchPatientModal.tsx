import { useState, useEffect } from "react";
import * as S from "./SearchPatientModal.style";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useAlert } from "../../../../context/AlertContext";


type Props = {
  isOpen: boolean;
  onClose: (pacientes) => void;
};

function SearchPatientModal({ isOpen, onClose }: Props) {
  const [term, setTerm] = useState("");
  const { showAlert } = useAlert();

  const handleSearch = async () => {
    if (!term) {
      showAlert({
        severity: "warning",
        message: "Por favor, digite o Nome ou CPF."
      });
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
        showAlert({
          severity: "warning",
          message: "Paciente não encontrado."
        });
        return;
      }

      onClose(data.pacientes);

    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      showAlert({
        severity: "error",
        message: "Erro ao buscar paciente."
      });
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
