import React, { useEffect, useState, useCallback } from "react";
import { useSnackbar } from 'notistack';
import { CardListView } from "../../components/Containers/CardListView";
import { ActionButton } from "../../components/Buttons/Button.style";
import { getProcedimentos } from "../../api/services/ProcedimentoService";
import { Procedimento } from "../../api/types/procedimento";
import ProcedimentoCard from "../../components/Card/procedimento/Card";
import CreateProcedimentoModal from "../../components/Modals/procedimento/CreateProcedimentoModal";
import SearchProcedimentoModal from "../../components/Modals/procedimento/SearchProcedimentoModal";

const ProcedimentosList = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const fetchItems = useCallback(async (page = currentPage, term = searchTerm) => {
        setSpinning(true);
        try {
            const response = await getProcedimentos({ page, limit, termo: term });
            if (response.data.procedimentos.length === 0 && page === 1 && !term) {
                 enqueueSnackbar('Nenhum procedimento encontrado.', { variant: 'info' });
            }
            setProcedimentos(response.data.procedimentos);
            setTotalItems(response.data.total);
            setCurrentPage(response.data.page);
        } catch (error) {
            console.error("Erro ao carregar procedimentos:", error);
            enqueueSnackbar("Erro ao carregar procedimentos.", { variant: 'error' });
        } finally {
            setSpinning(false);
        }
    }, [currentPage, limit, searchTerm, enqueueSnackbar]);

    useEffect(() => {
        fetchItems(1, ''); // Fetch initial data
    }, []);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchItems(newPage, searchTerm);
    };
    
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
        fetchItems(1, term);
        setIsSearchModalOpen(false);
    };
    
    const handleRefresh = () => {
        setSearchTerm('');
        fetchItems(1, '');
    }

    return (
        <CardListView
            items={procedimentos}
            renderCard={(procedimento) => (
                <ProcedimentoCard key={procedimento.id} procedimento={procedimento} />
            )}
            currentPage={currentPage}
            totalItems={totalItems}
            limit={limit}
            onPageChange={handlePageChange}
            onRefresh={handleRefresh}
            spinning={spinning}
            actionButtons={
                <>
                    <ActionButton onClick={() => setIsSearchModalOpen(true)}>Pesquisar</ActionButton>
                    <ActionButton onClick={() => setIsCreateModalOpen(true)}>Cadastrar</ActionButton>
                </>
            }
        >
            <CreateProcedimentoModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => fetchItems(1, '')}
            />
            <SearchProcedimentoModal 
                isOpen={isSearchModalOpen} 
                onClose={() => setIsSearchModalOpen(false)} 
                onSearch={handleSearch}
            />
        </CardListView>
    );
};

export default ProcedimentosList;   