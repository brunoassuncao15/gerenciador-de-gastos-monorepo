import CadastroForm from "./pages/Cadastro";
import LoginForm from "./pages/Login";
import "./pages/Cadastro/index.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <h1>Gerenciador de Gastos</h1>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Ir para Cadastro" : "Ir para Login"}
      </button>
      <hr />
      {isLoggedIn ? <LoginForm /> : <CadastroForm />}
    </div>
  );
}

export default App;
