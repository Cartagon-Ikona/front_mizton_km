// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// // import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import { useEffect } from "react";

// export default function BasicTextFields() {
//   const [placa, setPlaca] = React.useState('');
//   const [kilometros, setKilometros] = React.useState('');
//   const [nombresDeItems, setNombresDeItems] = React.useState([]);

//   const handlePlacaChange = (event) => {
//     setPlaca(event.target.value);
//   };

//   const handleKilometrosChange = (event) => {
//     setKilometros(event.target.value);
//   };

//   const procesarDatos = (placa, kilometros) => {
//     console.log(`Procesando datos - Placa: ${placa}, Kilómetros: ${kilometros}`);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     procesarDatos(placa, kilometros);
//   };

//   useEffect(() => {
//     const url = 'https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==';
//     const datos = {
//       'monday_request': 'query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}'
//     };
//     // 'monday_request': 'query{  users{    id    name  }}'
//     fetch(url, {
//       method: 'POST', // Método HTTP
//       headers: {
//         'Content-Type': 'application/json', // Indica que el cuerpo de la solicitud es un JSON
//       },
//       body: JSON.stringify(datos), // Convertir el objeto datos a una cadena JSON
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json(); // Si la respuesta es exitosa, convertirla a JSON
//       }
//       throw new Error('La petición falló'); // Lanzar un error si la respuesta no es exitosa
//     })
//     .then(data => {
//       console.log('Petición exitosa:', data); // Procesar los datos recibidos
//       console.log('data', data.data.boards[0].items_page.items); // Procesar los datos recibidos
//       const itemsExtraidos = data.data.boards[0].items_page.items;
//         const nombres = itemsExtraidos.map(item => item.name);
//         setNombresDeItems(nombres);
//         // console.log('nombres de items',nombresDeItems)
//     })
//     .catch(error => {
//       console.error('Error en la petición:', error); // Manejar errores en la petición o en la conversión de la respuesta a JSON
//     });

//   }, []);

//   return (
//     nombresDeItems.length > 0 ?(

//       <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center', // Asegúrate de que esto tiene sentido con tu diseño. Si tu Box no tiene una altura definida, esto no tendrá mucho efecto.
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="placa" label="Placa" variant="outlined" value={placa} onChange={handlePlacaChange} />
//       <TextField id="km" label="Kilómetros" variant="outlined" value={kilometros} onChange={handleKilometrosChange} />
//       <Button type="submit" variant="contained">Enviar</Button>
//     </Box>
//     ):(
//       <h1>Cargando...</h1>
//   )

//   );
// }

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"; // Asegúrate de tener @mui/material instalado
import { obtenerItems, cambiarKm } from "./mondayFunctions";
import mizton from "../img/mizton.png";
import CircularProgress from '@mui/material/CircularProgress';
import DataContext from "../context/DataContext";

export default function BasicTextFields() {
  const context = React.useContext(DataContext);
  const items = context.items;

  const [placa, setPlaca] = useState("");
  const [kilometros, setKilometros] = useState("");
  // const [nombresDeItems, setNombresDeItems] = useState([]);
  const [error, setError] = useState(""); // Estado para mensajes de error
  // const [items, setItems] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemEncontrado = items.find((item) => item.name === placa);

    if (itemEncontrado) {
      procesarDatos(placa, kilometros);
      setError(""); // Limpia el mensaje de error si todo va bien
      cambiarKm(itemEncontrado.id, kilometros); // Llama a la función cambiarKm con los parámetros adecuados
      setPlaca("");
      setKilometros("");
    } else {
      setError("La placa introducida no está en la lista de ítems.");
    }
  };

  // useEffect(() => {
  //   const cargarItems = async () => {
  //     const itemsObtenidos = await obtenerItems();
  //     setItems(itemsObtenidos);
  //   };

  //   cargarItems();
  // }, []);

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
        {error && <Alert severity="error">{error}</Alert>}{" "}
        {/* Muestra el mensaje de error si existe */}
        {items.length > 0 ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="placa"
              label="Placa"
              variant="outlined"
              value={placa}
              onChange={handlePlacaChange}
            />
            <TextField
              id="km"
              label="Kilómetros"
              variant="outlined"
              value={kilometros}
              onChange={handleKilometrosChange}
            />
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
        )}
      </Box>
    </Box>
  );
}
