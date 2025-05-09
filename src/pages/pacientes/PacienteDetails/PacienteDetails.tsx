import {ContentSetOptionsMenu, ContentOptionsMenu, ContentDescriptionOptionsMenu, ContentTitleOptionsMenu, Line, ContainerOptionsMenu, OptionsMenu, DescriptionArea, Title, Data, ContainerDetails, ContainerAside, ContainerOptions, SidebarButtons, ActionButton } from "./PacienteDetails.style";
const PacienteDetails = () => {

    return (
    <ContainerDetails>
        <ContainerAside>
            <DescriptionArea>
                <Title>Michael Jackson de Souza</Title>
                <Data>Telefone: (38) 99123-5678</Data>
                <Data>CPF: 123.456.789.33</Data>
                <Data>Data de Nascimento: 01/01/1900</Data>
                <Data>Endereço: Rua teste</Data>
            </DescriptionArea>
            <ContainerOptions>
                <ContainerOptionsMenu>
                    <OptionsMenu>Ficha Clínica</OptionsMenu>
                    <OptionsMenu>Anamnese</OptionsMenu>
                    <OptionsMenu>Orçamentos</OptionsMenu>
                    <OptionsMenu selected={true}>Consultas</OptionsMenu>
                </ContainerOptionsMenu>
                <Line/>
                <ContentOptionsMenu>
                    <ContentSetOptionsMenu>
                        <ContentTitleOptionsMenu>Próximas Consultas</ContentTitleOptionsMenu>
                        <ContentDescriptionOptionsMenu>Não há nenhum agendamento</ContentDescriptionOptionsMenu>
                    
                    </ContentSetOptionsMenu>
                    <ContentSetOptionsMenu>
                        <ContentTitleOptionsMenu>Histórico de Consultas</ContentTitleOptionsMenu>
                        <ContentDescriptionOptionsMenu>Não há nenhum agendamento</ContentDescriptionOptionsMenu>
                    
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
}


export default PacienteDetails;