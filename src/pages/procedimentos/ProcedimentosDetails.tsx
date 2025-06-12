import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerDetails, ContainerAside, DescriptionArea, Title, Data, ContainerOptions, ContainerOptionsMenu, OptionsMenu, Line, ContentOptionsMenu, ContentSetOptionsMenu, ContentTitleOptionsMenu, ContentDescriptionOptionsMenu, SidebarButtons, ActionButton } from "../../components/Containers/ContainerDetails.style";
import DentistaCard from "../../components/Card/dentista/Card";
import EditProcedureModal from "../../components/Modals/procedure/editProcedureModal/EditProcedureModal";
import DeleteProcedureModal from "../../components/Modals/procedure/deleteProcedureModal/DeleteProcedureModal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const mockDentists = [
  {
    id: "dentista1",
    name: "Dr. João Silva",
    cro: "12345",
    phone: "(11) 99999-9999",
    email: "joao@exemplo.com",
    specialization: "Ortodontia",
    working_hours: "08:00 - 18:00"
  },
  {
    id: "dentista2",
    name: "Dra. Maria Santos",
    cro: "54321",
    phone: "(21) 98888-8888",
    email: "maria@exemplo.com",
    specialization: "Endodontia",
    working_hours: "09:00 - 17:00"
  },
  {
    id: "dentista3",
    name: "Dr. Pedro Oliveira",
    cro: "67890",
    phone: "(31) 97777-7777",
    email: "pedro@exemplo.com",
    specialization: "Periodontia",
    working_hours: "10:00 - 19:00"
  }
];

type Procedimento = {
  id: number;
  name: string;
  type: string;
  duration: string;
  cost: string;
  dentists: string[];
  description: string;
  category: string;
  notes: string;
};

const ProcedimentoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [procedimento, setProcedimento] = useState<Procedimento | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProcedimento = async () => {
      try {
        // Simulação de fetch
        const mock = {
          id: 1,
          name: "Limpeza Dental",
          type: "Preventivo",
          duration: "60",
          cost: "150.00",
          dentists: ["dentista1", "dentista2"],
          description: "Limpeza completa dos dentes",
          category: "Higiene",
          notes: "Realizar a cada 6 meses"
        };
        setProcedimento(mock);
        // Descomente para usar backend:
        // const response = await fetch(`${BACKEND_URL}/procedimentos/${id}`);
        // const data = await response.json();
        // setProcedimento(data);
      } catch (error) {
        console.error("Erro ao buscar procedimento:", error);
      }
    };
    if (id) fetchProcedimento();
  }, [id]);

  if (!procedimento) return <div>Carregando...</div>;

  // Filtra os dentistas do mock que estão no procedimento
  const dentistasDoProcedimento = mockDentists.filter(d => procedimento.dentists.includes(d.id));

  return (
    <ContainerDetails>
      <ContainerAside>
        <DescriptionArea>
          <Title>{procedimento.name}</Title>
          <Data><b>Tipo:</b> {procedimento.type}</Data>
          <Data><b>Duração:</b> {procedimento.duration} minutos</Data>
          <Data><b>Custo:</b> R$ {procedimento.cost}</Data>
          <Data><b>Categoria:</b> {procedimento.category}</Data>
          <Data><b>Descrição:</b> {procedimento.description}</Data>
          <Data><b>Observações:</b> {procedimento.notes}</Data>
        </DescriptionArea>
        <ContainerOptions>
          <ContainerOptionsMenu>
            <OptionsMenu selected={true}>Dentistas que realizam este procedimento</OptionsMenu>
          </ContainerOptionsMenu>
          <Line/>
          <ContentOptionsMenu>
            {dentistasDoProcedimento.length === 0 ? (
              <ContentDescriptionOptionsMenu>Nenhum dentista cadastrado para este procedimento.</ContentDescriptionOptionsMenu>
            ) : (
              dentistasDoProcedimento.map(d => (
                <ContentSetOptionsMenu key={d.id}>
                  <DentistaCard {...d} />
                </ContentSetOptionsMenu>
              ))
            )}
          </ContentOptionsMenu>
        </ContainerOptions>
      </ContainerAside>
      <SidebarButtons>
        <ActionButton onClick={() => setIsEditModalOpen(true)}>Editar</ActionButton>
        <ActionButton onClick={() => setIsDeleteModalOpen(true)}>Excluir</ActionButton>
      </SidebarButtons>
      {/* Modais */}
      <EditProcedureModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} procedure={procedimento} />
      <DeleteProcedureModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); navigate('/procedimentos'); }} procedure={procedimento} />
    </ContainerDetails>
  );
};

export default ProcedimentoDetails;
