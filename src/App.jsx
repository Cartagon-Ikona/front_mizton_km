import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Formulario from "./components/Formulario";
import Logging from "./components/Logging";
// import PasstextError from "./components/PasstextError";
// import SendButton from "./components/SendButton";
// import { ContextProvider } from "./context/Get_context";
import DataProvider from "./context/DataProvider";

function App() {
  const [login, setLoging] = useState(false);

  console.log("estado de logging en app", login);
  // const handleLogin = async() => {
  //   console.log('Entro en handleLogin de app.jsx')
  //   setLoging(true);
  //   // console.log('login en app.jsx',login)
  // }

  // useEffect(() => {
  //   console.log('login actualizado en App:', login);
  // }, [login]);

  // useEffect(() => {
  //   if (login=) {
  //     setPasword(true);
  //   }
  // // }, [login])

  // useEffect(() => {
  //   console.log(`Estado de login actualizado: ${login}`);
  // }, [login]);

  // useEffect(() => {
  //   if (login) {
  //     console.log(
  //       "El usuario se ha autenticado, puedes realizar acciones post-login aquí"
  //     );
  //     // Aquí puedes colocar cualquier código que necesites ejecutar después del login.
  //     // Por ejemplo, redirigir al usuario a otra página o cargar datos específicos del usuario.
  //   }
  // }, [login]);

  return (
    <DataProvider>
      <div className="App">
        {/* <Logging handleLogin={handleLogin}/> */}
        {login ? <Formulario /> : <Logging setLoging={setLoging} />}
      </div>
    </DataProvider>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload y he cambiado en app.jsx.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
