import * as S from "../patient/deletePatientModal/DeletePatientModal.style";
import { useSnackbar } from 'notistack';
import { deleteManutencao } from "../../../api/services/ManutencaoService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  manutencaoId: number | null;
};

function DeleteManutencaoModal({ isOpen, onClose, onSuccess, manutencaoId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!manutencaoId) return;
    try {
      await deleteManutencao(manutencaoId);
      enqueueSnackbar('Manutenção excluída com sucesso!', { variant: 'success' });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Erro ao excluir manutenção.", { variant: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Excluir Manutenção</S.Title>
        <S.Description>Deseja realmente excluir esta manutenção?<br/>Esta ação é irreversível!</S.Description>
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default DeleteManutencaoModal;