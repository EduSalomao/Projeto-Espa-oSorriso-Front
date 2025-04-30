import Button from "../Button"

type FormActionsProps = {
  onCancel: () => void
  onSave: () => void
}

function FormActions({ onCancel, onSave }: FormActionsProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button variant="primary" onClick={onSave}>Salvar</Button>
      <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
    </div>
  )
}

export default FormActions
