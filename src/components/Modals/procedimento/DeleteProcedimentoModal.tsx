// src/components/Modals/procedimento/DeleteProcedimentoModal.tsx
import * as S from "../patient/deletePatientModal/DeletePatientModal.style";
import { useSnackbar } from 'notistack';
import { deleteProcedimento } from "../../../api/services/ProcedimentoService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  procedimentoId: number | null;
};

function DeleteProcedimentoModal({ isOpen, onClose, procedimentoId }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  console.log("Procedimento ID:", procedimentoId);
  const handleDelete = async () => {
    if (!procedimentoId) return;
    try {
      await deleteProcedimento(procedimentoId);
      
      enqueueSnackbar('Procedimento excluído com sucesso!', { variant: 'success' });
      onClose();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Erro ao excluir procedimento.";
      if (errorMessage.includes("vinculado a orçamentos")) {
        enqueueSnackbar("Este procedimento está vinculado a orçamentos e não pode ser excluído!", { variant: 'error' });
      } else {
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Excluir Procedimento</S.Title>
        <S.Description>Deseja realmente excluir este procedimento?<br/>Esta ação é irreversível!</S.Description>
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default DeleteProcedimentoModal;