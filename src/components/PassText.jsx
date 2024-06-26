// Componente Hijo
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsTextFields({ password, onPasswordChange, handleSend }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // console.log("handlsubmit")
    handleSend()
  };



  return (

    
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={password} // Establece el valor utilizando las props
          onChange={onPasswordChange} // Maneja los cambios utilizando las props
        />
      </div>
    </Box>
  );
}
