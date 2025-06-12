import { useState } from "react";
import * as S from "./SearchProcedureModal.style";
import { useSnackbar } from 'notistack';

type Props = {
  isOpen: boolean;
  onClose: (procedures?: any[]) => void;
};

function SearchProcedureModal({ isOpen, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    code: "",
    category: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      // TODO: Implement backend integration
      console.log("Critérios de busca:", searchCriteria);
      
      // Simulação de resultados
      const mockResults = [
        {
          id: 1,
          name: "Limpeza Dental",
          code: "LD001",
          category: "Higiene",
          type: "Preventivo",
          duration: 60,
          cost: 150.00
        },
        {
          id: 2,
          name: "Clareamento",
          code: "CL001",
          category: "Estético",
          type: "Estético",
          duration: 90,
          cost: 300.00
        }
      ];

      if (mockResults.length === 0) {
        enqueueSnackbar('Nenhum procedimento encontrado com os critérios fornecidos!', { 
          variant: 'info', 
          autoHideDuration: 4000, 
          TransitionProps: { direction: 'down' }, 
          anchorOrigin: { vertical: 'top', horizontal: 'center' } 
        });
      }

      onClose(mockResults);
    } catch (error) {
      console.error("Erro ao buscar procedimentos:", error);
      enqueueSnackbar('Erro ao buscar procedimentos!', { 
        variant: 'error', 
        autoHideDuration: 4000, 
        TransitionProps: { direction: 'down' }, 
        anchorOrigin: { vertical: 'top', horizontal: 'center' } 
      });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Pesquisar Procedimento</S.Title>
        <S.FormContainer>
          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="name">Nome do Procedimento</S.Label>
            <S.Input
              name="name"
              value={searchCriteria.name}
              onChange={handleChange}
              placeholder="Digite o nome do procedimento"
            />
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="code">Código do Procedimento</S.Label>
            <S.Input
              name="code"
              value={searchCriteria.code}
              onChange={handleChange}
              placeholder="Digite o código do procedimento"
            />
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="category">Categoria</S.Label>
            <S.Select
              name="category"
              value={searchCriteria.category}
              onChange={handleChange}
            >
              <option value="">Todas as categorias</option>
              <option value="higiene">Higiene</option>
              <option value="ortodontia">Ortodontia</option>
              <option value="endodontia">Endodontia</option>
              <option value="periodontia">Periodontia</option>
            </S.Select>
          </S.FieldWrapper>
        </S.FormContainer>
        <S.ButtonGroup>
          <S.Button onClick={handleSearch}>Pesquisar</S.Button>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default SearchProcedureModal; 