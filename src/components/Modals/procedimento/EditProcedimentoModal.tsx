// src/components/Modals/procedimento/EditProcedimentoModal.tsx
import { useState, useEffect } from "react";
import * as S from "../patient/createPatientModal/CreatePatientModal.style";
import { useSnackbar } from 'notistack';
import { updateProcedimento } from "../../../api/services/ProcedimentoService";
import { Procedimento } from "../../../api/types/procedimento";
import { DentistaMultiAutocomplete } from "../dentist/DentistaMultiAutocomplete";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  procedimento: Procedimento | null;
};

function EditProcedimentoModal({ isOpen, onClose, procedimento }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: '',
    tipo: '',
    duracao: '00:30',
    custo: '',
    descricao: '',
    categoria: '',
    observacoes: '',
    dentistas: []
  });

  console.log("Procedimento to edit:", procedimento);
  useEffect(() => {
    if (procedimento) {
      setForm({
        name: procedimento.name,
        tipo: procedimento.tipo,
        duracao: procedimento.duracao.substring(0, 5),
        custo: String(procedimento.custo),
        descricao: procedimento.descricao || '',
        categoria: procedimento.categoria || '',
        observacoes: procedimento.observacoes || '',
        dentistas: procedimento.dentistas
      });
    }
  }, [procedimento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!procedimento) return;

    if (!form.name || !form.tipo || !form.duracao || !form.custo || !form.dentistas) {
      enqueueSnackbar('Preencha todos os campos obrigatórios.', { variant: 'warning' });
      return;
    }
    
    const custoNumber = parseFloat(form.custo);
    if (isNaN(custoNumber) || custoNumber <= 0) {
        enqueueSnackbar('Custo inválido!', { variant: 'error' });
        return;
    }

    const dentistaIds = form.dentistas.map(d => parseInt(d.id))
     if (dentistaIds.length === 0) {
        enqueueSnackbar('Por favor, insira IDs de dentistas válidos.', { variant: 'warning' });
        return;
    }

    try {
      await updateProcedimento(procedimento.id, {
        ...form,
        custo: custoNumber,
        duracao: `${form.duracao}:00`,
        dentistas: dentistaIds
      });
      enqueueSnackbar('Procedimento atualizado com sucesso!', { variant: 'success' });
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao atualizar procedimento.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;
  
  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Editar Procedimento</S.Title>
        <S.FormContainer>
            <S.FieldWrapper style={{ width: "68%" }}>
                <S.Label htmlFor="name">Nome do Procedimento *</S.Label>
                <S.Input name="name" value={form.name} onChange={handleChange} />
            </S.FieldWrapper>
            <S.FieldWrapper style={{ width: "30%" }}>
                <S.Label htmlFor="tipo">Tipo *</S.Label>
                <S.Input name="tipo" value={form.tipo} onChange={handleChange} />
            </S.FieldWrapper>
            <S.FieldWrapper style={{ width: "48%" }}>
                <S.Label htmlFor="duracao">Duração (HH:MM) *</S.Label>
                <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
            </S.FieldWrapper>
            <S.FieldWrapper style={{ width: "48%" }}>
                <S.Label htmlFor="custo">Custo (R$) *</S.Label>
                <S.Input name="custo" type="number" value={form.custo} onChange={handleChange} />
            </S.FieldWrapper>
            {/* <S.FieldWrapper style={{ width: "100%" }}>
                <S.Label htmlFor="dentistas">IDs dos Dentistas (separados por vírgula) *</S.Label>
                <S.Input name="dentistas" value={form.dentistas} onChange={handleChange}/>
            </S.FieldWrapper> */}
            <DentistaMultiAutocomplete value={form.dentistas} onChangeForm={handleChange}/>
            <S.FieldWrapper style={{ width: "100%" }}>
                <S.Label htmlFor="descricao">Descrição</S.Label>
                <S.Input as="textarea" name="descricao" value={form.descricao} onChange={handleChange} />
            </S.FieldWrapper>
            <S.FieldWrapper style={{ width: "48%" }}>
                <S.Label htmlFor="categoria">Categoria</S.Label>
                <S.Input name="categoria" value={form.categoria} onChange={handleChange} />
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

export default EditProcedimentoModal;