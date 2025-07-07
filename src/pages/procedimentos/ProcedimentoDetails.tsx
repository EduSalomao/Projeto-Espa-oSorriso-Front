// src/pages/procedimentos/ProcedimentoDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as S from "../../components/Containers/ContainerDetails.style";
import EditProcedimentoModal from "../../components/Modals/procedimento/EditProcedimentoModal";
import DeleteProcedimentoModal from "../../components/Modals/procedimento/DeleteProcedimentoModal";
import { getProcedimentoById } from "../../api/services/ProcedimentoService";
import { Procedimento } from "../../api/types/procedimento";
import { useSnackbar } from "notistack";
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from "../../components/Containers/Table.style";

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
            if (!response.data) {
                throw new Error("Procedimento não encontrado");
            }
            
            const rawDuracao = response.data.duracao || "00:00";
            response.data.duracao = rawDuracao.length === 8 ? rawDuracao.slice(0, 5) : rawDuracao;

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
                        <S.Title>🔬 {procedimento.name}</S.Title>
                        <S.InfoSection>
                            <S.SectionTitle>📒 Informações</S.SectionTitle>
                                <S.InfoGrid>
                                    <S.Label>Tipo:</S.Label><S.Value>{procedimento.tipo}</S.Value>
                                    <S.Label>Duração:</S.Label><S.Value>{procedimento.duracao}</S.Value>
                                    <S.Label>Custo:</S.Label><S.Value>R$ {procedimento.custo.toFixed(2)}</S.Value>
                                    <S.Label>Categoria:</S.Label><S.Value>{procedimento.categoria || 'Não informada'}</S.Value>
                                    <S.Label>Descrição:</S.Label><S.Value>{procedimento.descricao || 'Não informada'}</S.Value>
                                    <S.Label>Observações:</S.Label><S.Value>{procedimento.observacoes || 'Nenhuma'}</S.Value>
                                </S.InfoGrid>
                        </S.InfoSection>
                    </S.DescriptionArea>
                     <S.ContainerOptions>
                        <S.ContainerOptionsMenu>
                            <S.OptionsMenu selected={true}>Dentistas que realizam</S.OptionsMenu>
                        </S.ContainerOptionsMenu>
                        <S.Line/>
                        <S.ContentOptionsMenu>
                            {procedimento.dentistas && procedimento.dentistas.length > 0 ? (
                                <TableWrapper>
                                    <Table>
                                    <Thead>
                                        <Th first>Nome</Th>
                                        <Th>CRO</Th>
                                        <th>Horario Disponível</th>
                                    </Thead>
                                    <Tbody>
                                        {procedimento.dentistas.map(den => (
                                        <Tr onClick={() => navigate(`/dentistas/${den.id}`)} key={den.id}>
                                            <Td>{den.name}</Td>
                                            <Td>{den.cro}</Td>
                                            <Td>{den.working_hours}</Td>

                                        </Tr>
                                        ))}
                                    </Tbody>
                                    </Table>
                                </TableWrapper>
                                
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