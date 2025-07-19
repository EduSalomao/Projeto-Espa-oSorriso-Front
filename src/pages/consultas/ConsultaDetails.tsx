// src/pages/consultas/ConsultaDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as S from "../../components/Containers/ContainerDetails.style";
import EditConsultaModal from "../../components/Modals/consulta/EditConsultaModal";
import DeleteConsultaModal from "../../components/Modals/consulta/DeleteConsultaModal";
import { getConsultaById } from "../../api/services/ConsultaService";
import { Consulta } from "../../api/types/consulta";
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from "../../components/Containers/Table.style";

const ConsultaDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [consulta, setConsulta] = useState<Consulta | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchConsulta = useCallback(async () => {
        if (!id) return;
        try {
            const response = await getConsultaById(id);
            setConsulta(response.data);
        } catch (error) {
            console.error("Erro ao buscar consulta:", error);
            navigate("/consultas");
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchConsulta();
    }, [fetchConsulta]);

    if (!consulta) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <S.ContainerDetails>
                <S.ContainerAside>
                <S.DescriptionArea>
                    <S.Title>📄 Detalhes da Consulta</S.Title>
                    <S.InfoSection>
                        <S.SectionTitle>👤 Paciente</S.SectionTitle>
                        <S.InfoGrid>
                            <S.Label>Nome:</S.Label><S.Value>{consulta.paciente_nome}</S.Value>
                            <S.Label>CPF:</S.Label><S.Value>{consulta.paciente_cpf}</S.Value>
                        </S.InfoGrid>
                    </S.InfoSection>
                    <S.InfoSection>
                        <S.SectionTitle>🧑‍⚕️ Dentista</S.SectionTitle>
                        <S.InfoGrid>
                            <S.Label>Nome:</S.Label><S.Value>{consulta.dentista_nome}</S.Value>
                            <S.Label>CRO:</S.Label><S.Value>{consulta.dentista_cro}</S.Value>
                        </S.InfoGrid>
                    </S.InfoSection>
                    <S.InfoSection>
                        <S.SectionTitle>📅 Consulta</S.SectionTitle>
                        <S.InfoGrid>
                            <S.Label>Data e Hora:</S.Label><S.Value>{new Date(consulta.data_hora).toLocaleString('pt-BR')}</S.Value>
                            <S.Label>Duração:</S.Label><S.Value>{consulta.duracao?.slice(0, 5)}</S.Value>
                            <S.Label>Data e Hora Fim:</S.Label><S.Value>{new Date(consulta.data_hora_fim).toLocaleString('pt-BR')}</S.Value>
                            <S.Label>Motivo:</S.Label><S.Value>{consulta.motivo}</S.Value>
                        </S.InfoGrid>
                    </S.InfoSection>
                </S.DescriptionArea>
                 <S.ContainerOptions>
                    <S.ContainerOptionsMenu>
                        <S.OptionsMenu selected={true}>Procedimentos</S.OptionsMenu>
                    </S.ContainerOptionsMenu>
                    <S.Line/>
                    <S.ContentOptionsMenu>
                        {consulta.procedimentos && consulta.procedimentos.length > 0 ? (
                            <TableWrapper>
                                <Table>
                                    <Thead>
                                        <Th first>Nome</Th>
                                        <Th>Tipo</Th>
                                        <Th>Categoria</Th>
                                    </Thead>
                                    <Tbody>
                                        {consulta.procedimentos.map(proc => (
                                        <Tr onClick={() => navigate(`/procedimentos/${proc.id}`)} key={proc.id}>
                                            <Td>{proc.nome}</Td>
                                            <Td>{proc.tipo}</Td>
                                            <Td>{proc.categoria || 'N/A'}</Td>
                                        </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableWrapper>
                        ) : (
                            <S.ContentDescriptionOptionsMenu>Nenhum procedimento vinculado.</S.ContentDescriptionOptionsMenu>
                        )}
                    </S.ContentOptionsMenu>
                </S.ContainerOptions>
                </S.ContainerAside>
                <S.SidebarButtons>
                    <S.ActionButton onClick={() => setIsEditModalOpen(true)}>Editar</S.ActionButton>
                    <S.ActionButton onClick={() => setIsDeleteModalOpen(true)}>Excluir</S.ActionButton>
                </S.SidebarButtons>
            </S.ContainerDetails>

            <EditConsultaModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={fetchConsulta}
                consulta={consulta}
            />
            <DeleteConsultaModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onSuccess={() => navigate('/consultas')}
                consultaId={consulta.id}
            /> 
        </>
    );
};

export default ConsultaDetails;