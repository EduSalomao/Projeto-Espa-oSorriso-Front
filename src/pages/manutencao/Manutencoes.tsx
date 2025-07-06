import React, { useEffect, useState, useCallback } from "react";
import { CardListView } from "../../components/Containers/CardListView";
import CreateManutencaoModal from "../../components/Modals/manutencao/CreateManutencaoModal";
import SearchManutencaoModal from "../../components/Modals/manutencao/SearchManutencaoModal";
import ManutencaoCard from "../../components/Card/manutencao/Card";
import { ActionButton } from "../../components/Buttons/Button.style";
import { getManutencoes } from "../../api/services/ManutencaoService";
import { Manutencao } from "../../api/types/manutencao";
import { enqueueSnackbar } from "notistack";
/* import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file */

const ManutencoesList = () => {
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const fetchItems = useCallback(async () => {
        setSpinning(true);
        try {
            const response = await getManutencoes({ page: currentPage, limit, termo: searchTerm });
            console.log("Manutenções fetched:", response.data);
            if (response.data.manutencoes.length === 0) {
                enqueueSnackbar('Nenhuma manutenção encontrada.', { variant: 'info' });
                return;
            }
            setManutencoes(response.data.manutencoes);
            setTotalItems(response.data.total);
        } catch (error) {

            console.error("Erro ao carregar manutenções:", error);
        } finally {
            setSpinning(false);
        }
    }, [currentPage, limit, searchTerm]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset page on new search
    };

    const handleRefresh = () => {
        setSearchTerm('');
        setCurrentPage(1); // Reset to first page on refresh
    }

  /*   const [state, setState] = useState({
    selection: {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    },
    compare: {
        startDate: new Date(),
        endDate: addDays(new Date(), 3),
        key: 'compare'
    }
    }); */
    return (
        <>
        
        <CardListView
            items={manutencoes}
            renderCard={(manutencao, idx) => (
                <ManutencaoCard key={idx} manutencao={manutencao} />
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
            {/* <DateRangePicker
            onChange={item => setState({ ...state, ...item })}
            months={1}
            minDate={addDays(new Date(), -300)}
            maxDate={addDays(new Date(), 900)}
            direction="vertical"
            scroll={{ enabled: true }}
            ranges={[state.selection, state.compare]}
            />; */}
            <CreateManutencaoModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchItems}
            />
            <SearchManutencaoModal 
                isOpen={isSearchModalOpen} 
                onClose={() => setIsSearchModalOpen(false)} 
                onSearch={handleSearch}
            />
        </CardListView>
        </>
    );
};

export default ManutencoesList;