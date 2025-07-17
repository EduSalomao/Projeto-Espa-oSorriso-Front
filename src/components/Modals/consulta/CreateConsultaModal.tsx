import { useState } from "react";
import * as S from "../Modal.styles.ts";
import { useSnackbar } from 'notistack';
import { createConsulta } from "../../../api/services/ConsultaService";
import { DentistaAutocomplete } from "../dentist/DentistAutocomplete";
import { PacienteAutocomplete } from "../patient/PacienteAutocomplete";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

function CreateConsultaModal({ isOpen, onClose, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    id_paciente: '',
    id_dentista: '',
    data_hora: '',
    duracao: '01:00', 
    motivo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.id_paciente || !form.id_dentista || !form.data_hora || !form.duracao || !form.motivo) {
      enqueueSnackbar('Preencha todos os campos obrigatórios.', { variant: 'warning' });
      return;
    }
    
    try {
      await createConsulta({
        ...form,
        id_paciente: Number(form.id_paciente.id),
        id_dentista: Number(form.id_dentista.id),
        duracao: `${form.duracao}:00`
      });
      enqueueSnackbar('Consulta cadastrada com sucesso!', { variant: 'success' });
      setForm({
        id_paciente: '',
        id_dentista: '',
        data_hora: '',
        duracao: '01:00',
        motivo: ''
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao cadastrar consulta.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;
  
  return (
    
    <S.ModalOverlay>
      <S.DateTimePickerStyle />
      <S.Container>
        <S.Title>Nova Consulta</S.Title>
        <S.FormContainer>
          <PacienteAutocomplete
            value={form.id_paciente}
            onChangeForm={handleChange}
            name="id_paciente"
          />
          <DentistaAutocomplete value={form.id_dentista} onChangeForm={handleChange} name="id_dentista"/>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="data_hora">Data e Hora *</S.Label>
            <S.Input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="duracao">Duração *</S.Label>
            <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%" }}>
            <S.Label htmlFor="motivo">Motivo *</S.Label>
            <S.Input name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo da consulta" />
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

export default CreateConsultaModal;