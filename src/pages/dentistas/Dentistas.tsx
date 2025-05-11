import React, { useEffect, useState } from "react";

import { MainContainerContent } from "../../components/Containers/ContainerContent.style";
import { ContainerLista } from "../../components/Containers/ContainerList.style";
import { ListArea } from "../../components/Containers/ListArea.style";
import { ActionButton, SidebarButtons } from "../../components/Buttons/Button.style";
import { CardsArea } from "../../components/Containers/CardsArea.style";
import { RotatingIcon, PaginationAreaContainer, PaginationButtonsContainer } from "../../components/Containers/PaginationAreaContainer.style";
import CreateDentistModal from "../../components/Modals/dentist/createDentistModal/CreateDentistModal";
import SearchDentistModal from "../../components/Modals/dentist/searchDentistModal/searchDentistModal";
import PaginationOption from "../../components/PaginationOption/PaginationOption";
import DentistaCard from "../../components/Card/dentista/Card";
import { FaSync } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DentistasList = () => {
    const [dentists, setDentists] = useState([]);
    const [totalDentists, setTotalDentists] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        console.log("Refresh Dentistas");
        setSpinning(true);
        setRefreshTrigger((prev) => prev + 1); // ⬅️ força o useEffect a rodar
    };
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                console.log(`${BACKEND_URL}/dentistas?page=${currentPage}&limit=${limit}`)
                const response = await fetch(`${BACKEND_URL}/dentistas?page=${currentPage}&limit=${limit}`);

                if (!response.ok) {
                    throw new Error("Erro ao buscar dentistas");
                }

                const data = await response.json();

                if (data.dentistas.length === 0) {
                    alert("Nenhum dentista encontrado.");
                }

                setDentists(data.dentistas);
                setTotalDentists(data.total);
                setCurrentPage(data.page);
                setSpinning(false);
            } catch (error) {
                console.error("Erro ao carregar dentistas:", error);
                alert("Não foi possível carregar os dentistas.");
                setSpinning(false);
            }
        };

        fetchPatients();
    }, [currentPage, limit, refreshTrigger]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleOpenCreateModal = () => setIsCreateModalOpen(true);
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);

    const handleOpenSearchModal = () => setIsSearchModalOpen(true);
    const handleCloseSearchModal = (dentistas) => {
        console.log("Mostrando no component")
        console.log(dentistas)
        if (dentistas) {
            setDentists(dentistas);
        }
        setIsSearchModalOpen(false);
    };

    return (
        <MainContainerContent>
            <ContainerLista>
                <ListArea>
                    <CardsArea>
                        {dentists.map((dentista, idx) => (
                            <DentistaCard
                                key={idx}
                                id={dentista.id}
                                name={dentista.name}
                                cro={dentista.cro}
                                phone={dentista.phone}
                                email={dentista.email}
                                specialization={dentista.specialization}
                                working_hours={dentista.working_hours} />
                        ))}
                    </CardsArea>

                </ListArea>
                
                <PaginationAreaContainer>
                    <PaginationButtonsContainer>
                        <PaginationOption page={currentPage} total={totalDentists} limit={limit} onPageChange={handlePageChange} />
                    </PaginationButtonsContainer>
                
                    <RotatingIcon spinning={spinning} onClick={handleRefresh} size={20} /> 

                </PaginationAreaContainer>
                
                
                
            </ContainerLista>
            <SidebarButtons>
                <ActionButton onClick={handleOpenSearchModal}>Pesquisar</ActionButton>
                <ActionButton onClick={handleOpenCreateModal}>Cadastrar</ActionButton>
            </SidebarButtons>

            {/* Modal de Cadastro */}
            <CreateDentistModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />

            {/* Modal de Pesquisa */}
            <SearchDentistModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />
        </MainContainerContent>
    );
};

export default DentistasList;
