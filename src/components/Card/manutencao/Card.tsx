import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style';
import { Manutencao } from '../../../api/types/manutencao';

interface ManutencaoCardProps {
  manutencao: Manutencao;
}

const ManutencaoCard = ({ manutencao }: ManutencaoCardProps) => {
  const navigate = useNavigate();
  const dataFormatada = new Date(manutencao.data_hora).toLocaleString('pt-BR');

  return (
    <Card data-id={manutencao.id} onClick={() => navigate(`/manutencoes/${manutencao.id}`)}>
      <CardTitle>Paciente: {manutencao.paciente_nome}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>Data e Hora:</strong> {dataFormatada}</CardInfo>
        <CardInfo><strong>Dentista:</strong> {manutencao.dentista_nome}</CardInfo>
        <CardInfo><strong>Duração:</strong> {" "}
  {manutencao.duracao && manutencao.duracao.length === 8
    ? manutencao.duracao.slice(0, 5)
    : manutencao.duracao}</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default ManutencaoCard;