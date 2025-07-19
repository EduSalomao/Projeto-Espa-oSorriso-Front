import React from 'react';
import { useSnackbar } from 'notistack';
import * as S from '../Modal.styles';
import { deleteConsulta } from '../../../api/services/ConsultaService';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  consultaId: number | null;
};

const DeleteConsultaModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, consultaId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!consultaId) {
        enqueueSnackbar('ID da consulta inválido.', { variant: 'error' });
        return;
    }

    try {
      await deleteConsulta(consultaId);
      enqueueSnackbar('Consulta excluída com sucesso!', { variant: 'success' });
      onSuccess(); // Chama a função de sucesso que fará a navegação
    } catch (error: any) {
      console.error("Falha ao excluir consulta:", error);
      const errorMessage = error?.response?.data?.error || error?.message || 'Erro ao excluir consulta.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      onClose(); // Fecha o modal independentemente do resultado
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Confirmar Exclusão</S.Title>
        <p style={{ fontFamily: 'var(--font-roboto)', fontSize: '18px', textAlign: 'center' }}>
          Tem certeza de que deseja excluir esta consulta? <br/>
          Esta ação não pode ser desfeita.
        </p>
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
};

export default DeleteConsultaModal;