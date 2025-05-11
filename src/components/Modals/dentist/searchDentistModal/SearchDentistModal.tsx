import { useState, useEffect } from "react";
import * as S from "./searchDentistModal.style";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";

type Dentista = {
    id: string;
    name: string;
    cro: string;
    phone: string;
    email: string;
    specialization: string;
    working_hours: string;
};

type Props = {
    isOpen: boolean;
    onClose: (dentistas: Dentista[]) => void;
};

function SearchDentistModal({ isOpen, onClose }: Props) {
    const [term, setTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!term) {
            alert("Por favor, digite o Nome ou CRO.");
            return;
        }
    
        try {
            console.log(`${BACKEND_URL}/dentistas?termo=${term}&page=1&limit=5`)
            const response = await fetch(`${BACKEND_URL}/dentistas?termo=${term}&page=1&limit=5`);
    
            if (!response.ok) {
                throw new Error("Erro ao buscar dentista");
            }
    
            const data = await response.json();
            console.log(data);
            if (data.dentistas.length == 0) {
                alert("Dentista não encontrado.");
                return;
            }
        
            onClose(data.dentistas);
        } catch (error) {
            console.error("Erro ao buscar dentista:", error);
            alert("Erro ao buscar dentista.");
        }   
    };  


  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Pesquisar Dentista</S.Title>
        <S.Description>Digite o CPF do Dentista abaixo:</S.Description>
        <S.MaskedInput
          value={term}
          onChange={(e: any) => setTerm(e.target.value)}
          placeholder="Nome ou CRO"
        />
        
        <S.ButtonGroup>
          <S.Button onClick={handleSearch}>Pesquisar</S.Button>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default SearchDentistModal;
