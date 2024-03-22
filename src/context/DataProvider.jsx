import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import mizton from "../img/mizton.png";

const DataProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);

  const passEnv = process.env.REACT_APP_PASS;
  console.log("passEnv = ", passEnv);

  const url = "https://getmiztondata.azurewebsites.net/api/getMondayData";

  const fetchData = async () => {
    // Combina ambos fetch en un array de promesas
    const fetchPromises = [
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          get_items: "get_items",
        }),
      }),
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          get_pass: "get_pass",
        }),
      }),
    ];

    try {
      // Espera a que ambas promesas se resuelvan
      const responses = await Promise.all(fetchPromises);
      console.log("responses = ", responses);
      console.log("responses[0] = ", responses[0]);
      console.log("responses[1] = ", responses[1]);

      // Verifica si alguna de las respuestas no fue exitosa
      if (!responses[0].ok || !responses[1].ok)
        throw new Error("La petición falló");

      // Extrae los datos JSON de las respuestas
      const itemsData = await responses[0].json();
      console.log("itemsData = ", itemsData);
      const passData = await responses[1].json();
      console.log("passData = ", passData);

      // Actualiza los estados con los datos obtenidos
      console.log("itemsData.data.boards[0].items_page.items", itemsData);
      setItems(itemsData);
      console.log("passData", passData["pasword"]);
      setPass(passData["pasword"]); // Asegúrate de que la clave aquí coincide con la estructura de tu objeto JSON

      // Finalmente, establece loading en false
      setLoading(false);
    } catch (error) {
      console.error("Error en la petición:", error);
      setLoading(false); // También establece loading en false en caso de error para evitar un estado de carga infinito
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          sx={{
            display: "flex", // Añade esto
            flexDirection: "column", // Cambia la dirección del flexbox a columna
            justifyContent: "center", // Centra los elementos verticalmente
            alignItems: "center", // Centra los elementos horizontalmente
            position: "absolute",
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
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <DataContext.Provider value={{ items, pass }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
