import * as S from "../../components/Containers/ContainerDetails.style";
import DeleteDentistModal from "../../components/Modals/dentist/deleteDetistModal/DeleteDentistModal";
import EditDentistModal from "../../components/Modals/dentist/editDentistModal/EditDentistModal";
import { getProcedimentos } from "../../api/services/ProcedimentoService";
import { getConsultas } from "../../api/services/ConsultaService"; // Importado

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
    const [consultas, setConsultas] = useState([]); // Adicionado
    const [loadingConsultas, setLoadingConsultas] = useState(false); // Adicionado

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
        if (tab === "consultas") { // Adicionado
            setLoadingConsultas(true);
            try {
                const resp = await getConsultas({ idDentista: id });
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
    <S.ContainerDetails>
        <S.ContainerAside>
            <S.DescriptionArea>
                <S.Title>🧑‍⚕️ {dentista.name}</S.Title>
                <S.InfoSection>
                    <S.SectionTitle>📒 Informações</S.SectionTitle>
                        <S.InfoGrid>
                            <S.Label>CRO:</S.Label><S.Value>{dentista.cro}</S.Value>
                            <S.Label>Especialização:</S.Label><S.Value>{dentista.specialization}</S.Value>
                            <S.Label>Horário de Trabalho:</S.Label><S.Value>{dentista.working_hours}</S.Value>
                            <S.Label>Telefone:</S.Label><S.Value>{dentista.phone}</S.Value>
                            <S.Label>Email:</S.Label><S.Value>{dentista.email}</S.Value>
                            <S.Label>Endereço:</S.Label><S.Value>{dentista.address}</S.Value>
                            <S.Label>Notas:</S.Label><S.Value>{dentista.notes}</S.Value>
                        </S.InfoGrid>
                </S.InfoSection>
            </S.DescriptionArea>
           
            <S.ContainerOptions>
                <S.ContainerOptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "consultas"} onClick={() => handleTabChange("consultas")}>
                        Consultas
                    </S.OptionsMenu>
                    <S.OptionsMenu selected={selectedTab === "procedimentos"} onClick={() => handleTabChange("procedimentos")}>
                        Procedimentos
                    </S.OptionsMenu>
                </S.ContainerOptionsMenu>
                <S.Line/>
                <S.ContentOptionsMenu>
                    {selectedTab === "consultas" && (
                         <S.ContentSetOptionsMenu style={{ width: "100%", marginLeft: "0px" }} >
                         <S.ContentTitleOptionsMenu>Próximas Consultas</S.ContentTitleOptionsMenu>
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
                                     <Th>Paciente</Th>
                                     <Th>Motivo</Th>
                                 </Thead>
                                 <Tbody>
                                     {consultas.map(con => (
                                     <Tr onClick={() => navigate(`/consultas/${con.id}`)} key={con.id}>
                                         <Td>{con.data_hora}</Td>
                                         <Td>{con.duracao}</Td>
                                         <Td>{con.paciente_nome}</Td>
                                         <Td>{con.motivo}</Td>
                                     </Tr>
                                     ))}
                                 </Tbody>
                                 </Table>
                             </TableWrapper>
                         )}
                         </S.ContentSetOptionsMenu>
                        )}
                        {selectedTab === "procedimentos" && (
                            <S.ContentSetOptionsMenu style={{ width: "100%", marginLeft: "0px" }} >
                            
                            {loadingProcedimentos ? (
                                <S.ContentDescriptionOptionsMenu>Carregando...</S.ContentDescriptionOptionsMenu>
                            ) : procedimentos.length === 0 ? (
                                <S.ContentDescriptionOptionsMenu>Nenhum procedimento associado.</S.ContentDescriptionOptionsMenu>
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
        <DeleteDentistModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
        {/* Modal de Cadastro */}
        <EditDentistModal dentista={dentista} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />

      
    </S.ContainerDetails>
    );
}


export default DentistaDetails;