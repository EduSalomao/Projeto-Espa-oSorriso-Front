
import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style'; 

const PacienteCard = ({ id, nome, cpf, telefone, nascimento, endereco }) => {
  const navigate = useNavigate();
  return (
    
    <Card data-id={id} onClick={() => navigate(`/pacientes/${id}`)}>
      <CardTitle>{nome}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>CPF:</strong> {cpf}</CardInfo>
        <CardInfo><strong>Telefone:</strong> {telefone}</CardInfo>
        <CardInfo><strong>Data de nascimento:</strong> {nascimento.split("-").reverse().join("/")}</CardInfo>
        <CardInfo><strong>Endereço:</strong> {endereco}</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default PacienteCard;