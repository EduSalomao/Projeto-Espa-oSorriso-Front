import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as S from "../../components/Containers/ContainerDetails.style";
import EditManutencaoModal from "../../components/Modals/manutencao/EditManutencaoModal";
import DeleteManutencaoModal from "../../components/Modals/manutencao/DeleteManutencaoModal";
import { getManutencaoById } from "../../api/services/ManutencaoService";
import { Manutencao } from "../../api/types/manutencao";

const ManutencaoDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [manutencao, setManutencao] = useState<Manutencao | null>(null);
    const [dataHoraFormatada, setDataHoraFormatada] = useState("");
    const [dataHoraFimFormatada, setDataHoraFimFormatada] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchManutencao = useCallback(async () => {
        if (!id) return;
        try {
            const response = await getManutencaoById(id);
            setManutencao(response.data);
            setDataHoraFormatada(new Date(response.data.data_hora).toLocaleString('pt-BR'));
            setDataHoraFimFormatada(new Date(response.data.data_hora_fim).toLocaleString('pt-BR'));

        } catch (error) {
            console.error("Erro ao buscar manutenção:", error);
            navigate("/manutencoes");
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchManutencao();
    }, [fetchManutencao]);

    if (!manutencao) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <S.ContainerDetails>
                <S.ContainerAside>
                    <S.DescriptionArea>
                        <S.Title>Manutenção Agendada</S.Title>
                        <S.InfoGrid>
                            <S.Label>Paciente:</S.Label> <S.Value>{manutencao.paciente_nome}</S.Value>
                            <S.Label>CPF Paciente:</S.Label> <S.Value>{manutencao.paciente_cpf}</S.Value>
                            <S.Label>Dentista:</S.Label> <S.Value>{manutencao.dentista_nome}</S.Value>
                            <S.Label>CRO Dentista:</S.Label> <S.Value>{manutencao.dentista_cro}</S.Value>
                            <S.Label>Data e Hora:</S.Label> <S.Value>{dataHoraFormatada}</S.Value>
                            <S.Label>Duração:</S.Label> <S.Value>{manutencao.duracao}</S.Value>
                            <S.Label>Horário de Fim:</S.Label> <S.Value>{dataHoraFimFormatada}</S.Value>
                        </S.InfoGrid>
                    </S.DescriptionArea>
                </S.ContainerAside>
                <S.SidebarButtons>
                    <S.ActionButton onClick={() => setIsEditModalOpen(true)}>Editar</S.ActionButton>
                    <S.ActionButton onClick={() => setIsDeleteModalOpen(true)}>Excluir</S.ActionButton>
                </S.SidebarButtons>
            </S.ContainerDetails>

            <EditManutencaoModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={fetchManutencao}
                manutencao={manutencao}
            />
            <DeleteManutencaoModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onSuccess={() => navigate('/manutencoes')}
                manutencaoId={manutencao.id}
            />
        </>
    );
};

export default ManutencaoDetails;