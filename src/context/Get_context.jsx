// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';


// const getPass = createContext(null);

// export const useGetPass = () => useContext(getPass);

// export const ContextProvider = ({ children }) => {

//   const [password, setPassword] = useState(null)
//   const[items, setItems] = useState(null)



//   const hasFetched = useRef(false);




// //   const obtenerItems = async () => {
// //     const url = 'https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==';
// //     const datos = {
// //         'monday_request': 'query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}'
// //     };

// //     try {
// //         const response = await fetch(url, {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(datos),
// //         });

// //         if (!response.ok) throw new Error('La petición falló');
// //         const data = await response.json();
// //         console.log('items',data.data.boards[0].items_page.items)
// //         const items = data.data.boards[0].items_page.items
// //         setItems (items); // Devuelve el array completo de ítems
// //     } catch (error) {
// //         console.error('Error en la petición:', error);
// //         return []; // Devuelve un arreglo vacío en caso de error
// //     }
// // };

// // const getPass = async () => {
// //   const url = 'https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==';
  
// //   const datos = {
// //   'get_pass': 'get_pass'
// //   };
// //   console.log('query', datos)
// //   try {
// //       const response = await fetch(url, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(datos),
// //       });

// //       if (!response.ok) throw new Error('La petición falló');
// //       const data = await response.json();
// //       console.log('Respuesta:', data); // Mejor práctica es loguear la respuesta completa para depuración
// //       setPassword(data);
// //   } catch (error) {
// //       console.error('Error en la petición:', error);
// //       return null; // Devuelve un arreglo vacío en caso de error
// //   }
// // };


// //   useEffect(() => {
    
      
// //       console.log('emtro en useEffect llamada a la function comprobar_tabla_data')
// //       // obtenerItems()
// //       getPass()
// //       obtenerItems()
      
// //   }, []);

//   return (
//     <ContextProvider.Provider value={{  }}>
//       {children}
//     </ContextProvider.Provider>
//   );
// };




// Contexto.js
import React from 'react';

const MiContexto = React.createContext(); // valorInicial es opcional

export default MiContexto;