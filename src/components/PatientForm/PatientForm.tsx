import { useState } from "react"
import Input from "../Input"
import FormActions from "../FormActions"
import * as S from "./PatientForm.style"

type PatientFormData = {
  name: string
  birthDate: string
  cpf: string
  phone: string
  address: string
}

function PatientForm() {
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
  }

  const handleCancel = () => {
    console.log("Cancelado")
  }

  return (
    <S.Container>
      <S.Title>Novo Paciente</S.Title>
      <Input label="Nome" name="name" value={form.name} onChange={handleChange} placeholder="Digite o nome" />
      <Input label="Data de Nascimento" name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
      <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} placeholder="XXX.XXX.XXX-XX" />
      <Input label="Telefone" name="phone" value={form.phone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
      <Input label="Endereço Residencial" name="address" value={form.address} onChange={handleChange} placeholder="Digite o endereço" />
      <FormActions onCancel={handleCancel} onSave={handleSave} />
    </S.Container>
  )
}

export default PatientForm
