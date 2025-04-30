type InputProps = {
    label: string
    type?: string
    value: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
  }
  
  function Input({ label, type = "text", value, onChange, placeholder, name }: InputProps) {
    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>{label}</label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            padding: "8px",
            width: "80%",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
      </div>
    )
  }
  
  export default Input
  