// src/components/Modals/procedimento/CreateProcedimentoModal.tsx
import React, { useState } from "react";
import { DentistaMultiAutocomplete } from "../dentist/DentistaMultiAutocomplete.tsx";

import * as S from "../Modal.styles.ts"; // Reusing styles
import { useSnackbar } from 'notistack';
import { createProcedimento } from "../../../api/services/ProcedimentoService";
import { getDentistas } from "../../../api/services/DentistaService";
import { Dentista } from "../../../api/types/dentista";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const Wrapper = S.Container;
const Label = S.Label;
const Input = S.Input;
const ButtonGroup = S.ButtonGroup;
const Button = S.Button;
const CancelButton = S.CancelButton;

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
    dentistas: []
  });

  const [dentistas, setDentistas] = useState<Dentista[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log("Form data:", form);
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

    const dentistaIds = form.dentistas.map((d: Dentista) => d.id)

    console.log("Dentista IDs:", dentistaIds);
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
      if (error.response?.data?.error === 'duplicate key value violates unique constraint "unq_nome_procedimento"') {
        enqueueSnackbar("Nome de Procedimento já existe", { variant: 'warning' });
      } else {
        enqueueSnackbar(error.response?.data?.error || "Erro ao cadastrar procedimento.", { variant: 'error' });
      }
      
    }
  };

  if (!isOpen) return null;
  
  return (
    <S.ModalOverlay>
      <Wrapper>
        <S.Title>Novo Procedimento</S.Title>
        <S.FormContainer>
          <S.FieldWrapper style={{ width: "68%" }}>
            <Label htmlFor="name">Nome do Procedimento *</Label>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Ex: Limpeza" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "30%" }}>
            <Label htmlFor="tipo">Tipo *</Label>
            <Input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Ex: Comum" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <Label htmlFor="duracao">Duração (HH:MM) *</Label>
            <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <Label htmlFor="custo">Custo (R$) *</Label>
            <Input name="custo" type="number" value={form.custo} onChange={handleChange} placeholder="150.00" />
          </S.FieldWrapper>
          {/* <S.FieldWrapper style={{ width: "100%" }}>
            <Label htmlFor="dentistas">IDs dos Dentistas (separados por vírgula) *</Label>
            <Input name="dentistas" value={form.dentistas} onChange={handleChange} placeholder="1, 2, 3" />
          </S.FieldWrapper> */}
          <DentistaMultiAutocomplete value={form.dentistas} onChangeForm={handleChange} />
          <S.FieldWrapper style={{ width: "100%" }}>
            <Label htmlFor="descricao">Descrição</Label>
            <Input as="textarea" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição detalhada do procedimento" />
          </S.FieldWrapper>
           <S.FieldWrapper style={{ width: "48%" }}>
            <Label htmlFor="categoria">Categoria</Label>
            <Input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Ex: Estética" />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%" }}>
            <Label htmlFor="observacoes">Observações</Label>
            <Input as="textarea" name="observacoes" value={form.observacoes} onChange={handleChange} />
          </S.FieldWrapper>
        </S.FormContainer>
        <ButtonGroup>
          <Button onClick={handleSave}>Salvar</Button>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
        </ButtonGroup>
        
      </Wrapper>
    </S.ModalOverlay>
  );
}

export default CreateProcedimentoModal;