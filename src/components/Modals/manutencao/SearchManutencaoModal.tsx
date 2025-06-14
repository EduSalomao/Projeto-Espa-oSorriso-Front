import { useState } from "react";
import * as S from "../patient/searchPatientModal/SearchPatientModal.style";
import { useSnackbar } from 'notistack';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
};

function SearchManutencaoModal({ isOpen, onClose, onSearch }: Props) {
  const [term, setTerm] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = () => {
    if (!term.trim()) {
      enqueueSnackbar('Por favor, digite um termo para a busca.', { variant: 'warning' });
      return;
    }
    onSearch(term);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Pesquisar Manutenção</S.Title>
        <S.Description>Digite o nome do paciente ou dentista:</S.Description>
        <S.Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Nome do Paciente ou Dentista"
        />
        <S.ButtonGroup>
          <S.Button onClick={handleSearch}>Pesquisar</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default SearchManutencaoModal;