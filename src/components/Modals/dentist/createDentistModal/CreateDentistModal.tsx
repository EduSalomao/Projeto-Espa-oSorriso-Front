import { useState } from "react";
import * as S from "./CreateDentistModal.style";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type DentistFormData = {
  name: string;
  cro: string;
  phone: string;
  working_hours: string;
  email: string;
  address: string;
  notes: string;
  specialization: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateDentistModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<DentistFormData>({
    name: "",
    cro: "",
    phone: "",
    working_hours: "",
    email: "",
    address: "",
    notes: "",
    specialization: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Validação dos campos
    if (!form.name || !form.cro || !form.phone || !form.working_hours || !form.email || !form.specialization) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    // Validação de telefone (mínimo 10 dígitos)
    const telefoneLimpo = form.phone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10) {
      alert("Telefone inválido. Certifique-se de digitar pelo menos 10 números.");
      return;
    }
  
    try {
      console.log(form);
      const response = await fetch(`${BACKEND_URL}/dentistas/`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" }
      });
  
      if (!response.ok) {
        throw new Error("Erro ao adicionar dentista");
      }
  
      const data = await response.json();
      console.log(data);
      alert("Dentista cadastrado com sucesso!");
      navigate(`/pacientes/${data.data.id}`);
      onClose();
  
    } catch (error) {
      console.error("Erro ao adicionar paciente:", error);
      alert("Não foi possível cadastrar o paciente.");
    }
  };  

  const handleCancel = () => {
    console.log("Cancelado");
    onClose(); // fecha ao cancelar
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Novo Dentista</S.Title>
        <S.FormContainer>
        <S.FieldWrapper style={{ width: "70%" }}>
          <S.Label htmlFor="name">Nome</S.Label>
          <S.Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Digite o nome"
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.Label htmlFor="cro">CRO</S.Label>
          <S.Input
            name="cro"
            value={form.cro}
            onChange={handleChange}
          />
        </S.FieldWrapper>
        <S.FieldWrapper style={{ width: "40%" }}>
          <S.Label htmlFor="specialization">Especialização</S.Label>
        
          <S.Input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder=""
          />
        </S.FieldWrapper>
        <S.FieldWrapper  style={{ width: "20%" }}>
          <S.Label htmlFor="phone">Telefone</S.Label>
          
          <S.MaskedInput
            mask="(00) 00000-0000"
            value={form.phone}
            placeholder="(XX) XXXXX-XXXX"
            onAccept={(value: any) =>
              setForm((prev) => ({ ...prev, phone: value }))
            }
          />
        </S.FieldWrapper>
        <S.FieldWrapper style={{ width: "20%" }}>
          <S.Label htmlFor="working_hours">Horário de Trabalho</S.Label>
        
          <S.MaskedInput
            mask="00:00 - 00:00"
            name="working_hours"
            value={form.working_hours}
            placeholder="00:00 - 00:00"
            onAccept={(value: any) =>
              setForm((prev) => ({ ...prev, working_hours: value }))
            }
          />
        </S.FieldWrapper>
        <S.FieldWrapper style={{ width: "100%" }}>
          <S.Label htmlFor="email">Email</S.Label>
        
          <S.Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@example.com"
          />
        </S.FieldWrapper>
        <S.FieldWrapper style={{ width: "100%" }}>
          <S.Label htmlFor="address">Endereço</S.Label>
        
          <S.Input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Digite o endereço"
          />
        </S.FieldWrapper>
        <S.FieldWrapper style={{ width: "100%" }}>
          <S.Label htmlFor="notes">Notas</S.Label>
          <S.Input
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder=""
          />
        </S.FieldWrapper>
        </S.FormContainer>
        <S.ButtonGroup>
            <S.Button onClick={handleSave}>Salvar</S.Button>
            <S.CancelButton onClick={handleCancel} >Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default CreateDentistModal;
