import React, { useState, useEffect } from "react";
import DataContext from "./DataContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DataProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "https://getmiztondata.azurewebsites.net/api/getMondayData?code=CkBipcFFq5sDG6O_OhiiZ5UFDP8cCzG8FPTT2I1FgAeQAzFu_VY4Ww==";

  const fetchData = async () => {
    // Combina ambos fetch en un array de promesas
    const fetchPromises = [
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          get_items: "query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}",
        }),
      }),
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          get_pass: "get_pass",
        }),
      })
    ];

    try {
      // Espera a que ambas promesas se resuelvan
      const responses = await Promise.all(fetchPromises);
      
      // Verifica si alguna de las respuestas no fue exitosa
      if (!responses[0].ok || !responses[1].ok) throw new Error("La petición falló");

      // Extrae los datos JSON de las respuestas
      const itemsData = await responses[0].json();
      const passData = await responses[1].json();

      // Actualiza los estados con los datos obtenidos
      console.log("itemsData.data.boards[0].items_page.items",itemsData.data.boards[0].items_page.items)
      setItems(itemsData.data.boards[0].items_page.items);
      console.log("passData",passData['pasword'])
      setPass(passData['pasword']); // Asegúrate de que la clave aquí coincide con la estructura de tu objeto JSON

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
    return <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>;
  }

  return <DataContext.Provider value={{ items, pass }}>{children}</DataContext.Provider>;
};

export default DataProvider;


// import React, { useState, useEffect } from "react";
// import DataContext from "./DataContext";

// const DataProvider = ({ children }) => {
//   const [items, setItems] = useState(null);
//   const [pass, setPass] = useState(null);
//   const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga

//   const url =
//     "https://getmiztondata.azurewebsites.net/api/getMondayData?code=CkBipcFFq5sDG6O_OhiiZ5UFDP8cCzG8FPTT2I1FgAeQAzFu_VY4Ww==";

//   const fetchItems = async () => {
//     setLoading(true); // Inicia la carga
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           get_items:
//             "query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}",
//         }),
//       });

//       if (!response.ok) throw new Error("La petición falló");
//       console.log("contentType");
//       console.log("response:", response);
//       const data = await response.json();
//       setItems(data.data.boards[0].items_page.items); // Actualiza los datos
//       setLoading(false); // Finaliza la carga
//     } catch (error) {
//       console.error("Error en la petición:", error);
//       // setLoading(false); // Asegúrate de manejar el estado de carga incluso en caso de error
//     }
//   };


//   const fetchpass = async () => {
//     setLoading(true); // Inicia la carga
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           get_pass:"get_pass",
//         }),
//       });

//       if (!response.ok) throw new Error("La petición falló");
//       console.log("contentType");
//       console.log("response:", response);
//       const data = await response.json();
//       console.log('data pass',data)
//       console.log('data["pasword"]',data['pasword'])
//       setPass(data['pasword']); // Actualiza los datos
//       setLoading(false); // Finaliza la carga
//     } catch (error) {
//       console.error("Error en la petición:", error);
//       // setLoading(false); // Asegúrate de manejar el estado de carga incluso en caso de error
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//     fetchpass(); 
//   }, []);

//   if (loading) {
//     return <div>Cargando datos...</div>; // Puedes personalizar este componente de carga como prefieras
//   }

//   return <DataContext.Provider items={items} pass = {pass}>{children}</DataContext.Provider>;
// };

// export default DataProvider;
