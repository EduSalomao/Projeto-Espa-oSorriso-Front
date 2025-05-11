import React, { useEffect, useState } from "react";
import {
  ContainerPacientes,
  CardsArea,
  SidebarButtons,
  ActionButton,
  ContainerLista,
  ListArea
} from "./Pacientes.style";
import PacienteCard from "../../components/Card/paciente/Card";
import CreatePatientModal from "../../components/Modals/patient/createPatientModal/CreatePatientModal";
import SearchPatientModal from "../../components/Modals/patient/searchPatientModal/SearchPatientModal";
import PaginationOption from "../../components/PaginationOption/PaginationOption";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        console.log(`${BACKEND_URL}/pacientes?page=${currentPage}&limit=${limit}`)
        const response = await fetch(`${BACKEND_URL}/pacientes?page=${currentPage}&limit=${limit}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar pacientes");
        }
  
        const data = await response.json();
        
        if (data.pacientes.length === 0) {
          alert("Nenhum paciente encontrado.");
        }
  
        setPatients(data.pacientes);
        setTotalPatients(data.total);
        setCurrentPage(data.page);
  
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
        alert("Não foi possível carregar os pacientes.");
      }
    };
  
    fetchPatients();
  }, [currentPage, limit]);
  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                    nome={pessoa.name}
                    cpf={pessoa.cpf}
                    telefone={pessoa.phone}
                    nascimento={pessoa.birthdate}
                    endereco={`${pessoa.address.slice(0, 25)}...`}/>
                  ))}
            </CardsArea>
            
        </ListArea>
        <PaginationOption page={currentPage} total={totalPatients} limit={limit} onPageChange={handlePageChange}/>
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
