import {PaginationAreaContainer, ContentSetOptionsMenu, ContentOptionsMenu, ContentDescriptionOptionsMenu, ContentTitleOptionsMenu, Line, ContainerOptionsMenu, OptionsMenu, DescriptionArea, Title, Data, ContainerDetails, ContainerAside, ContainerOptions, SidebarButtons, ActionButton } from "../../components/Containers/ContainerDetails.style";
import DeleteDentistModal from "../../components/Modals/dentist/deleteDetistModal/DeleteDentistModal";
import EditDentistModal from "../../components/Modals/dentist/editDentistModal/EditDentistModal";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";



const DentistaDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id da URL
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
                <Data>Horárui de Trabalho: {dentista.working_hours}</Data>
                <Data>Telefone: {dentista.phone}</Data>
                <Data>Email: {dentista.email}</Data>
                <Data>Endereço: {dentista.address}</Data>
                <Data>Notas: {dentista.notes}</Data>
            </DescriptionArea>
            <ContainerOptions>
                <ContainerOptionsMenu>
                    <OptionsMenu selected={true}>Consultas</OptionsMenu>
                </ContainerOptionsMenu>
                <Line/>
                <ContentOptionsMenu>
                    <ContentSetOptionsMenu>
                        <ContentTitleOptionsMenu>Próximas Consultas</ContentTitleOptionsMenu>
                        <ContentDescriptionOptionsMenu>Não há nenhum agendamento</ContentDescriptionOptionsMenu>
                    
                    </ContentSetOptionsMenu>
                    <ContentSetOptionsMenu>
                        <ContentTitleOptionsMenu>Histórico de Consultas</ContentTitleOptionsMenu>
                        <ContentDescriptionOptionsMenu>Não há nenhum agendamento</ContentDescriptionOptionsMenu>
                    
                    </ContentSetOptionsMenu>
                    
                    
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