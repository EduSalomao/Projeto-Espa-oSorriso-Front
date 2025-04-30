type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    variant?: "primary" | "secondary"
  }
  
  function Button({ children, onClick, type = "button", variant = "primary" }: ButtonProps) {
    const colors = {
      primary: "#2E4A75",
      secondary: "#999"
    }
  
    return (
      <button
        type={type}
        onClick={onClick}
        style={{
          backgroundColor: colors[variant],
          color: "white",
          border: "none",
          padding: "10px 20px",
          margin: "0 5px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {children}
      </button>
    )
  }
  
  export default Button
  