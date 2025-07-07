import { useState } from "react";
import * as S from "../Modal.styles.ts";
import { useSnackbar } from 'notistack';
import { createManutencao } from "../../../api/services/ManutencaoService";
import { DentistaAutocomplete } from "../dentist/DentistAutocomplete";
import { PacienteAutocomplete } from "../patient/PacienteAutocomplete";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

function CreateManutencaoModal({ isOpen, onClose, onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    id_paciente: '',
    id_dentista: '',
    data_hora: '',
    duracao: '01:00' // Valor padrão
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    console.log("Form data:", form);
  const handleSave = async () => {
    if (!form.id_paciente || !form.id_dentista || !form.data_hora || !form.duracao) {
      enqueueSnackbar('Preencha todos os campos obrigatórios.', { variant: 'warning' });
      return;
    }
    
    try {
      await createManutencao({
        ...form,
        id_paciente: Number(form.id_paciente.id),
        id_dentista: Number(form.id_dentista.id),
        duracao: `${form.duracao}:00`
      });
      enqueueSnackbar('Manutenção cadastrada com sucesso!', { variant: 'success' });
      setForm({
        id_paciente: '',
        id_dentista: '',
        data_hora: '',
        duracao: '01:00' // Resetando para o valor padrão
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao cadastrar manutenção.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;
  
  return (
    
    <S.ModalOverlay>
      <S.DateTimePickerStyle />
      <S.Container>
        <S.Title>Nova Manutenção</S.Title>
        <S.FormContainer>
          {/* <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="id_paciente">ID do Paciente *</S.Label>
            <S.Input name="id_paciente" type="number" value={form.id_paciente} onChange={handleChange} placeholder="ID do Paciente" />
          </S.FieldWrapper> */}
          <PacienteAutocomplete
            value={form.id_paciente}
            onChangeForm={handleChange}
            name="id_paciente"
          />
          {/* <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="id_dentista">ID do Dentista *</S.Label>
            <S.Input name="id_dentista" type="number" value={form.id_dentista} onChange={handleChange} placeholder="ID do Dentista" />
          </S.FieldWrapper> */}
          <DentistaAutocomplete value={form.id_dentista} onChangeForm={handleChange} name="id_dentista"/>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="data_hora">Data e Hora *</S.Label>
            <S.Input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="duracao">Duração *</S.Label>
            <S.MaskedInput mask="00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
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

export default CreateManutencaoModal;