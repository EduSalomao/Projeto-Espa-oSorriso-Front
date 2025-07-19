// src/pages/consultas/Consultas.tsx
import { useEffect, useState, useCallback } from "react";
import { CardListView } from "../../components/Containers/CardListView";
import { ActionButton } from "../../components/Buttons/Button.style";
import { getConsultas } from "../../api/services/ConsultaService";
import { Consulta } from "../../api/types/consulta";
import ConsultaCard from "../../components/Card/consulta/Card";
import CreateConsultaModal from "../../components/Modals/consulta/CreateConsultaModal";
import SearchConsultaModal from "../../components/Modals/consulta/SearchConsultaModal";
import { useSnackbar } from "notistack";

type SearchParams = {
  termo?: string;
  startDate?: string;
  endDate?: string;
};

const ConsultasList = () => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5);
    const [spinning, setSpinning] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchParams>({});

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const fetchItems = useCallback(async (page: number, params: SearchParams) => {
        setSpinning(true);
        try {
            const response = await getConsultas({ page, limit, ...params });
            if (response.data.consultas.length === 0 && page === 1) {
                enqueueSnackbar('Nenhuma consulta encontrada com os filtros aplicados.', { variant: 'info' });
            }
            setConsultas(response.data.consultas);
            setTotalItems(response.data.total);
            setCurrentPage(response.data.page);
        } catch (error) {
            console.error("Erro ao carregar consultas:", error);
            enqueueSnackbar("Erro ao carregar consultas.", { variant: 'error' });
        } finally {
            setSpinning(false);
        }
    }, [limit, enqueueSnackbar]);

    useEffect(() => {
        fetchItems(currentPage, searchParams);
    }, [currentPage, searchParams, fetchItems]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const handleSearch = (params: SearchParams) => {
        setSearchParams(params);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setSearchParams({});
        if (currentPage === 1) {
            fetchItems(1, {});
        } else {
            setCurrentPage(1);
        }
    }

    return (
        <CardListView
            items={consultas}
            renderCard={(consulta) => (
                <ConsultaCard key={consulta.id} consulta={consulta} />
            )}
            currentPage={currentPage}
            totalItems={totalItems}
            limit={limit}
            onPageChange={handlePageChange}
            onRefresh={handleRefresh}
            spinning={spinning}
            actionButtons={
                <>
                    <ActionButton onClick={() => setIsSearchModalOpen(true)}>Pesquisar Por Nome</ActionButton>
                    <ActionButton onClick={() => setIsSearchModalOpen(true)}>Pesquisar Por Data</ActionButton>
                    <ActionButton onClick={() => setIsCreateModalOpen(true)}>Cadastrar</ActionButton>
                </>
            }
        >
            <CreateConsultaModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => fetchItems(currentPage, searchParams)}
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