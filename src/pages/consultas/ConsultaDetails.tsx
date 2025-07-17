import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as S from "../../components/Containers/ContainerDetails.style";
import EditConsultaModal from "../../components/Modals/consulta/EditConsultaModal";
import DeleteConsultaModal from "../../components/Modals/consulta/DeleteConsultaModal";
import { getConsultaById } from "../../api/services/ConsultaService";
import { Consulta } from "../../api/types/consulta";

const ConsultaDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [consulta, setConsulta] = useState<Consulta | null>(null);
    const [dataHoraFormatada, setDataHoraFormatada] = useState("");
    const [dataHoraFimFormatada, setDataHoraFimFormatada] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchConsulta = useCallback(async () => {
        if (!id) return;
        try {
            const response = await getConsultaById(id);
            setConsulta(response.data);
            setDataHoraFormatada(new Date(response.data.data_hora).toLocaleString('pt-BR'));
            setDataHoraFimFormatada(new Date(response.data.data_hora_fim).toLocaleString('pt-BR'));

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
                    <S.Title>📅 Consulta Agendada</S.Title>

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
                        <S.Label>Data e Hora:</S.Label><S.Value>{dataHoraFormatada}</S.Value>
                        <S.Label>Duração:</S.Label><S.Value>{" "}
                            {consulta.duracao && consulta.duracao.length === 8
                                ? consulta.duracao.slice(0, 5)
                                : consulta.duracao}</S.Value>
                        <S.Label>Horário de Fim:</S.Label><S.Value>{dataHoraFimFormatada}</S.Value>
                        <S.Label>Motivo:</S.Label><S.Value>{consulta.motivo}</S.Value>
                    </S.InfoGrid>
                    </S.InfoSection>
                </S.DescriptionArea>
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