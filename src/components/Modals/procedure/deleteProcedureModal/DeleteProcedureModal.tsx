import * as S from "./DeleteProcedureModal.style";
import { useSnackbar } from 'notistack';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  procedure: {
    id: number;
    name: string;
  };
};

function DeleteProcedureModal({ isOpen, onClose, procedure }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      // TODO: Implement backend integration
      console.log("Deletando procedimento:", procedure);
      enqueueSnackbar('Procedimento excluído com sucesso!', { 
        variant: 'success', 
        autoHideDuration: 4000, 
        TransitionProps: { direction: 'down' }, 
        anchorOrigin: { vertical: 'top', horizontal: 'center' } 
      });
      onClose();
    } catch (error) {
      console.error("Erro ao excluir procedimento:", error);
      enqueueSnackbar('Não foi possível excluir o procedimento.', { 
        variant: 'error', 
        autoHideDuration: 4000, 
        TransitionProps: { direction: 'down' }, 
        anchorOrigin: { vertical: 'top', horizontal: 'center' } 
      });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Excluir Procedimento</S.Title>
        <S.Message>
          Tem certeza que deseja excluir o procedimento "{procedure.name}"?
        </S.Message>
        <S.Warning>
          Esta ação não pode ser desfeita.
        </S.Warning>
        <S.ButtonGroup>
          <S.DeleteButton onClick={handleDelete}>Excluir</S.DeleteButton>
          <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default DeleteProcedureModal; 