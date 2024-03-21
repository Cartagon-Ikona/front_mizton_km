// Componente Hijo
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({ password, onPasswordChange }) {


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onPasswordChange(); // Llama a la función pasada por prop cuando el formulario se "envía"
  // };

  return (
    <Box
      component='form'
      // onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-password-input"
          label="Password"
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
