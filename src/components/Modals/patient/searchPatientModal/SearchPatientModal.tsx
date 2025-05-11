import { useState, useEffect } from "react";
import * as S from "./SearchPatientModal.style";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function SearchPatientModal({ isOpen, onClose }: Props) {
  const [cpf, setCpf] = useState("");
  const [idPaciente, setIdPaciente] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!cpf) {
      alert("Por favor, digite o CPF.");
      return;
    }
  
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      alert("CPF inválido. Certifique-se de digitar 11 números.");
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/pacientes/cpf/${cpf}`);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar paciente");
      }
  
      const data = await response.json();
      console.log(data);
      if (!data.id) {
        alert("Paciente não encontrado.");
        return;
      }
  
      setIdPaciente(data.id);
  
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      alert("Erro ao buscar paciente.");
    }
  
    onClose();
  };  
  
  useEffect(() => {
    if (idPaciente !== null) {
      navigate(`/pacientes/${idPaciente}`);
    }
  }, [idPaciente, navigate]);


  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Pesquisar Paciente</S.Title>
        <S.Description>Digite o CPF do Paciente abaixo:</S.Description>
        <S.MaskedInput
          mask="000.000.000-00"
          value={cpf}
          onAccept={(value: any) => setCpf(value)}
          placeholder="xxx.xxx.xxx-xx"
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
