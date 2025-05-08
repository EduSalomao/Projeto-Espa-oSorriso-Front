import React, { useEffect, useState } from "react";
import {
  ListaContainer,
  CardsArea,
  SidebarButtons,
  ActionButton,
  Card,
  CardTitle,
  CardInfo,
  CardLine,
  CardInfoGrid
} from "./Pacientes.style";

import CreatePatientModal from "../../components/Modals/createPatientModal/CreatePatientModal";
import SearchPatientModal from "../../components/Modals/searchPatientModal/SearchPatientModal";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const mockData = Array.from({ length: 5 }).map(() => ({
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
    <ListaContainer>
      <CardsArea>
        {patients.map((pessoa, idx) => (
          <Card key={idx}>
            <CardTitle>{pessoa.nome}</CardTitle>
            <CardLine />
            <CardInfoGrid>
              <CardInfo><strong>CPF:</strong> {pessoa.cpf}</CardInfo>
              <CardInfo><strong>Telefone:</strong> {pessoa.telefone}</CardInfo>
              <CardInfo><strong>Data de nascimento:</strong> {pessoa.nascimento}</CardInfo>
              <CardInfo><strong>Endereço:</strong> {pessoa.endereco}</CardInfo>
            </CardInfoGrid>
          </Card>
        ))}
      </CardsArea>

      <SidebarButtons>
        <ActionButton onClick={handleOpenSearchModal}>Pesquisar</ActionButton>
        <ActionButton onClick={handleOpenCreateModal}>Cadastrar</ActionButton>
      </SidebarButtons>

      {/* Modal de Cadastro */}
      <CreatePatientModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />

      {/* Modal de Pesquisa */}
      <SearchPatientModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />
    </ListaContainer>
  );
};

export default PatientList;
