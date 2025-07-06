import { useEffect, useState } from "react";
import * as S from "./EditPatientModal.style";
import { useSnackbar } from 'notistack';


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
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar('Por favor, preencha todos os campos!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      return;
    }

    const cpfLimpo = form.cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      enqueueSnackbar('CPF inválido. Certifique-se de digitar 11 números!', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      return;
    }

    const telefoneLimpo = form.phone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10) {
      enqueueSnackbar('Telefone inválido. Certifique-se de digitar pelo menos 10 números!', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      return;
    }

    if (!form.birthdate) {
      enqueueSnackbar('Data de nascimento inválida.', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

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
      
      enqueueSnackbar('Paciente atualizada com successo!', { variant: 'success', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

      onClose(true, data.data);

    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      enqueueSnackbar('Não foi possível atualizar o paciente!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
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
            <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Container>
    </S.ModalOverlay>
  );
}

export default EditPacientModal;
