import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import mizton from "../img/mizton.png";
import PassText from "./PassText";
import { Stack } from "@mui/material";
import SendButton from "./SendButton";
import PasstextError from "./PasstextError";
// import DataContext from "../context/DataContext";

export default function ServerModal({ setLoging }) {
  // const context = React.useContext(DataContext);

  const [InputPassword, setInputPassword] = React.useState("");
  const [errorPass, setErrorPass] = React.useState();

  const handlePwdChange = (event) => {
    setInputPassword(event.target.value);
    console.log("password introdcida", event.target.value);
  };


  const getPass = async (pass) => {
    const url = "https://getmiztondata-dev.azurewebsites.net/api/getMondayData?";
  
    const datos = {
      'function': "get_pass",
      'passIn':pass
        
    };
    console.log("query", datos);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
  
      if (!response.ok) throw new Error("La petición falló");
      const data = await response.json();
      console.log("Respuesta:", data); // Mejor práctica es loguear la respuesta completa para depuración
      return data;
    } catch (error) {
      console.error("Error en la petición:", error);
      return null; // Devuelve un arreglo vacío en caso de error
    }
  };









  const handleSend = async () => {
    const response = await getPass(InputPassword);
   console.log("respuesta de getPass", response);
   console.log("entro en handleSend en logging al pulsar el boton");
    console.log("password esperada", response.value);
    

    if (response.value === true) {
      console.log("entro en if");
      setErrorPass(false);
      setLoging(true);
      setInputPassword("");
    } else {
      console.log("entro en else las contraseñas no coinciden");
      setErrorPass(true);
      setInputPassword("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        <Box
    sx={{
      position: "absolute",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 5, // usa el índice del tema para aplicar sombra
      p: { xs: 2, sm: 3, md: 4 }, // ajusta el padding según el tamaño de pantalla
      margin: 'auto', // Centra el Box en la pantalla
      width: {
        xs: '95%', // ocupa el 95% del ancho en pantallas extra pequeñas
        sm: '85%', // ocupa el 85% del ancho en pantallas pequeñas
        md: '75%', // ocupa el 75% del ancho en pantallas medianas
        lg: '65%', // ocupa el 65% del ancho en pantallas grandes
        xl: '55%' // ocupa el 55% del ancho en pantallas extra grandes
      },
      maxWidth: "300px", // Asegura que el Box no se expanda más de 600px
    }}
  >
        <img
          src={mizton}
          alt="Descripción de la imagen"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <Typography id="server-modal-title" variant="h6" component="h2">
        Acceso
        </Typography>
        <Stack direction="row" spacing={2}>
          {errorPass ? (
            <PasstextError
              password={InputPassword}
              onPasswordChange={handlePwdChange}
              handleSend = {handleSend}
            />
          ) : (
            <PassText
              password={InputPassword}
              onPasswordChange={handlePwdChange}
              handleSend = {handleSend}
            />
          )}
          <SendButton handleSend={handleSend} />
        </Stack>
      </Box>
    </Box>
  );
}
