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
    const url = "https://getmiztondata.azurewebsites.net/api/getMondayData";
  
    const datos = {
      'function': "get_pass",
      'passIn' : pass
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
          // width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: (theme) => theme.shadows[5],
          p: 4,
        }}
      >
        <img
          src={mizton}
          alt="Descripción de la imagen"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <Typography id="server-modal-title" variant="h6" component="h2">
          LOGGING
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
