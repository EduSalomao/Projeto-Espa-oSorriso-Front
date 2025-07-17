import { getManutencoes } from "../../api/services/ManutencaoService";
import { getConsultas } from "../../api/services/ConsultaService";
import { Manutencao } from "../../api/types/manutencao";
import { Consulta } from "../../api/types/consulta";
import Calendar from "../../components/Calendar/Calendar";
import React, { useEffect, useState, useCallback } from "react";
import { ContainerAgenda, MainContainerAgendaContent } from "../../components/Containers/ContainerContent.style";

export default function Agenda() {
    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [limit] = useState(999999);
    
    const [spinning, setSpinning] = useState(false);
    
    const fetchItems = useCallback(async () => {
        setSpinning(true);
        try {
            const [manutencoesResponse, consultasResponse] = await Promise.all([
                getManutencoes({ limit }),
                getConsultas({ limit })
            ]);

            setManutencoes(manutencoesResponse.data.manutencoes);
            setConsultas(consultasResponse.data.consultas);

        } catch (error) {
            console.error("Erro ao carregar agenda:", error);
        } finally {
            setSpinning(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);
    
    return (
        <MainContainerAgendaContent>
            <ContainerAgenda>
                <Calendar manutencoes={manutencoes} consultas={consultas} />
            </ContainerAgenda>
        </MainContainerAgendaContent>
    );
}