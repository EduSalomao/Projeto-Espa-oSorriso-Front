import { useEffect, useState } from "react";
import * as S from "./EditPatientModal.style";
import { useAlert } from "../../../../context/AlertContext";


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
  const { showAlert } = useAlert();

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

  if (!form.name || !form.birthdate || !form.cpf || !form.phone || !form.address) {
    showAlert({
        severity: "warning",
        message: "Por favor, preencha todos os campos."
      });
    return;
  }

  const cpfLimpo = form.cpf.replace(/\D/g, "");
  if (cpfLimpo.length !== 11) {
    showAlert({
      severity: "warning",
      message: "CPF inválido. Certifique-se de digitar 11 números."
    });
    return;
  }

  const telefoneLimpo = form.phone.replace(/\D/g, "");
  if (telefoneLimpo.length < 10) {
    showAlert({
      severity: "warning",
      message: "Telefone inválido. Certifique-se de digitar pelo menos 10 números."
    });
    return;
  }

  if (!form.birthdate) {
    showAlert({
      severity: "warning",
      message: "Data de nascimento inválida."
    });
    return;
  }

  try {
    console.log(form);
    const response = await fetch(`${BACKEND_URL}/pacientes/${paciente.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar paciente");
    }

    const data = await response.json();
    console.log(data);
    showAlert({
      severity: "success",
      message: "Paciente atualizado com sucesso!"
    });
    onClose(true, data.data);

  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    showAlert({
      severity: "error",
      message: "Não foi possível atualizar o paciente."
    });
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
