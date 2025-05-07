import { useState } from "react"
import FormActions from "../../FormActions"
import * as S from "./DeletePatientModal.style"

type PatientFormData = {
  name: string
  birthDate: string
  cpf: string
  phone: string
  address: string
}

type DeletePatientModalProps = {
  isOpen: boolean
  onClose: () => void
}

function DeletePatientModal({ isOpen, onClose }: DeletePatientModalProps) {
  const [form, setForm] = useState<PatientFormData>({
    name: "",
    birthDate: "",
    cpf: "",
    phone: "",
    address: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    console.log(form)
    alert("Paciente salvo!")
    onClose()
  }

  const handleCancel = () => {
    console.log("Cancelado")
    onClose()
  }

  if (!isOpen) return null

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Title>Excluir Paciente</S.Title>
        <FormActions onCancel={handleCancel} onSave={handleSave} />
      </S.ModalContent>
    </S.ModalOverlay>
  )
}

export default DeletePatientModal
