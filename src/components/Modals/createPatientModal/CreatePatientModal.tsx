import { useState } from "react";
import Input from "../../Input";
import FormActions from "../../FormActions";
import * as S from "./CreatePatientModal.style";

type PatientFormData = {
  name: string;
  birthDate: string;
  cpf: string;
  phone: string;
  address: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CreatePatientModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<PatientFormData>({
    name: "",
    birthDate: "",
    cpf: "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(form);
    alert("Paciente salvo!");
    onClose(); // fecha o modal após salvar
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
        <Input
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Digite o nome"
        />
        <Input
          label="Data de Nascimento"
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
        />
        <Input
          label="CPF"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          placeholder="XXX.XXX.XXX-XX"
        />
        <Input
          label="Telefone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(XX) XXXXX-XXXX"
        />
        <Input
          label="Endereço Residencial"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Digite o endereço"
        />
        <FormActions onCancel={handleCancel} onSave={handleSave} />
      </S.Container>
    </S.ModalOverlay>
  );
}

export default CreatePatientModal;
