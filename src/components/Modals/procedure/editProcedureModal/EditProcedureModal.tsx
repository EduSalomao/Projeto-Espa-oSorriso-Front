import { useState, useEffect } from "react";
import * as S from "./EditProcedureModal.style";
import { useSnackbar } from 'notistack';

type ProcedureFormData = {
  name: string;
  type: string;
  duration: string;
  cost: string;
  dentists: string[];
  description: string;
  category: string;
  notes: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  procedure: ProcedureFormData;
};

function EditProcedureModal({ isOpen, onClose, procedure }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<ProcedureFormData>(procedure);

  useEffect(() => {
    setForm(procedure);
  }, [procedure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Validação dos campos obrigatórios
    if (!form.name || !form.type || !form.duration || !form.cost || form.dentists.length === 0) {
      enqueueSnackbar('Por favor, preencha todos os campos obrigatórios!', { 
        variant: 'warning', 
        autoHideDuration: 4000, 
        TransitionProps: { direction: 'down' }, 
        anchorOrigin: { vertical: 'top', horizontal: 'center' } 
      });
      return;
    }

    // Validação do custo (deve ser um número positivo)
    const cost = parseFloat(form.cost);
    if (isNaN(cost) || cost <= 0) {
      enqueueSnackbar('Custo inválido! Digite um valor positivo.', { 
        variant: 'warning', 
        autoHideDuration: 4000, 
        TransitionProps: { direction: 'down' }, 
        anchorOrigin: { vertical: 'top', horizontal: 'center' } 
      });
      return;
    }

    try {
      // TODO: Implement backend integration
      console.log("Dados do procedimento atualizados:", form);
      enqueueSnackbar('Procedimento atualizado com sucesso!', { 
        variant: 'success', 
        autoHideDuration: 4000, 
        TransitionProps: { direction: 'down' }, 
        anchorOrigin: { vertical: 'top', horizontal: 'center' } 
      });
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar procedimento:", error);
      enqueueSnackbar('Não foi possível atualizar o procedimento.', { 
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
        <S.Title>Editar Procedimento</S.Title>
        <S.FormContainer>
          <S.FieldWrapper style={{ width: "70%" }}>
            <S.Label htmlFor="name">Nome do Procedimento *</S.Label>
            <S.Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite o nome do procedimento"
            />
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "30%" }}>
            <S.Label htmlFor="type">Tipo de Procedimento *</S.Label>
            <S.Select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Selecione o tipo</option>
              <option value="preventivo">Preventivo</option>
              <option value="restaurador">Restaurador</option>
              <option value="estetico">Estético</option>
              <option value="cirurgico">Cirúrgico</option>
            </S.Select>
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "30%" }}>
            <S.Label htmlFor="duration">Duração (minutos) *</S.Label>
            <S.Input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duração em minutos"
            />
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "30%" }}>
            <S.Label htmlFor="cost">Custo (R$) *</S.Label>
            <S.Input
              name="cost"
              type="number"
              step="0.01"
              value={form.cost}
              onChange={handleChange}
              placeholder="0.00"
            />
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="dentists">Dentistas que realizam o serviço *</S.Label>
            <S.Select
              name="dentists"
              multiple
              value={form.dentists}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setForm(prev => ({ ...prev, dentists: selectedOptions }));
              }}
            >
              <option value="dentista1">Dr. João Silva</option>
              <option value="dentista2">Dra. Maria Santos</option>
              <option value="dentista3">Dr. Pedro Oliveira</option>
            </S.Select>
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="category">Categoria</S.Label>
            <S.Select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Selecione a categoria</option>
              <option value="higiene">Higiene</option>
              <option value="ortodontia">Ortodontia</option>
              <option value="endodontia">Endodontia</option>
              <option value="periodontia">Periodontia</option>
            </S.Select>
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="description">Descrição do Procedimento</S.Label>
            <S.TextArea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descreva o procedimento"
            />
          </S.FieldWrapper>

          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="notes">Observações</S.Label>
            <S.TextArea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Observações adicionais"
            />
          </S.FieldWrapper>
        </S.FormContainer>
        <S.ButtonGroup>
          <S.Button onClick={handleSave}>Salvar</S.Button>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default EditProcedureModal; 