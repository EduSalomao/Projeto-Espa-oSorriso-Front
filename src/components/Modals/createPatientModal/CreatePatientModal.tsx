import { useState } from "react";
import Input from "../../Input";
import FormActions from "../../FormActions";
import * as S from "./CreatePatientModal.style";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type PatientFormData = {
  name: string;
  birthdate: string;
  cpf: string;
  phone: string;
  address: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CreatePatientModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<PatientFormData>({
    name: "",
    birthdate: "",
    cpf: "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
        console.log(form);
        const response = await fetch(`${BACKEND_URL}/pacientes/`, {method: "POST", body: JSON.stringify(form), headers: {"Content-Type": "application/json"}});
        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error("Erro ao adicionar paciente");
        }
        const data = await response.json();
        console.log(data)
        navigate(`/pacientes/${data.data.id}`);
    } catch (error) {
        console.error("Erro ao adicionar paciente:", error);
    }

    onClose();
  };

  const handleCancel = () => {
    console.log("Cancelado");
    onClose(); // fecha ao cancelar
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.Container>
        <S.Title>Novo Paciente</S.Title>
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
          <S.MaskedInput
            mask="000.000.000-00"
            value={form.cpf}
            placeholder="xxx.xxx.xxx-xx"
            onAccept={(value: any) =>
              setForm((prev) => ({ ...prev, cpf: value }))
            }
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
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
            <S.CancelButton onClick={handleCancel} >Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default CreatePatientModal;
