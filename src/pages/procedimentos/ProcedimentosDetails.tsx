import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import {ContainerDetails, ContainerAside, DescriptionArea, Title, Data, ContainerOptions, ContainerOptionsMenu, OptionsMenu, Line, ContentOptionsMenu, ContentSetOptionsMenu, ContentTitleOptionsMenu, ContentDescriptionOptionsMenu, SidebarButtons, ActionButton} from "../../components/Containers/ContainerDetails.style"

type Procedimento = {
    name: string;
    description: string;
    price: number;
    duration: number;
};

const ProcedimentoDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id da URL
    const [procedimento, setProcedimento] = useState<Procedimento | null>(null);

    useEffect(() => {
        const fetchProcedimento = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/procedimentos/${id}`);
                const data = await response.json();
                setProcedimento(data);
            } catch (error) {
                console.error("Erro ao buscar procedimento:", error);
            }
        };

        if (id) {
            fetchProcedimento();
        }
    }, [id]);

    if (!procedimento) {
        return <div>Carregando...</div>;
    }

    return (
        <ContainerDetails>
            <ContainerAside>
                <DescriptionArea>
                    <Title>{procedimento.name}</Title>
                    <Data>Descrição: {procedimento.description}</Data>
                    <Data>Preço: R$ {procedimento.price}</Data>
                    <Data>Duração: {procedimento.duration} minutos</Data>
                </DescriptionArea>
                <ContainerOptions>
                    <ContainerOptionsMenu>
                        <OptionsMenu selected={true}>Informações</OptionsMenu>
                    </ContainerOptionsMenu>
                    <Line/>
                    <ContentOptionsMenu>
                        <ContentSetOptionsMenu>
                            <ContentTitleOptionsMenu>Detalhes</ContentTitleOptionsMenu>
                            <ContentDescriptionOptionsMenu>Aqui vão os detalhes do procedimento.</ContentDescriptionOptionsMenu>
                        </ContentSetOptionsMenu>
                    </ContentOptionsMenu>
                </ContainerOptions>
            </ContainerAside>
            <SidebarButtons>
                <ActionButton onClick={() => {}}>Editar</ActionButton>
                <ActionButton onClick={() => {}}>Excluir</ActionButton>
            </SidebarButtons>
        </ContainerDetails>
    );
};

export default ProcedimentoDetails;
