// src/components/Modals/procedimento/CreateProcedimentoModal.tsx
import { useState } from "react";
import * as S from "../patient/createPatientModal/CreatePatientModal.style"; // Reusing styles
import { useSnackbar } from 'notistack';
import { createProcedimento } from "../../../api/services/ProcedimentoService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

function CreateProcedimentoModal({ isOpen, onClose, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: '',
    tipo: '',
    duracao: '00:30',
    custo: '',
    descricao: '',
    categoria: '',
    observacoes: '',
    dentistas: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.tipo || !form.duracao || !form.custo || !form.dentistas) {
      enqueueSnackbar('Preencha todos os campos obrigatórios.', { variant: 'warning' });
      return;
    }
    
    const custoNumber = parseFloat(form.custo);
    if (isNaN(custoNumber) || custoNumber <= 0) {
        enqueueSnackbar('Custo inválido!', { variant: 'error' });
        return;
    }

    const dentistaIds = form.dentistas.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

    if (dentistaIds.length === 0) {
        enqueueSnackbar('Por favor, insira IDs de dentistas válidos.', { variant: 'warning' });
        return;
    }
    
    try {
      await createProcedimento({
        ...form,
        custo: custoNumber,
        duracao: `${form.duracao}:00`, // Add seconds for time format
        dentistas: dentistaIds
      });
      enqueueSnackbar('Procedimento cadastrado com sucesso!', { variant: 'success' });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao cadastrar procedimento.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;
  
  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Novo Procedimento</S.Title>
        <S.FormContainer>
          <S.FieldWrapper style={{ width: "68%" }}>
            <S.Label htmlFor="name">Nome do Procedimento *</S.Label>
            <S.Input name="name" value={form.name} onChange={handleChange} placeholder="Ex: Limpeza" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "30%" }}>
            <S.Label htmlFor="tipo">Tipo *</S.Label>
            <S.Input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Ex: Comum" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="duracao">Duração (HH:MM) *</S.Label>
            <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="custo">Custo (R$) *</S.Label>
            <S.Input name="custo" type="number" value={form.custo} onChange={handleChange} placeholder="150.00" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="dentistas">IDs dos Dentistas (separados por vírgula) *</S.Label>
            <S.Input name="dentistas" value={form.dentistas} onChange={handleChange} placeholder="1, 2, 3" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="descricao">Descrição</S.Label>
            <S.Input as="textarea" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição detalhada do procedimento" />
          </S.FieldWrapper>
           <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="categoria">Categoria</S.Label>
            <S.Input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Ex: Estética" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="observacoes">Observações</S.Label>
            <S.Input as="textarea" name="observacoes" value={form.observacoes} onChange={handleChange} />
          </S.FieldWrapper>
        </S.FormContainer>
        <S.ButtonGroup>
          <S.Button onClick={handleSave}>Salvar</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default CreateProcedimentoModal;