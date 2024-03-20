// // DataProvider.js
// import React, { useState, useEffect } from "react";
// import DataContext from "./DataContext";

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState(null);

//   const url =
//     "https://getmiztondata.azurewebsites.net/api/getMondayData?code=inz_8EuMOC_3_JOKHyQXXgf3jZzCrq_sw8Jl4X8M0BKbAzFunnN7ew==";

//   const fetchItems = async () => {
//     const datos = {
//       monday_request:
//         "query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}",
//     };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(datos),
//       });

//       if (!response.ok) throw new Error("La petición falló");
//       const data = await response.json();
//       console.log("items", data.data.boards[0].items_page.items);
//       return data.data.boards[0].items_page.items; // Devuelve el array completo de ítems
//     } catch (error) {
//       console.error("Error en la petición:", error);
//       return []; // Devuelve un arreglo vacío en caso de error
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []); // El array vacío asegura que el efecto se ejecute solo una vez, al montar el componente

//   return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
// };

// export default DataProvider;



import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga

  const url = 
  "https://getmiztondata.azurewebsites.net/api/getMondayData?code=f9u-Sq2-C-_hooTqZn8xP2XxvQd1oKPeg-Y0xyX76BKxAzFuwSkTZA==";

  const fetchItems = async () => {
    setLoading(true); // Inicia la carga
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'get_items': "query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}"
        }),
      });

      if (!response.ok) throw new Error("La petición falló");
      console.log('contentType',)
      console.log("response:", response);
      const data = await response.json();
      setData(data.data.boards[0].items_page.items); // Actualiza los datos
      setLoading(false); // Finaliza la carga
    } catch (error) {
      console.error("Error en la petición:", error);
      // setLoading(false); // Asegúrate de manejar el estado de carga incluso en caso de error
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div>Cargando datos...</div>; // Puedes personalizar este componente de carga como prefieras
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;