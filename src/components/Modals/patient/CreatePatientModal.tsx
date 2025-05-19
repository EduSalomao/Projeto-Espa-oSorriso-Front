import FormModal from "../FormModal";
import PatientForm from "../../../forms/paciente/CreatePacienteForm";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useSnackbar } from 'notistack';
import { useState } from "react";

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

    const { enqueueSnackbar } = useSnackbar();
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
        // Validação dos campos
        if (!form.name || !form.birthdate || !form.cpf || !form.phone || !form.address) {

            enqueueSnackbar('Por favor, preencha todos os campos.', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

            return;
        }

        // Validação de CPF (11 dígitos)
        const cpfLimpo = form.cpf.replace(/\D/g, "");
        if (cpfLimpo.length !== 11) {

            enqueueSnackbar('CPF inválido. Certifique-se de digitar 11 números.', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

            return;
        }

        // Validação de telefone (mínimo 10 dígitos)
        const telefoneLimpo = form.phone.replace(/\D/g, "");
        if (telefoneLimpo.length < 10) {

            enqueueSnackbar('Telefone inválido. Certifique-se de digitar pelo menos 10 números.', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

            return;
        }

        // Validação de data de nascimento
        if (!form.birthdate) {

            enqueueSnackbar('Data de nascimento inválida.', { variant: 'warning', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

            return;
        }

        try {
            console.log(form);
            const response = await fetch(`${BACKEND_URL}/pacientes/`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar paciente");
            }

            const data = await response.json();
            console.log(data);

            enqueueSnackbar('Paciente cadastrado com sucesso!', { variant: 'success', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

            navigate(`/pacientes/${data.data.id}`);
            onClose();

        } catch (error) {
            console.error("Erro ao adicionar paciente:", error);
            enqueueSnackbar('Erro ao adicionar paciente!', { variant: 'error', autoHideDuration: 4000, TransitionProps: { direction: 'down' }, anchorOrigin: { vertical: 'top', horizontal: 'center' } });

        }

    };

    const handleCancel = () => {
        console.log("Cancelado");
        onClose(); // fecha ao cancelar
    };

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Novo Paciente"
            onSubmit={handleSave}
        >
            <PatientForm form={form} setForm={setForm} />
        </FormModal>
    );
}
