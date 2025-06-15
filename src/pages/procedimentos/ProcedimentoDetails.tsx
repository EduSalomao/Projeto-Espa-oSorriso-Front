// src/pages/procedimentos/ProcedimentoDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as S from "../../components/Containers/ContainerDetails.style";
import EditProcedimentoModal from "../../components/Modals/procedimento/EditProcedimentoModal";
import DeleteProcedimentoModal from "../../components/Modals/procedimento/DeleteProcedimentoModal";
import { getProcedimentoById } from "../../api/services/ProcedimentoService";
import { Procedimento } from "../../api/types/procedimento";
import { useSnackbar } from "notistack";

const ProcedimentoDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [procedimento, setProcedimento] = useState<Procedimento | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchProcedimento = useCallback(async () => {
        if (!id) return;
        try {
            const response = await getProcedimentoById(id);
            setProcedimento(response.data);
        } catch (error) {
            console.error("Erro ao buscar procedimento:", error);
            enqueueSnackbar("Procedimento não encontrado.", { variant: "error" });
            navigate("/procedimentos");
        }
    }, [id, navigate, enqueueSnackbar]);

    console.log("Procedimento Details:", procedimento);
    useEffect(() => {
        fetchProcedimento();
    }, [fetchProcedimento]);
    
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        fetchProcedimento();
    };
    
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        navigate('/procedimentos');
    }

    if (!procedimento) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <S.ContainerDetails>
                <S.ContainerAside>
                    <S.DescriptionArea>
                        <S.Title>{procedimento.name}</S.Title>
                        <S.Data><strong>Tipo:</strong> {procedimento.tipo}</S.Data>
                        <S.Data><strong>Duração:</strong> {procedimento.duracao} (HH:MM)</S.Data>
                        <S.Data><strong>Custo:</strong> R$ {procedimento.custo.toFixed(2)}</S.Data>
                        <S.Data><strong>Categoria:</strong> {procedimento.categoria || 'Não informada'}</S.Data>
                        <S.Data><strong>Descrição:</strong> {procedimento.descricao || 'Não informada'}</S.Data>
                        <S.Data><strong>Observações:</strong> {procedimento.observacoes || 'Nenhuma'}</S.Data>
                    </S.DescriptionArea>
                     <S.ContainerOptions>
                        <S.ContainerOptionsMenu>
                            <S.OptionsMenu selected={true}>Dentistas que realizam</S.OptionsMenu>
                        </S.ContainerOptionsMenu>
                        <S.Line/>
                        <S.ContentOptionsMenu>
                            {procedimento.dentistas && procedimento.dentistas.length > 0 ? (
                                procedimento.dentistas.map(dentista => (
                                    <S.ContentSetOptionsMenu key={dentista.id}>
                                        <S.ContentTitleOptionsMenu>{dentista.name}</S.ContentTitleOptionsMenu>
                                        <S.ContentDescriptionOptionsMenu>CRO: {dentista.cro}</S.ContentDescriptionOptionsMenu>
                                    </S.ContentSetOptionsMenu>
                                ))
                            ) : (
                                <S.ContentDescriptionOptionsMenu>Nenhum dentista vinculado.</S.ContentDescriptionOptionsMenu>
                            )}
                        </S.ContentOptionsMenu>
                    </S.ContainerOptions>
                </S.ContainerAside>
                <S.SidebarButtons>
                    <S.ActionButton onClick={() => setIsEditModalOpen(true)}>Editar</S.ActionButton>
                    <S.ActionButton onClick={() => setIsDeleteModalOpen(true)}>Excluir</S.ActionButton>
                </S.SidebarButtons>
            </S.ContainerDetails>

            <EditProcedimentoModal 
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                procedimento={procedimento}
            />
            <DeleteProcedimentoModal 
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                procedimentoId={procedimento.id}
            />
        </>
    );
};

export default ProcedimentoDetails;