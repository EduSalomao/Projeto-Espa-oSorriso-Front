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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchManutencao = useCallback(async () => {
        if (!id) return;
        try {
            const response = await getManutencaoById(id);
            setManutencao(response.data);
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
                        <S.Data><strong>Paciente:</strong> {manutencao.paciente_nome}</S.Data>
                        <S.Data><strong>CPF Paciente:</strong> {manutencao.paciente_cpf}</S.Data>
                        <S.Data><strong>Dentista:</strong> {manutencao.dentista_nome}</S.Data>
                        <S.Data><strong>CRO Dentista:</strong> {manutencao.dentista_cro}</S.Data>
                        <S.Data><strong>Data e Hora:</strong> {new Date(manutencao.data_hora).toLocaleString('pt-BR')}</S.Data>
                        <S.Data><strong>Duração:</strong> {manutencao.duracao}</S.Data>
                        <S.Data><strong>Horário de Fim:</strong> {new Date(manutencao.data_hora_fim).toLocaleString('pt-BR')}</S.Data>
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