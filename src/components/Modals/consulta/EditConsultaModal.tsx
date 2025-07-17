import { useState, useEffect } from "react";
import * as S from "../patient/createPatientModal/CreatePatientModal.style";
import { useSnackbar } from 'notistack';
import { updateConsulta } from "../../../api/services/ConsultaService";
import { Consulta } from "../../../api/types/consulta";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  consulta: Consulta | null;
};

function EditConsultaModal({ isOpen, onClose, onSuccess, consulta }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ data_hora: '', duracao: '', motivo: '' });

  useEffect(() => {
    if (consulta) {
      const data = new Date(consulta.data_hora);
      data.setHours(data.getHours() - 3);

      const dataHora = data.toISOString().slice(0, 16);
      setForm({ data_hora: dataHora, duracao: consulta.duracao, motivo: consulta.motivo });
    }
  }, [consulta]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!consulta) return;
    try {
      await updateConsulta(consulta.id, form);
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
      <S.Container>
        <S.Title>Editar Consulta</S.Title>
        <S.FormContainer>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="data_hora">Data e Hora</S.Label>
            <S.Input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="duracao">Duração</S.Label>
            <S.MaskedInput mask="00:00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
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

export default EditConsultaModal;