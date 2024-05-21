import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import mizton from "../img/mizton.png";

const DataProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  // const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "https://getmiztondata.azurewebsites.net/api/getMondayData?";
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'function': "get_items",
        }),
      });
  // test respuesta function 2
      console.log("response.text = ", response.text());
  
      if (!response.ok)
        throw new Error("La petición falló");
  
      // Extrae los datos JSON de la respuesta
      console.log()
      const itemsData = await response.json();
  
      console.log("itemsData = ", itemsData);

          // Aquí comprobamos que la respuesta contiene el primer elemento con ID
    if (!(itemsData && itemsData[0] && itemsData[0].id)) {
      // Si no existe itemsData[0].id, lanzamos un error
      throw new Error("El primer elemento no tiene ID o itemsData está vacío");
    }
  
      // Actualiza el estado con los datos obtenidos
      setItems(itemsData);
  
      // Finalmente, establece loading en false
      setLoading(false);
    } catch (error) {
      console.error("Error en la petición:", error);
      setLoading(true); // También establece loading en false en caso de error para evitar un estado de carga infinito
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
    <DataContext.Provider value={{ items }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
