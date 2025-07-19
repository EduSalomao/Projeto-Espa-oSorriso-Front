import { useState } from "react";
import * as S from "../Modal.styles.ts";
import { useSnackbar } from 'notistack';
import { createConsulta } from "../../../api/services/ConsultaService";
import { DentistaAutocomplete } from "../dentist/DentistAutocomplete.tsx";
import { PacienteAutocomplete } from "../patient/PacienteAutocomplete";
import { ProcedimentoMultiAutocomplete } from "../procedimento/ProcedimentoMultiAutocomplete.tsx";
import { Paciente } from "../../../api/types/paciente.ts";
import { Dentista } from "../../../api/types/dentista.ts";
import { Procedimento } from "../../../api/types/procedimento.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const initialFormState = {
  paciente: null as Paciente | null,
  dentista: null as Dentista | null,
  data_hora: '',
  duracao: '01:00',
  motivo: '',
  procedimentos: [] as Procedimento[]
};

function CreateConsultaModal({ isOpen, onClose, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState(initialFormState);

  const resetForm = () => {
    setForm(initialFormState);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'dentista' && value !== form.dentista) {
      setForm(prev => ({ ...prev, procedimentos: [], [name]: value }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!form.paciente || !form.dentista || !form.data_hora || !form.duracao || !form.motivo) {
      enqueueSnackbar('Preencha todos os campos obrigatórios.', { variant: 'warning' });
      return;
    }

    try {
      await createConsulta({
        id_paciente: form.paciente.id,
        id_dentista: Number(form.dentista.id),
        data_hora: form.data_hora,
        duracao: `${form.duracao}:00`,
        motivo: form.motivo,
        procedimentos: form.procedimentos.map(p => p.id)
      });
      enqueueSnackbar('Consulta cadastrada com sucesso!', { variant: 'success' });
      resetForm();
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
          <PacienteAutocomplete value={form.paciente} onChangeForm={handleChange} name="paciente"/>
          <DentistaAutocomplete value={form.dentista} onChangeForm={handleChange} name="dentista"/>
          <ProcedimentoMultiAutocomplete
            value={form.procedimentos}
            onChangeForm={handleChange}
            dentistaId={form.dentista ? Number(form.dentista.id) : null}
            name="procedimentos"
          />
          <S.FieldWrapper style={{ width: "48%", marginTop: "1rem" }}>
            <S.Label htmlFor="data_hora">Data e Hora *</S.Label>
            <S.Input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%", marginTop: "1rem" }}>
            <S.Label htmlFor="duracao">Duração *</S.Label>
            <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%", marginTop: "1rem" }}>
            <S.Label htmlFor="motivo">Motivo *</S.Label>
            <S.Input as="textarea" name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo da consulta" />
          </S.FieldWrapper>
        </S.FormContainer>
        <S.ButtonGroup>
          <S.Button onClick={handleSave}>Salvar</S.Button>
          <S.CancelButton onClick={handleClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default CreateConsultaModal;