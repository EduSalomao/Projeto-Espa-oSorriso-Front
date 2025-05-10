import {ContentSetOptionsMenu, ContentOptionsMenu, ContentDescriptionOptionsMenu, ContentTitleOptionsMenu, Line, ContainerOptionsMenu, OptionsMenu, DescriptionArea, Title, Data, ContainerDetails, ContainerAside, ContainerOptions, SidebarButtons, ActionButton } from "./PacienteDetails.style";
import DeletePacientModal from "../../../components/Modals/deletePatientModal/DeletePatientModal";
import EditPacientModal from "../../../components/Modals/editPatientModal/EditPatientModal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";



const PacienteDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id da URL
    const [paciente, setPaciente] = useState({id: "", name: "", phone: "", cpf: "", birthdate: "", address: ""});

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
                    <OptionsMenu>Ficha Clínica</OptionsMenu>
                    <OptionsMenu>Anamnese</OptionsMenu>
                    <OptionsMenu>Orçamentos</OptionsMenu>
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
        <DeletePacientModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />
        {/* Modal de Cadastro */}
        <EditPacientModal paciente={paciente} isOpen={isEditModalOpen} onClose={handleCloseEditModal} />

      
    </ContainerDetails>
    );
}


export default PacienteDetails;