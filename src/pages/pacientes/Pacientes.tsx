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
import { RotatingIcon, PaginationAreaContainer, PaginationButtonsContainer } from "../../components/Containers/PaginationAreaContainer.style";
import AutoAlert from "../../components/Alerts/CustomAlert";
import { useAlert } from "../../context/AlertContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type AlertState = {
  severity: "error" | "info" | "success" | "warning";
  message: string;
} | null;


const PatientList = () => {
	const { showAlert } = useAlert();

	const [patients, setPatients] = useState([]);
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
		// ⬅️ força o useEffect a rodar
    };

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
					showAlert({ severity: "info", message: "Nenhum paciente encontrado" });

				}

				setPatients(data.pacientes);
				setTotalPatients(data.total);
				setCurrentPage(data.page);

			} catch (error) {
				showAlert({ severity: "error", message: "Erro ao carregar pacientes" });
				console.log("Erro ao carregar pacientes:", error);
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
	const handleCloseSearchModal = (pacientes) => {
		setIsSearchModalOpen(false);
		if (pacientes) {
			setPatients(pacientes);
		}
	};


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
			
		</ContainerPacientes>
	);
};

export default PatientList;
