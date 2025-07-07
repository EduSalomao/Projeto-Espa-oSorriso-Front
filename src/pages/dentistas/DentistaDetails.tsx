import {ContentSetOptionsMenu, ContentOptionsMenu, ContentDescriptionOptionsMenu, ContentTitleOptionsMenu, Line, ContainerOptionsMenu, OptionsMenu, DescriptionArea, Title, Data, ContainerDetails, ContainerAside, ContainerOptions, SidebarButtons, ActionButton } from "../../components/Containers/ContainerDetails.style";
import DeleteDentistModal from "../../components/Modals/dentist/deleteDetistModal/DeleteDentistModal";
import EditDentistModal from "../../components/Modals/dentist/editDentistModal/EditDentistModal";
import { getProcedimentos } from "../../api/services/ProcedimentoService";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import { TableWrapper, Tbody, Th, Thead, Tr, Td, Table } from "../../components/Containers/Table.style";



const DentistaDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id da URL
    const [selectedTab, setSelectedTab] = useState<"consultas" | "procedimentos">("consultas");
    const [procedimentos, setProcedimentos] = useState([]);
    const [loadingProcedimentos, setLoadingProcedimentos] = useState(false);

    const handleTabChange = async (tab) => {
        setSelectedTab(tab);
        if (tab === "procedimentos") {
            setLoadingProcedimentos(true);
            try {
                const resp = await getProcedimentos({ idDentista: id });
                console.log(resp.data.procedimentos)
                for (const p of resp.data.procedimentos) {
                    p.custo = parseFloat(p.custo).toFixed(2); // Formata o custo para duas casas decimais
                }
                setProcedimentos(resp.data.procedimentos); // ajuste conforme resposta da sua API
                console.log("Dados dos procedimentos:", procedimentos);
                console.log("Dados dos procedimentos resp:", resp.data.procedimentos);
            } catch (err) {
                setProcedimentos([]);
            }
            setLoadingProcedimentos(false);
            
        }
    };

    console.log("Procedimentos:", procedimentos);
    const [dentista, setDentista] = useState(
        {id: "", 
        name: "",
        cro: "",
        phone: "",
        working_hours: "",
        email: "",
        address: "",
        notes: "",
        specialization: ""});

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
    
    const handleCloseDeleteModal = (isDeleted) => {
        console.log("Teste2" + isDeleted)
        setIsDeleteModalOpen(false);
        if (isDeleted) {
            // Redirecionar ou fazer algo após a exclusão
            navigate(`/dentistas`);
        }
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = (isUpdated, dentista) => {
        if(isUpdated) {
            setDentista(dentista);
        }
        setIsEditModalOpen(false)
    };

    useEffect(() => {
        const fetchDentista = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/dentistas/${id}`);
                const data = await response.json();
                setDentista(data);
            } catch (error) {
                console.error("Erro ao buscar dentista:", error);
            }
        };

        if (id) {
            fetchDentista();
        }
    }, [id]);

    return (
    <ContainerDetails>
        <ContainerAside>
            <DescriptionArea>
                <Title>{dentista.name}</Title>
                <Data>CRO: {dentista.cro}</Data>
                <Data>Especialização: {dentista.specialization}</Data>
                <Data>Horário de Trabalho: {dentista.working_hours}</Data>
                <Data>Telefone: {dentista.phone}</Data>
                <Data>Email: {dentista.email}</Data>
                <Data>Endereço: {dentista.address}</Data>
                <Data>Notas: {dentista.notes}</Data>
            </DescriptionArea>
            <ContainerOptions>
                <ContainerOptionsMenu>
                    <OptionsMenu selected={selectedTab === "consultas"} onClick={() => handleTabChange("consultas")}>
                        Consultas
                    </OptionsMenu>
                    <OptionsMenu selected={selectedTab === "procedimentos"} onClick={() => handleTabChange("procedimentos")}>
                        Procedimentos
                    </OptionsMenu>
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
                        {selectedTab === "procedimentos" && (
                            <ContentSetOptionsMenu style={{ width: "100%", marginLeft: "0px" }} >
                            
                            {loadingProcedimentos ? (
                                <ContentDescriptionOptionsMenu>Carregando...</ContentDescriptionOptionsMenu>
                            ) : procedimentos.length === 0 ? (
                                <ContentDescriptionOptionsMenu>Nenhum procedimento associado.</ContentDescriptionOptionsMenu>
                            ) : (
                                <TableWrapper>
                                    <Table>
                                    <Thead>
                                        
                                            <Th first>Nome</Th>
                                            <Th>Tipo</Th>
                                            <Th>Duração</Th>
                                            <Th last>Custo</Th>
                                        
                                    </Thead>
                                    <Tbody>
                                        {procedimentos.map(proc => (
                                        <Tr onClick={() => navigate(`/procedimentos/${proc.id}`)} key={proc.id}>
                                            <Td>{proc.name}</Td>
                                            <Td>{proc.tipo}</Td>
                                            <Td>{proc.duracao}</Td>
                                            <Td>R$ {proc.custo}</Td>
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
        <DeleteDentistModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
        {/* Modal de Cadastro */}
        <EditDentistModal dentista={dentista} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />

      
    </ContainerDetails>
    );
}


export default DentistaDetails;