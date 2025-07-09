import { useState, useEffect } from "react";
import * as S from "../patient/createPatientModal/CreatePatientModal.style";
import { useSnackbar } from 'notistack';
import { updateManutencao } from "../../../api/services/ManutencaoService";
import { Manutencao } from "../../../api/types/manutencao";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  manutencao: Manutencao | null;
};

function EditManutencaoModal({ isOpen, onClose, onSuccess, manutencao }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ data_hora: '', duracao: '', price: 0 });

  useEffect(() => {
    if (manutencao) {
        // Formata a data para o input datetime-local
      const data = new Date(manutencao.data_hora);
      // Corrige para UTC-3 (ajustando 3 horas)
      data.setHours(data.getHours() - 3);

      // Formata para input datetime-local
      const dataHora = data.toISOString().slice(0, 16);
      setForm({ data_hora: dataHora, duracao: manutencao.duracao, price: manutencao.price });
    }
  }, [manutencao]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!manutencao) return;
    try {
      await updateManutencao(manutencao.id, form);
      enqueueSnackbar('Manutenção atualizada com sucesso!', { variant: 'success' });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao atualizar manutenção.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;
  
  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Editar Manutenção</S.Title>
        <S.FormContainer>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="data_hora">Data e Hora</S.Label>
            <S.Input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} />
          </S.FieldWrapper>
          <S.FieldWrapper style={{ width: "48%" }}>
            <S.Label htmlFor="duracao">Duração</S.Label>
            <S.MaskedInput mask="00:00:00" name="duracao" value={form.duracao} onAccept={(value: any) => setForm(prev => ({ ...prev, duracao: value }))} />
          </S.FieldWrapper>
           <S.FieldWrapper style={{ width: "48%" }}>
              <S.Label htmlFor="price">Preço *</S.Label>
              <S.Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Preço" />
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

export default EditManutencaoModal;