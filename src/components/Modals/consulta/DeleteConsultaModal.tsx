import * as S from "../patient/deletePatientModal/DeletePatientModal.style";
import { useSnackbar } from 'notistack';
import { deleteConsulta } from "../../../api/services/ConsultaService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  consultaId: number | null;
};

function DeleteConsultaModal({ isOpen, onClose, onSuccess, consultaId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!consultaId) return;
    try {
      await deleteConsulta(consultaId);
      enqueueSnackbar('Consulta excluída com sucesso!', { variant: 'success' });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao excluir consulta.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Excluir Consulta</S.Title>
        <S.Description>Deseja realmente excluir esta consulta?<br/>Esta ação é irreversível!</S.Description>
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default DeleteConsultaModal;