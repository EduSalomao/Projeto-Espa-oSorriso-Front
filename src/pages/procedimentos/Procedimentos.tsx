import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import { getProcedimentos } from '../../api/services/ProcedimentoService';
import { Procedimento } from '../../api/types/procedimento';
import { CardListView } from "../../components/Containers/CardListView";
import ProcedimentoCard from "../../components/Card/procedimento/Card";
import { ActionButton } from "../../components/Buttons/Button.style";

const ProcedimentosList = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
	const [totalProcedimentos, setTotalProcedimentos] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(5);
	const [spinning, setSpinning] = useState(false);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleRefresh = () => {
        console.log("Refresh Procedimentos");
        setSpinning(true);
        setRefreshTrigger((prev) => prev + 1); 
		
    };

	useEffect(() => {
		
		const fetchProcedimentos = async () => {
			if (!spinning){
				setSpinning(true)
			}
			getProcedimentos({page: currentPage, limit: limit})
				.then(res => {
					const resp = res.data
					if (resp.procedimentos.length === 0) {
						enqueueSnackbar('Não há procedimentos cadastrados!', { variant: 'info', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
					}
					setProcedimentos(resp.procedimentos)
					setTotalProcedimentos(resp.total)
					if (resp.page !== currentPage) {
						setCurrentPage(resp.page);
					}
				})
				.catch(err => {
					enqueueSnackbar(`Erro ao carregar procedimentos\n${err}`, { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
				})
				.finally(() => {
					
					setSpinning(false);
				})
		};

		fetchProcedimentos();
	}, [currentPage, limit, refreshTrigger]);


	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return (
		<CardListView
			items={procedimentos}
			renderCard={(procedimento) => (
				<ProcedimentoCard
					key={procedimento.id}
					id={procedimento.id}
					name={procedimento.name}
					description={procedimento.description}
					price={procedimento.price}
					duration={procedimento.duration}
				/>
			)}
			currentPage={currentPage}
			totalItems={totalProcedimentos}
			limit={limit}
			onPageChange={handlePageChange}
			onRefresh={handleRefresh}
			spinning={spinning}
			actionButtons={
				<>
					<ActionButton onClick={() => {}}>Pesquisar</ActionButton>
					<ActionButton onClick={() => {}}>Cadastrar</ActionButton>
				</>
			}
		>
		</CardListView>
	);
};

export default ProcedimentosList;
