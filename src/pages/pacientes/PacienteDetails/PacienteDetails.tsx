import * as S from "../../../components/Containers/ContainerDetails.style";
import DeletePacientModal from "../../../components/Modals/patient/deletePatientModal/DeletePatientModal";
import EditPacientModal from "../../../components/Modals/patient/editPatientModal/EditPatientModal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import { getManutencoes } from "../../../api/services/ManutencaoService";
import { getConsultas } from "../../../api/services/ConsultaService";
import { Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from "../../../components/Containers/Table.style";



const PacienteDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id da URL
    const [paciente, setPaciente] = useState({id: "", name: "", phone: "", cpf: "", birthdate: "", address: ""});

    const [selectedTab, setSelectedTab] = useState<"consultas" | "procedimentos" | "fichaClinica" | "anamnese" | "orcamentos" | "manutencoes">("consultas");
    const [manutencoes, setManutencoes] = useState([]);
    const [loadingManutencoes, setLoadingManutencoes] = useState(false);
    const [consultas, setConsultas] = useState([]);
    const [loadingConsultas, setLoadingConsultas] = useState(false);


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
            if (tab === "consultas") {
                setLoadingConsultas(true);
                try {
                    const resp = await getConsultas({ idPaciente: id });
                    for (const c of resp.data.consultas) {
                        c.data_hora = new Date(c.data_hora).toLocaleString("pt-BR", {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                    setConsultas(resp.data.consultas);
                } catch (err) {
                    setConsultas([]);
                }
                setLoadingConsultas(false);
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
                };
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
    <S.ContainerDetails>
        <S.ContainerAside>
            <S.DescriptionArea>
                <S.Title>👤 {paciente.name}</S.Title>
                <S.InfoSection>
                    <S.SectionTitle>📒 Informações</S.SectionTitle>
                        <S.InfoGrid>
                            <S.Label>Telefone:</S.Label><S.Value>{paciente.phone}</S.Value>
                            <S.Label>CPF:</S.Label><S.Value>{paciente.cpf}</S.Value>
                            <S.Label>Data de Nascimento:</S.Label><S.Value>{new Date(paciente.birthdate).toLocaleDateString("pt-BR")}</S.Value>
                            <S.Label>Endereço:</S.Label><S.Value>{paciente.address}</S.Value>
                        </S.InfoGrid>
                </S.InfoSection>
            </S.DescriptionArea>
            <S.ContainerOptions>
                <S.ContainerOptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "fichaClinica"} onClick={() => handleTabChange("fichaClinica")}>Ficha Clínica</S.OptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "anamnese"} onClick={() => handleTabChange("anamnese")}>Anamnese</S.OptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "orcamentos"} onClick={() => handleTabChange("orcamentos")}>Orçamentos</S.OptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "consultas"} onClick={() => handleTabChange("consultas")}>Consultas</S.OptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "manutencoes"} onClick={() => handleTabChange("manutencoes")}>Manutenções</S.OptionsMenu>
                </S.ContainerOptionsMenu>
                <S.Line/>
                <S.ContentOptionsMenu>
                    {selectedTab === "consultas" && (
                        <S.ContentSetOptionsMenu style={{ width: "100%", marginLeft: "0px" }} >
                        {loadingConsultas ? (
                            <S.ContentDescriptionOptionsMenu>Carregando...</S.ContentDescriptionOptionsMenu>
                        ) : consultas.length === 0 ? (
                            <S.ContentDescriptionOptionsMenu>Nenhuma consulta associada.</S.ContentDescriptionOptionsMenu>
                        ) : (
                            <TableWrapper>
                                <Table>
                                <Thead>
                                    <Th first>Data e Hora</Th>
                                    <Th>Duração</Th>
                                    <Th>Dentista</Th>
                                    <Th>Motivo</Th>
                                </Thead>
                                <Tbody>
                                    {consultas.map(con => (
                                    <Tr onClick={() => navigate(`/consultas/${con.id}`)} key={con.id}>
                                        <Td>{con.data_hora}</Td>
                                        <Td>{con.duracao}</Td>
                                        <Td>{con.dentista_nome}</Td>
                                        <Td>{con.motivo}</Td>
                                    </Tr>
                                    ))}
                                </Tbody>
                                </Table>
                            </TableWrapper>
                        )}
                        </S.ContentSetOptionsMenu>
                    )}
                    {selectedTab === "anamnese" && (
                        <>
                            <S.ContentSetOptionsMenu>
                                <S.ContentTitleOptionsMenu>Perguntas e Respostas</S.ContentTitleOptionsMenu>
                                <S.ContentDescriptionOptionsMenu>Não disponível</S.ContentDescriptionOptionsMenu>
                            </S.ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "fichaClinica" && (
                        <>
                            <S.ContentSetOptionsMenu>
                                <S.ContentTitleOptionsMenu>Informações</S.ContentTitleOptionsMenu>
                                <S.ContentDescriptionOptionsMenu>Não disponível</S.ContentDescriptionOptionsMenu>
                            </S.ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "orcamentos" && (
                        <>
                            <S.ContentSetOptionsMenu>
                                <S.ContentTitleOptionsMenu>Orçamentos realzados</S.ContentTitleOptionsMenu>
                                <S.ContentDescriptionOptionsMenu>Não há nenhum orçamento</S.ContentDescriptionOptionsMenu>
                            </S.ContentSetOptionsMenu>
                        </>
                    )}
                    {selectedTab === "manutencoes" && (
                        <S.ContentSetOptionsMenu style={{ width: "100%", marginLeft: "0px" }} >
                        {loadingManutencoes ? (
                            <S.ContentDescriptionOptionsMenu>Carregando...</S.ContentDescriptionOptionsMenu>
                        ) : manutencoes.length === 0 ? (
                            <S.ContentDescriptionOptionsMenu>Nenhuma manutenção associada.</S.ContentDescriptionOptionsMenu>
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
                        </S.ContentSetOptionsMenu>
                    )}


                </S.ContentOptionsMenu>
            </S.ContainerOptions>

        </S.ContainerAside>
        <S.SidebarButtons>
            <S.ActionButton onClick={handleOpenEditModal}>Editar</S.ActionButton>
            <S.ActionButton onClick={handleOpenDeleteModal}>Excluir</S.ActionButton>
        </S.SidebarButtons>
        {/* Modal de Cadastro */}
        <DeletePacientModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
        {/* Modal de Cadastro */}
        <EditPacientModal paciente={paciente} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />


    </S.ContainerDetails>
    );
}


export default PacienteDetails;