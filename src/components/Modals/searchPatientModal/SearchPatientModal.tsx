import { useState } from "react";
import * as S from "./SearchPatientModal.style";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function SearchPatientModal({ isOpen, onClose }: Props) {
  const [cpf, setCpf] = useState("");

  const handleSearch = () => {
    console.log("Pesquisar CPF:", cpf);
    alert(`Pesquisar paciente com CPF: ${cpf}`);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Pesquisar Paciente</S.Title>
        <S.Description>Digite o CPF do Paciente abaixo:</S.Description>
        <S.Input
          type="text"
          placeholder="xxx.xxx.xxx-xx"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
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
