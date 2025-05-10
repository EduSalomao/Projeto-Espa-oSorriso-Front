import { useEffect, useState } from "react";
import * as S from "./EditPatientModal.style";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type PatientFormData = {
  name: string;
  birthdate: string;
  cpf: string;
  phone: string;
  address: string;
};

type Props = {
    paciente: {
        id: string;
        name: string;
        birthdate: string;
        cpf: string;
        phone: string;
        address: string;
    };
    isOpen: boolean;
    onClose: (isUpdated, paciente) => void;
};

function EditPacientModal({ paciente, isOpen, onClose }: Props) {
  const [form, setForm] = useState<PatientFormData>({
    name: paciente.name,
    birthdate: paciente.birthdate,
    cpf: paciente.cpf,
    phone: paciente.phone,
    address: paciente.address,
  });
  
  useEffect(() => {
    setForm({
      name: paciente.name,
      birthdate: paciente.birthdate,
      cpf: paciente.cpf,
      phone: paciente.phone,
      address: paciente.address,
    }); 
  }, [paciente]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
        console.log(form);
        const response = await fetch(`${BACKEND_URL}/pacientes/${paciente.id}`, {method: "PUT", body: JSON.stringify(form), headers: {"Content-Type": "application/json"}});
        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error("Erro ao adicionar paciente");
        }
        const data = await response.json();
        console.log(data)
        onClose(true, data.data);
    } catch (error) {
        console.error("Erro ao adicionar paciente:", error);
    }

    
  };

  const handleCancel = () => {
    console.log("Cancelado");
    onClose(false, {}); // fecha ao cancelar
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Editar Paciente</S.Title>
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
          <S.Label htmlFor="birthdate">Data de Nascimento</S.Label>
          <S.Input
            name="birthdate"
            type="date"
            value={form.birthdate}
            onChange={handleChange}
          />
        </S.FieldWrapper>
        <S.FieldWrapper style={{ width: "60%" }}>
          <S.Label htmlFor="cpf">CPF</S.Label>
          <S.Input
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            placeholder="XXX.XXX.XXX-XX"
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.Label htmlFor="phone">Telefone</S.Label>
          <S.Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(XX) XXXXX-XXXX"
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
        </S.FormContainer>
        <S.ButtonGroup>
            <S.Button onClick={handleSave}>Salvar</S.Button>
            <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default EditPacientModal;
