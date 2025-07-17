import React, { useEffect, useState, useCallback } from "react";
import { CardListView } from "../../components/Containers/CardListView";
import CreateConsultaModal from "../../components/Modals/consulta/CreateConsultaModal";
import SearchConsultaModal from "../../components/Modals/consulta/SearchConsultaModal";
import ConsultaCard from "../../components/Card/consulta/Card";
import { ActionButton } from "../../components/Buttons/Button.style";
import { getConsultas } from "../../api/services/ConsultaService";
import { Consulta } from "../../api/types/consulta";
import { enqueueSnackbar } from "notistack";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import * as S from "../../components/Modals/Modal.styles"

const ConsultasList = () => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
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
            const endDateFormatted = dateRange[0].endDate 
            ? format(dateRange[0].endDate, "yyyy-MM-dd'T'23:59:59") 
            : null;
            const response = await getConsultas({ page: currentPage, limit, termo: searchTerm, dateRange: [startDateFormatted, endDateFormatted] });
           
            if (response.data.consultas.length === 0) {
                enqueueSnackbar('Nenhuma consulta encontrada.', { variant: 'info' });
            }
            setConsultas(response.data.consultas);
            setTotalItems(response.data.total);
            
        } catch (error) {
            console.error("Erro ao carregar consultas:", error);
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
        setCurrentPage(1); 
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
        
        setCurrentPage(1);
    }

    return (
        
        <CardListView
            items={consultas}
            renderCard={(consulta, idx) => (
                <ConsultaCard key={idx} consulta={consulta} />
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
            
            <CreateConsultaModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchItems}
            />
            <SearchConsultaModal 
                isOpen={isSearchModalOpen} 
                onClose={() => setIsSearchModalOpen(false)} 
                onSearch={handleSearch}
            />
        </CardListView>
    );
};

export default ConsultasList;