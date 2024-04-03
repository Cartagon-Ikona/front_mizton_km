import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"; // Asegúrate de tener @mui/material instalado
import { cambiarKm } from "./mondayFunctions";
import mizton from "../img/mizton.png";
import CircularProgress from "@mui/material/CircularProgress";
import DataContext from "../context/DataContext";
import { Typography } from "@mui/material";

export default function BasicTextFields() {
  const context = React.useContext(DataContext);
  const items = context.items;

  const [placa, setPlaca] = useState("");
  const [kilometros, setKilometros] = useState("");
  // const [nombresDeItems, setNombresDeItems] = useState([]);
  const [error, setError] = useState(""); // Estado para mensajes de error
  const [cambioOk, setCambioOk] = useState(false);

  const handlePlacaChange = (event) => {
    setPlaca(event.target.value);
  };

  const handleKilometrosChange = (event) => {
    setKilometros(event.target.value);
  };

  const procesarDatos = (placa, kilometros) => {
    console.log(
      `Procesando datos - Placa: ${placa}, Kilómetros: ${kilometros}`
    );
    // Aquí puedes agregar la lógica que necesitas ejecutar si la placa está en la lista
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const kilometrosNum = Number(kilometros);

    if (isNaN(kilometrosNum)) {
      setError("Por favor, introduce un número válido de kilómetros.");
      return;
    }

    const itemEncontrado = items.find((item) => item.name === placa);

    if (itemEncontrado) {
      const kmActual = Number(itemEncontrado.value);
       console.log("kmActual = ", kmActual);

      if (kilometrosNum > kmActual + 1500) {
        setError(
          "Los kilómetros introducidos rebasan el límite diario"
        );
        return;
      }

      if (kilometrosNum < kmActual) {
        setError(
          "Los kilómetros introducidos no pueden ser inferiores a los actuales."
        );
        return;
      }

      procesarDatos(placa, kilometrosNum);
      setError("");

      try {
        const cambio = await cambiarKm(itemEncontrado.id, kilometrosNum);
        console.log("cambio = ", cambio);
        console.log("cambio.data = ", cambio.data);
        // Aquí verificas si la respuesta contiene el dato esperado
        if (cambio.data && cambio.data.change_simple_column_value) {
          console.log("Reporte enviado con éxito");
          setCambioOk(true); // Actualiza el estado para reflejar el éxito del cambio
          setPlaca("");
          setKilometros("");
        } else {
          // Si no existe 'change_column_value' en la respuesta, maneja como un error
          console.error("Fallo en el cambio.");
          setError("Hubo un fallo en el cambio de kilómetros.");
          setCambioOk(false); // Opcional, dependiendo de si quieres manejar este estado en caso de error
          setPlaca("");
          setKilometros("");
        }
      } catch (error) {
     //   console.error("Error al cambiar los km:", error);
        setError("Hubo un error al procesar el cambio de kilómetros.");
        setCambioOk(false); // Actualiza el estado para reflejar el fallo en el cambio
        setPlaca("");
        setKilometros("");
      }
    } else {
      setError("El número de serie es incorrecto");
      setPlaca("");
      setKilometros("");
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
        {cambioOk === false && error && <Alert severity="error">{error}</Alert>}
        <p></p>
        {cambioOk === true ? (
          // Si cambioOk es true, muestra un texto de éxito
          <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
            Reporte enviado con éxito
          </Typography>
        ) : items.length > 0 ? (
          // Si cambioOk es false o null y hay items, muestra el formulario
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "& > :not(style)": {  width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="placa"
              label="Número de serie"
              variant="outlined"
              value={placa}
              onChange={handlePlacaChange}
            />
            <Typography variant="caption" component="h2" sx={{ mt: 0 }}>
            últimos 6 dígitos
            </Typography>
            <TextField
              id="km"
              label="Kilometraje actual"
              variant="outlined"
              value={kilometros}
              onChange={handleKilometrosChange}
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Box>
        ) : (
          // Si no hay items, muestra el CircularProgress
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
