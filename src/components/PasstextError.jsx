import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ValidationTextFields({ password, onPasswordChange }) {
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Previene el comportamiento predeterminado del formulario
  //   // Aquí puedes añadir lo que sucedería al enviar el formulario, si es necesario
  //   onPasswordChange()
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
          error
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={password} // Establece el valor utilizando las props
          onChange={onPasswordChange}
        />

      </div>

    </Box>
  );
}