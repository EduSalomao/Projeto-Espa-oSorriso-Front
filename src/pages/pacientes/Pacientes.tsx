import React, { useEffect, useState } from "react";

import { MainContainerContent } from "../../components/Containers/ContainerContent.style";
import { ContainerLista } from "../../components/Containers/ContainerList.style";
import { ListArea } from "../../components/Containers/ListArea.style";
import { ActionButton, SidebarButtons } from "../../components/Buttons/Button.style";
import { CardsArea } from "../../components/Containers/CardsArea.style";
import PacienteCard from "../../components/Card/paciente/Card";
import CreatePatientModal from "../../components/Modals/patient/createPatientModal/CreatePatientModal";
import SearchPatientModal from "../../components/Modals/patient/searchPatientModal/SearchPatientModal";
import PaginationOption from "../../components/PaginationOption/PaginationOption";
import { RotatingIcon, PaginationAreaContainer, PaginationButtonsContainer } from "../../components/Containers/PaginationAreaContainer.style";
import { useSnackbar } from 'notistack';
import { getPacientes } from '../../api/services/PacienteService'
import { Paciente } from '../../api/types/paciente'
import { CardListView } from "../../components/Containers/CardListView";




const PatientList = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [patients, setPatients] = useState<Paciente[]>([]);
	const [totalPatients, setTotalPatients] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(5);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [spinning, setSpinning] = useState(false);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleRefresh = () => {
        console.log("Refresh Pacientes");
        setSpinning(true);
        setRefreshTrigger((prev) => prev + 1); 
		
    };

	useEffect(() => {
		
		const fetchPatients = async () => {
			if (!spinning){
				setSpinning(true)
			}
			getPacientes({page: currentPage, limit: limit})
				.then(res => {
					const resp = res.data
					console.log(resp)
					if (resp.pacientes.length == 0) {
						enqueueSnackbar('Não há pacientes cadastrados!', { variant: 'info', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
					}
					setPatients(resp.pacientes)
					setTotalPatients(resp.total)
					if (resp.page !== currentPage) {
						setCurrentPage(resp.page);
					}
				})
				.catch(err => {
					enqueueSnackbar(`Erro ao carregar pacientes\n${err}`, { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
				})
				.finally(() => {
					
					setSpinning(false);
				})
		};

		fetchPatients();
	}, [currentPage, limit, refreshTrigger]);


	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleOpenCreateModal = () => setIsCreateModalOpen(true);
	const handleCloseCreateModal = () => setIsCreateModalOpen(false);

	const handleOpenSearchModal = () => setIsSearchModalOpen(true);
	const handleCloseSearchModal = (pacientes) => {
		setIsSearchModalOpen(false);
		if (pacientes) {
			setPatients(pacientes);
		}
	};

	return (
		<CardListView
			items={patients}
			renderCard={(pessoa, idx) => (
				<PacienteCard
					key={pessoa.id}
					id={pessoa.id}
					nome={pessoa.name}
					cpf={pessoa.cpf}
					telefone={pessoa.phone}
					nascimento={pessoa.birthdate}
					endereco={`${pessoa.address.slice(0, 25)}...`}
				/>
			)}
			currentPage={currentPage}
			totalItems={totalPatients}
			limit={limit}
			onPageChange={handlePageChange}
			onRefresh={handleRefresh}
			spinning={spinning}
			actionButtons={
				<>
					<ActionButton onClick={handleOpenSearchModal}>Pesquisar</ActionButton>
					<ActionButton onClick={handleOpenCreateModal}>Cadastrar</ActionButton>
				</>
			}
		>
			{/* Modais como children */}
			<CreatePatientModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
			<SearchPatientModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />
		</CardListView>

	);
	return (
		
		<MainContainerContent >
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
								endereco={`${pessoa.address.slice(0, 25)}...`} />
						))}
					</CardsArea>

				</ListArea>
				<PaginationAreaContainer>
					<PaginationButtonsContainer>
						<PaginationOption page={currentPage} total={totalPatients} limit={limit} onPageChange={handlePageChange} />
						
					</PaginationButtonsContainer>
					<RotatingIcon spinning={spinning} onClick={handleRefresh} size={20} /> 

				</PaginationAreaContainer>
			</ContainerLista>
			<SidebarButtons>
				<ActionButton onClick={handleOpenSearchModal}>Pesquisar</ActionButton>
				<ActionButton onClick={handleOpenCreateModal}>Cadastrar</ActionButton>
			</SidebarButtons>

			{/* Modal de Cadastro */}
			<CreatePatientModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />

			{/* Modal de Pesquisa */}
			<SearchPatientModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />
			
		</MainContainerContent>
	);
};

export default PatientList;
