// src/components/Modals/procedimento/SearchProcedimentoModal.tsx
import { useState } from "react";
import * as S from "../patient/searchPatientModal/SearchPatientModal.style";
import { useSnackbar } from 'notistack';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
};

function SearchProcedimentoModal({ isOpen, onClose, onSearch }: Props) {
  const [term, setTerm] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSearchClick = () => {
    if (!term.trim()) {
      enqueueSnackbar('Por favor, digite um termo para a busca.', { variant: 'warning' });
      return;
    }
    onSearch(term);
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Pesquisar Procedimento</S.Title>
        <S.Description>Digite o nome do procedimento:</S.Description>
        <S.Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Nome do Procedimento"
        />
        <S.ButtonGroup>
          <S.Button onClick={handleSearchClick}>Pesquisar</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default SearchProcedimentoModal;