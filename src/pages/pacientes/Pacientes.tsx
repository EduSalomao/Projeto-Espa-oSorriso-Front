import React, { useEffect, useState } from "react";
import {
  ContainerPacientes,
  CardsArea,
  SidebarButtons,
  ActionButton,
  ContainerLista,
  Card,
  CardTitle,
  CardInfo,
  CardLine,
  CardInfoGrid,
  ListArea
} from "./Pacientes.style";
import PacienteCard from "../../components/Paciente/Card/Card";
import CreatePatientModal from "../../components/Modals/createPatientModal/CreatePatientModal";
import SearchPatientModal from "../../components/Modals/searchPatientModal/SearchPatientModal";
import PaginationOption from "../../components/PaginationOption/PaginationOption";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const mockData = Array.from({ length: 3 }).map(() => ({
      nome: "Michael Jackson de Souza",
      cpf: "123.456.789-33",
      telefone: "(38) 99123-5678",
      nascimento: "01/01/1900",
      endereco: "Av Sergio Vieira de Melo, 3150, Urbis V, Vitória da Conquista, BA",
    }));

    setPatients(mockData);
  }, []);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenSearchModal = () => setIsSearchModalOpen(true);
  const handleCloseSearchModal = () => setIsSearchModalOpen(false);

  return (
    <ContainerPacientes>
        <ContainerLista>
        <ListArea>
            <CardsArea>
                {patients.map((pessoa, idx) => (
                <PacienteCard 
                    id={pessoa.id}
                    nome={pessoa.nome}
                    cpf={pessoa.cpf}
                    telefone={pessoa.telefone}
                    nascimento={pessoa.nascimento}
                    endereco={pessoa.endereco}/>
                ))}
            </CardsArea>
            
        </ListArea>
        <PaginationOption />
      </ContainerLista>
      <SidebarButtons>
        <ActionButton onClick={handleOpenSearchModal}>Pesquisar</ActionButton>
        <ActionButton onClick={handleOpenCreateModal}>Cadastrar</ActionButton>
      </SidebarButtons>

      {/* Modal de Cadastro */}
      <CreatePatientModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />

      {/* Modal de Pesquisa */}
      <SearchPatientModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />
    </ContainerPacientes>
  );
};

export default PatientList;
