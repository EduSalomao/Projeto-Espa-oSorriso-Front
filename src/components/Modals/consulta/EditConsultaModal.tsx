import { useState, useEffect } from "react";
import * as S from "../Modal.styles.ts";
import { useSnackbar } from 'notistack';
import { updateConsulta } from "../../../api/services/ConsultaService";
import { Consulta } from "../../../api/types/consulta";
import { Dentista } from "../../../api/types/dentista.ts";
import { Paciente } from "../../../api/types/paciente.ts";
import { Procedimento } from "../../../api/types/procedimento.ts";
import { PacienteAutocomplete } from "../patient/PacienteAutocomplete.tsx";
import { DentistaAutocomplete } from "../dentist/DentistAutocomplete.tsx";
import { ProcedimentoMultiAutocomplete } from "../procedimento/ProcedimentoMultiAutocomplete.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  consulta: Consulta | null;
};

function EditConsultaModal({ isOpen, onClose, onSuccess, consulta }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    paciente: null as Paciente | null,
    dentista: null as Dentista | null,
    data_hora: '',
    duracao: '',
    motivo: '',
    procedimentos: [] as Procedimento[]
  });

  useEffect(() => {
    if (consulta) {
      const data = new Date(consulta.data_hora);
      // Ajuste para o fuso horário local antes de formatar
      const offset = data.getTimezoneOffset();
      const adjustedDate = new Date(data.getTime() - (offset*60*1000));
      const dataHoraLocal = adjustedDate.toISOString().slice(0, 16);

      setForm({
        data_hora: dataHoraLocal,
        duracao: consulta.duracao.substring(0, 5),
        motivo: consulta.motivo,
        paciente: { id: consulta.id_paciente, name: consulta.paciente_nome, cpf: consulta.paciente_cpf } as Paciente,
        dentista: { id: consulta.id_dentista, name: consulta.dentista_nome, cro: consulta.dentista_cro } as Dentista,
        procedimentos: consulta.procedimentos.map(p => ({
            id: p.id,
            name: p.nome, // Corrigido para 'p.nome' que vem da API
            ...p
        })) || []
      });
    }
  }, [consulta]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'dentista') {
      setForm(prev => ({ ...prev, procedimentos: [], [name]: value }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!consulta || !form.paciente || !form.dentista) return;
    try {
      await updateConsulta(consulta.id, {
        id_paciente: form.paciente.id,
        id_dentista: Number(form.dentista.id),
        data_hora: form.data_hora,
        duracao: `${form.duracao}:00`,
        motivo: form.motivo,
        procedimentos: form.procedimentos.map(p => p.id)
      });
      enqueueSnackbar('Consulta atualizada com sucesso!', { variant: 'success' });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao atualizar consulta.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.DateTimePickerStyle />
      <S.Container>
        <S.Title>Editar Consulta</S.Title>
        <S.FormContainer>
          <PacienteAutocomplete value={form.paciente} onChangeForm={handleChange} name="paciente" />
          <DentistaAutocomplete value={form.dentista} onChangeForm={handleChange} name="dentista" />
          <ProcedimentoMultiAutocomplete
            value={form.procedimentos}
            onChangeForm={handleChange}
            dentistaId={form.dentista ? Number(form.dentista.id) : null}
            name="procedimentos"
          />
          <S.FieldWrapper style={{ width: "48%", marginTop: "1rem" }}>
            <S.Label htmlFor="data_hora">Data e Hora</S.Label>
            <S.Input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%", marginTop: "1rem" }}>
            <S.Label htmlFor="duracao">Duração</S.Label>
            <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "100%", marginTop: "1rem" }}>
            <S.Label htmlFor="motivo">Motivo *</S.Label>
            <S.Input as="textarea" name="motivo" value={form.motivo} onChange={handleChange} />
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

export default EditConsultaModal;