import React, { useEffect, useState } from "react";
import { MainContainerContent } from "../../components/Containers/ContainerContent.style";
import { ContainerLista } from "../../components/Containers/ContainerList.style";
import { ListArea } from "../../components/Containers/ListArea.style";
import { ActionButton, SidebarButtons } from "../../components/Buttons/Button.style";
import { CardsArea } from "../../components/Containers/CardsArea.style";
import { RotatingIcon, PaginationAreaContainer, PaginationButtonsContainer } from "../../components/Containers/PaginationAreaContainer.style";
import PaginationOption from "../../components/PaginationOption/PaginationOption";
import { FaSync } from "react-icons/fa";
import { useSnackbar } from 'notistack';
import { CardListView } from "../../components/Containers/CardListView";
import ProcedimentoCard from "../../components/Card/procedimento/Card";

// Import modals
import CreateProcedureModal from "../../components/Modals/procedure/createProcedureModal/CreateProcedureModal";
import SearchProcedureModal from "../../components/Modals/procedure/searchProcedureModal/SearchProcedureModal";
import EditProcedureModal from "../../components/Modals/procedure/editProcedureModal/EditProcedureModal";
import DeleteProcedureModal from "../../components/Modals/procedure/deleteProcedureModal/DeleteProcedureModal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Procedure = {
	id: number;
	name: string;
	type: string;
	duration: string;
	cost: string;
	dentists: string[];
	description: string;
	category: string;
	notes: string;
};

const ProcedimentosList = () => {
	const [procedures, setProcedures] = useState<Procedure[]>([]);
	const [totalProcedures, setTotalProcedures] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(5);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
	const [spinning, setSpinning] = useState(false);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const { enqueueSnackbar } = useSnackbar();

	const handleRefresh = () => {
		console.log("Refresh Procedimentos");
		setSpinning(true);
		setRefreshTrigger((prev) => prev + 1);
	};

	useEffect(() => {
		const fetchProcedures = async () => {
			try {
				if (!spinning) {
					setSpinning(true);
				}
				// TODO: Implement backend integration
				// Simulação de dados
				const mockProcedures = [
					{
						id: 1,
						name: "Limpeza Dental",
						type: "Preventivo",
						duration: "60",
						cost: "150.00",
						dentists: ["dentista1", "dentista2"],
						description: "Limpeza completa dos dentes",
						category: "Higiene",
						notes: "Realizar a cada 6 meses"
					},
					{
						id: 2,
						name: "Clareamento",
						type: "Estético",
						duration: "90",
						cost: "300.00",
						dentists: ["dentista1", "dentista3"],
						description: "Clareamento dental",
						category: "Estético",
						notes: "Sessões semanais"
					}
				];

				setProcedures(mockProcedures);
				setTotalProcedures(mockProcedures.length);
				setCurrentPage(1);
				setSpinning(false);
			} catch (error) {
				console.error("Erro ao carregar procedimentos:", error);
				enqueueSnackbar("Erro ao carregar procedimentos!", {
					variant: 'error',
					autoHideDuration: 4000,
					TransitionProps: { direction: 'down' },
					anchorOrigin: { vertical: 'top', horizontal: 'center' }
				});
				setSpinning(false);
			}
		};

		fetchProcedures();
	}, [currentPage, limit, refreshTrigger]);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleOpenCreateModal = () => setIsCreateModalOpen(true);
	const handleCloseCreateModal = () => setIsCreateModalOpen(false);

	const handleOpenSearchModal = () => setIsSearchModalOpen(true);
	const handleCloseSearchModal = (procedures?: Procedure[]) => {
		if (procedures) {
			setProcedures(procedures);
		}
		setIsSearchModalOpen(false);
	};

	const handleOpenEditModal = (procedure: Procedure) => {
		setSelectedProcedure(procedure);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setSelectedProcedure(null);
	};

	const handleOpenDeleteModal = (procedure: Procedure) => {
		setSelectedProcedure(procedure);
		setIsDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedProcedure(null);
	};

	return (
		<CardListView
			items={procedures}
			renderCard={(procedimento, idx) => (
				<ProcedimentoCard
					key={procedimento.id}
					id={procedimento.id}
					name={procedimento.name}
					description={procedimento.description}
					price={procedimento.cost}
					duration={procedimento.duration}
				/>
			)}
			currentPage={currentPage}
			totalItems={totalProcedures}
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
			{/* Modal de Cadastro */}
			<CreateProcedureModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />

			{/* Modal de Pesquisa */}
			<SearchProcedureModal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal} />

			{/* Modal de Edição */}
			{selectedProcedure && (
				<EditProcedureModal
					isOpen={isEditModalOpen}
					onClose={handleCloseEditModal}
					procedure={selectedProcedure}
				/>
			)}

			{/* Modal de Exclusão */}
			{selectedProcedure && (
				<DeleteProcedureModal
					isOpen={isDeleteModalOpen}
					onClose={handleCloseDeleteModal}
					procedure={selectedProcedure}
				/>
			)}
		</CardListView>
	);
};

export default ProcedimentosList;
