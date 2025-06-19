import { getManutencoes } from "../../api/services/ManutencaoService";
import { Manutencao } from "../../api/types/manutencao";
import Calendar from "../../components/Calendar/Calendar";
import React, { useEffect, useState, useCallback } from "react";
import { ContainerAgenda, MainContainerAgendaContent, MainContainerContent } from "../../components/Containers/ContainerContent.style";

export default function Agenda() {
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(999999);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [spinning, setSpinning] = useState(false);
    const fetchItems = useCallback(async () => {
        setSpinning(true);
        try {
            const response = await getManutencoes({ page: currentPage, limit });
            console.log("Manutenções fetched:", response.data);
            setManutencoes(response.data.manutencoes);
            setTotalItems(response.data.total);
        } catch (error) {
            console.error("Erro ao carregar manutenções:", error);
        } finally {
            setSpinning(false);
        }
    }, [currentPage, limit]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);
    
    console.log("Manutenções:", manutencoes);
    return (
        <MainContainerAgendaContent>
            <ContainerAgenda>
                <Calendar manutencoes={manutencoes} />
            </ContainerAgenda>
        </MainContainerAgendaContent>
    );
}