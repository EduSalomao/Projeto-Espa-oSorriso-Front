import React from 'react';
import { useSnackbar } from 'notistack';
import * as S from "../patient/deletePatientModal/DeletePatientModal.style"; // Importando o estilo correto
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
      onSuccess();
    } catch (error: any) {
      console.error("Falha ao excluir consulta:", error);
      const errorMessage = error?.response?.data?.error || error?.message || 'Erro ao excluir consulta.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Excluir Consulta</S.Title>
        <S.Description>
          Deseja realmente excluir esta consulta?
          <br/>
          Esta ação é irreversível!
        </S.Description>
        <S.ButtonGroup>
          <S.Button onClick={handleDelete}>Excluir</S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default DeleteConsultaModal;