import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import mizton from "../img/mizton.png";
import PassText from "./PassText";
import { Stack } from "@mui/material";
import SendButton from "./SendButton";
import PasstextError from "./PasstextError";
import DataContext from "../context/DataContext";

export default function ServerModal({ setLoging }) {
  const context = React.useContext(DataContext);

  const [InputPassword, setInputPassword] = React.useState("");
  const [errorPass, setErrorPass] = React.useState();

  const handlePwdChange = (event) => {
    setInputPassword(event.target.value);
    console.log("password introdcida", event.target.value);
  };

  const handleSend = async () => {
    console.log("entro en handleSend en logging al pulsar el boton");
    console.log("password esperada", context.pass);

    if (InputPassword === context.pass) {
      console.log("entro en if");
      setErrorPass(false);
      setLoging(true);
      setInputPassword("");
    } else {
      console.log("entro en else");
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
