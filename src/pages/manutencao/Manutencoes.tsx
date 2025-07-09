import React, { useEffect, useState, useCallback } from "react";
import { CardListView } from "../../components/Containers/CardListView";
import CreateManutencaoModal from "../../components/Modals/manutencao/CreateManutencaoModal";
import SearchManutencaoModal from "../../components/Modals/manutencao/SearchManutencaoModal";
import ManutencaoCard from "../../components/Card/manutencao/Card";
import { ActionButton } from "../../components/Buttons/Button.style";
import { getManutencoes } from "../../api/services/ManutencaoService";
import { Manutencao } from "../../api/types/manutencao";
import { enqueueSnackbar } from "notistack";
import { Button } from "../../components/Modals/Modal.styles";
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file 
import * as S from "../../components/Modals/Modal.styles"

const ManutencoesList = () => {
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [limit] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const [dateRangeModalOpen, setDateRangeModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
        }
    ]);
    const [searchDate, setSearchDate] = useState(false);

    
    const fetchItems = useCallback(async () => {
        setSpinning(true);
        try {
            const startDateFormatted = format(dateRange[0].startDate, "yyyy-MM-dd'T'HH:mm:ss");
            console.log('searchDate', searchDate)
            const endDateFormatted = dateRange[0].endDate 
            ? format(dateRange[0].endDate, "yyyy-MM-dd'T'23:59:59") 
            : null;
            const response = await getManutencoes({ page: currentPage, limit, termo: searchTerm, dateRange: [startDateFormatted, endDateFormatted] });
           
            console.log("Response data:", response.data);
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
    }, [currentPage, limit, searchTerm, searchDate]);

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
        setDateRange([
            {
                startDate: new Date(),
                endDate: null,
                key: 'selection'
            }
        ]);
        setSearchDate(!searchDate);
        
        setCurrentPage(1); // Reset to first page on refresh
    }

    
    
    return (
        
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
                    <ActionButton onClick={() => setIsSearchModalOpen(true)}>Pesquisar Nome</ActionButton>
                    <ActionButton onClick={() => setDateRangeModalOpen(true)}>Pesquisar Data</ActionButton>
                    <ActionButton onClick={() => setIsCreateModalOpen(true)}>Cadastrar</ActionButton>
                </>
            }
        >
            {dateRangeModalOpen && (
                <S.ModalOverlay>
                    <S.Container style={{width: 'auto'}}>
                        <S.Title>Pesquisar por Datas</S.Title>
                        <S.FormContainer style={{justifyContent: 'center'}}>
                            <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            />
                        </S.FormContainer>
                        <S.ButtonGroup style={{marginTop: '20px'}}>
                            <S.Button onClick={() => {
                                setSearchDate(!searchDate);
                                setDateRangeModalOpen(false);
                            }}>
                                Filtrar
                            </S.Button>
                            <S.Button onClick={() => setDateRangeModalOpen(false)}>
                                Fechar
                            </S.Button>
                        </S.ButtonGroup>
                    
                    </S.Container>
                </S.ModalOverlay>

            )}
            
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
    );
};

export default ManutencoesList;