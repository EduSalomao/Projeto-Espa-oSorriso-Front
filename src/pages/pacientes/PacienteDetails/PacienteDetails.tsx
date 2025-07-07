import {ContentSetOptionsMenu, ContentOptionsMenu, ContentDescriptionOptionsMenu, ContentTitleOptionsMenu, Line, ContainerOptionsMenu, OptionsMenu, DescriptionArea, Title, Data, ContainerDetails, ContainerAside, ContainerOptions, SidebarButtons, ActionButton } from "../../../components/Containers/ContainerDetails.style";
import DeletePacientModal from "../../../components/Modals/patient/deletePatientModal/DeletePatientModal";
import EditPacientModal from "../../../components/Modals/patient/editPatientModal/EditPatientModal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import { getManutencoes } from "../../../api/services/ManutencaoService";
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from "../../../components/Containers/Table.style";



const PacienteDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id da URL
    const [paciente, setPaciente] = useState({id: "", name: "", phone: "", cpf: "", birthdate: "", address: ""});

    const [selectedTab, setSelectedTab] = useState<"consultas" | "procedimentos" | "fichaClinica" | "anamnese" | "orcamentos" | "manutencoes">("consultas");
    const [manutencoes, setManutencoes] = useState([]);
    const [loadingManutencoes, setLoadingManutencoes] = useState(false);

    const handleTabChange = async (tab) => {
            setSelectedTab(tab);
            if (tab === "manutencoes") {
                setLoadingManutencoes(true);
                try {
                    const resp = await getManutencoes({ idPaciente: id });
                    console.log(resp.data.manutencoes)
                    for (const m of resp.data.manutencoes) {
                        m.data_hora = new Date(m.data_hora).toLocaleString("pt-BR", {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                    setManutencoes(resp.data.manutencoes); // ajuste conforme resposta da sua API
                    console.log("Dados das manutenções:", manutencoes);
                    console.log("Dados das manutenções resp:", resp.data.manutencoes);
                } catch (err) {
                    setManutencoes([]);
                }
                setLoadingManutencoes(false);

            }
        };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
    const handleCloseDeleteModal = (isDeleted) => {
        console.log("Teste2" + isDeleted)
        setIsDeleteModalOpen(false);
        if (isDeleted) {
            // Redirecionar ou fazer algo após a exclusão
            navigate(`/pacientes`);
        }
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = (isUpdated, paciente) => {
        if(isUpdated) {
            setPaciente(paciente);
        }
        setIsEditModalOpen(false)
    };

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/pacientes/${id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Erro ao buscar paciente");
                }
                data.birthdate = new Date(data.birthdate).toLocaleDateString("pt-BR");
                setPaciente(data);
            } catch (error) {
                console.error("Erro ao buscar paciente:", error);
            }
        };

        if (id) {
            fetchPaciente();
        }
    }, [id]);

    return (
    <ContainerDetails>
        <ContainerAside>
            <DescriptionArea>
                <Title>{paciente.name}</Title>
                <Data>Telefone: {paciente.phone}</Data>
                <Data>CPF: {paciente.cpf}</Data>
                <Data>Data de Nascimento: {paciente.birthdate}</Data>
                <Data>Endereço: {paciente.address}</Data>
            </DescriptionArea>
            <ContainerOptions>
                <ContainerOptionsMenu>
                    <OptionsMenu selected={selectedTab === "fichaClinica"} onClick={() => handleTabChange("fichaClinica")}>Ficha Clínica</OptionsMenu>
                    <OptionsMenu selected={selectedTab === "anamnese"} onClick={() => handleTabChange("anamnese")}>Anamnese</OptionsMenu>
                    <OptionsMenu selected={selectedTab === "orcamentos"} onClick={() => handleTabChange("orcamentos")}>Orçamentos</OptionsMenu>
                    <OptionsMenu selected={selectedTab === "consultas"} onClick={() => handleTabChange("consultas")}>Consultas</OptionsMenu>
                    <OptionsMenu selected={selectedTab === "manutencoes"} onClick={() => handleTabChange("manutencoes")}>Manutenções</OptionsMenu>
                </ContainerOptionsMenu>
                <Line/>
                <ContentOptionsMenu>
                    {selectedTab === "consultas" && (
                        <>
                            <ContentSetOptionsMenu>
                                <ContentTitleOptionsMenu>Próximas Consultas</ContentTitleOptionsMenu>
                                <ContentDescriptionOptionsMenu>Não há nenhum agendamento</ContentDescriptionOptionsMenu>
                            </ContentSetOptionsMenu>
                            <ContentSetOptionsMenu>
                                <ContentTitleOptionsMenu>Histórico de Consultas</ContentTitleOptionsMenu>
                                <ContentDescriptionOptionsMenu>Não há nenhum agendamento</ContentDescriptionOptionsMenu>
                            </ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "anamnese" && (
                        <>
                            <ContentSetOptionsMenu>
                                <ContentTitleOptionsMenu>Perguntas e Respostas</ContentTitleOptionsMenu>
                                <ContentDescriptionOptionsMenu>Não disponível</ContentDescriptionOptionsMenu>
                            </ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "fichaClinica" && (
                        <>
                            <ContentSetOptionsMenu>
                                <ContentTitleOptionsMenu>Informações</ContentTitleOptionsMenu>
                                <ContentDescriptionOptionsMenu>Não disponível</ContentDescriptionOptionsMenu>
                            </ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "orcamentos" && (
                        <>
                            <ContentSetOptionsMenu>
                                <ContentTitleOptionsMenu>Orçamentos realzados</ContentTitleOptionsMenu>
                                <ContentDescriptionOptionsMenu>Não há nenhum orçamento</ContentDescriptionOptionsMenu>
                            </ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "manutencoes" && (
                        <ContentSetOptionsMenu style={{ width: "100%", marginLeft: "0px" }} >
                        {loadingManutencoes ? (
                            <ContentDescriptionOptionsMenu>Carregando...</ContentDescriptionOptionsMenu>
                        ) : manutencoes.length === 0 ? (
                            <ContentDescriptionOptionsMenu>Nenhuma manutenção associada.</ContentDescriptionOptionsMenu>
                        ) : (
                            <TableWrapper>
                                <Table>
                                <Thead>
                                    <Th first>Data e Hora</Th>
                                    <Th>Duração</Th>
                                    <Th>Dentista</Th>
                                </Thead>
                                <Tbody>
                                    {manutencoes.map(man => (
                                    <Tr onClick={() => navigate(`/manutencoes/${man.id}`)} key={man.id}>
                                        <Td>{man.data_hora}</Td>
                                        <Td>{man.duracao}</Td>
                                        <Td>{man.dentista_nome}</Td>
                                    </Tr>
                                    ))}
                                </Tbody>
                                </Table>
                            </TableWrapper>
                        )}
                        </ContentSetOptionsMenu>
                    )}
                    
                    
                </ContentOptionsMenu>
            </ContainerOptions>
            
        </ContainerAside>
        <SidebarButtons>
            <ActionButton onClick={handleOpenEditModal}>Editar</ActionButton>
            <ActionButton onClick={handleOpenDeleteModal}>Excluir</ActionButton>
        </SidebarButtons>
        {/* Modal de Cadastro */}
        <DeletePacientModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
        {/* Modal de Cadastro */}
        <EditPacientModal paciente={paciente} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />

      
    </ContainerDetails>
    );
}


export default PacienteDetails;