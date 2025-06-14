// src/components/Card/procedimento/Card.tsx
import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style';
import { Procedimento } from '../../../api/types/procedimento';

interface ProcedimentoCardProps {
  procedimento: Procedimento;
}

const ProcedimentoCard = ({ procedimento }: ProcedimentoCardProps) => {
  const navigate = useNavigate();

  return (
    <Card data-id={procedimento.id} onClick={() => navigate(`/procedimentos/${procedimento.id}`)}>
      <CardTitle>{procedimento.name}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>Tipo:</strong> {procedimento.tipo}</CardInfo>
        <CardInfo><strong>Custo:</strong> R$ {procedimento.custo.toFixed(2)}</CardInfo>
        <CardInfo><strong>Duração:</strong> {procedimento.duracao}</CardInfo>
        <CardInfo><strong>Categoria:</strong> {procedimento.categoria || 'N/A'}</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default ProcedimentoCard;