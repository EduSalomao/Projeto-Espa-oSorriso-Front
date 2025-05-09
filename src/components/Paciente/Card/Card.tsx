
import { Card, CardTitle, CardInfo, CardLine, CardInfoGrid } from './Card.style'; 

const PacienteCard = ({ id, nome, cpf, telefone, nascimento, endereco }) => {
  return (
    <Card data-id={id}>
      <CardTitle>{nome}</CardTitle>
      <CardLine />
      <CardInfoGrid>
        <CardInfo><strong>CPF:</strong> {cpf}</CardInfo>
        <CardInfo><strong>Telefone:</strong> {telefone}</CardInfo>
        <CardInfo><strong>Data de nascimento:</strong> {nascimento}</CardInfo>
        <CardInfo><strong>Endereço:</strong> {endereco}</CardInfo>
      </CardInfoGrid>
    </Card>
  );
};

export default PacienteCard;