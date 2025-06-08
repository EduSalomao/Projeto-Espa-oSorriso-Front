import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style'; 

const ProcedimentoCard = ({ id, name, description, price, duration }) => {
  const navigate = useNavigate();
  return (
    
    <Card data-id={id} onClick={() => navigate(`/procedimentos/${id}`)}>
      <CardTitle>{name}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>Descrição:</strong> {description}</CardInfo>
        <CardInfo><strong>Preço:</strong> R$ {price}</CardInfo>
        <CardInfo><strong>Duração:</strong> {duration} minutos</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default ProcedimentoCard;
