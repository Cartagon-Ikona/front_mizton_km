// DataProvider.js
import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const url =
    "https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==";

  const fetchItems = async () => {
    const datos = {
      monday_request:
        "query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (!response.ok) throw new Error("La petición falló");
      const data = await response.json();
      console.log("items", data.data.boards[0].items_page.items);
      return data.data.boards[0].items_page.items; // Devuelve el array completo de ítems
    } catch (error) {
      console.error("Error en la petición:", error);
      return []; // Devuelve un arreglo vacío en caso de error
    }
  };

  useEffect(() => {
    fetchItems();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez, al montar el componente

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
