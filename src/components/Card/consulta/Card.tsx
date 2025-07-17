import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style';
import { Consulta } from '../../../api/types/consulta';

interface ConsultaCardProps {
  consulta: Consulta;
}

const ConsultaCard = ({ consulta }: ConsultaCardProps) => {
  const navigate = useNavigate();
  const dataFormatada = new Date(consulta.data_hora).toLocaleString('pt-BR');

  return (
    <Card data-id={consulta.id} onClick={() => navigate(`/consultas/${consulta.id}`)}>
      <CardTitle>Paciente: {consulta.paciente_nome}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>Data e Hora:</strong> {dataFormatada}</CardInfo>
        <CardInfo><strong>Dentista:</strong> {consulta.dentista_nome}</CardInfo>
        <CardInfo><strong>Duração:</strong> {" "}
          {consulta.duracao && consulta.duracao.length === 8
            ? consulta.duracao.slice(0, 5)
            : consulta.duracao}
        </CardInfo>
        <CardInfo><strong>Motivo:</strong> {consulta.motivo}</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default ConsultaCard;