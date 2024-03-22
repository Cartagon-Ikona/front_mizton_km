import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import mizton from "../img/mizton.png";

const DataProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "https://getmiztondata.azurewebsites.net/api/getMondayData";

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'function': "get_items",
        }),
      });
  
      console.log("response = ", response);
  
      if (!response.ok)
        throw new Error("La petición falló");
  
      // Extrae los datos JSON de la respuesta
      const itemsData = await response.json();
      console.log("itemsData = ", itemsData);
  
      // Actualiza el estado con los datos obtenidos
      setItems(itemsData);
  
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
