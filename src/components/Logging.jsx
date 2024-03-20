import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import mizton from '../img/mizton.png';
import PassText from './PassText';
import { Button, Stack } from '@mui/material';
import SendButton from './SendButton';
import { getPass } from './mondayFunctions'
import PasstextError from './PasstextError';

export default function ServerModal({setLoging}) {
  
  const [InputPassword, setInputPassword] = React.useState('');
  const [errorPass, setErrorPass] = React.useState();

  const handlePwdChange = (event) => {
    setInputPassword(event.target.value);
    console.log('password introdcida',event.target.value)
  };

  const handleSend = async () => {
    
   
    console.log('entro en handleSend en logging al pulsar el boton');
    
    const pwd = await getPass(); // Espera a que la promesa se resuelva y asigna el resultado a pwd
    console.log('password obtenida', pwd);
  
    const pwdResponse = pwd['pasword'];
    console.log('password esperada', pwdResponse);
    console.log('password introducida', InputPassword); // Usa el valor actual de InputPassword para la comparación
    
    // Usa directamente el valor introducido para comparar, en lugar del estado que acabas de actualizar.
    if (InputPassword === pwdResponse) {
      console.log('entro en if');
      setErrorPass(false);
      setLoging(true);
      setInputPassword('');
    } else {
      console.log('entro en else');
      setErrorPass(true);
      setInputPassword('');
    }
  };

  return (

    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">


     
        <Box
          sx={{
            position: 'absolute',
            // width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
            <img
            src={mizton}
            alt="Descripción de la imagen"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <Typography id="server-modal-title" variant="h6" component="h2">
          LOGGING
          </Typography>
          <Stack direction="row" spacing={2}>
          {errorPass
            ?<PasstextError password={InputPassword} onPasswordChange={handlePwdChange}/>
            :<PassText password={InputPassword} onPasswordChange={handlePwdChange}/>
            }
          <SendButton handleSend={handleSend}/>
          </Stack>
          
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            If you disable JavaScript, you will still see me.
          </Typography>
          
        </Box>
      
    </Box>
  );
}