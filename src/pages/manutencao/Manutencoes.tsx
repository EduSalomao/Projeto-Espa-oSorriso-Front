import React, { useEffect, useState, useCallback } from "react";
import { CardListView } from "../../components/Containers/CardListView";
import CreateManutencaoModal from "../../components/Modals/manutencao/CreateManutencaoModal";
import SearchManutencaoModal from "../../components/Modals/manutencao/SearchManutencaoModal";
import ManutencaoCard from "../../components/Card/manutencao/Card";
import { ActionButton } from "../../components/Buttons/Button.style";
import { getManutencoes } from "../../api/services/ManutencaoService";
import { Manutencao } from "../../api/types/manutencao";

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
            onRefresh={fetchItems}
            spinning={spinning}
            actionButtons={
                <>
                    <ActionButton onClick={() => setIsSearchModalOpen(true)}>Pesquisar</ActionButton>
                    <ActionButton onClick={() => setIsCreateModalOpen(true)}>Cadastrar</ActionButton>
                </>
            }
        >
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