
import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style'; 

const DentistaCard = ({ id, name, phone, cro, email, specialization, working_hours }) => {
  const navigate = useNavigate();
  return (
    
    <Card data-id={id} onClick={() => navigate(`/dentistas/${id}`)}>
      <CardTitle>{name}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>CRO:</strong> {cro}</CardInfo>
        <CardInfo><strong>Telefone:</strong> {phone}</CardInfo>
        <CardInfo><strong>E-Mail:</strong> {email}</CardInfo>
        <CardInfo><strong>Especialização:</strong> {specialization}</CardInfo>
        <CardInfo><strong>Horário de trabalho:</strong> {working_hours}</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default DentistaCard;