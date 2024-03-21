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
