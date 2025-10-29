import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/index";
import CadastroForm from "./pages/cadastro/index";
import Home from "./pages/home";
import "./pages/Cadastro/index.css";
import "./App.css";
import { UsuarioProvider } from "./contexts/usuario-context";
import ListaTransacoes from "./pages/listaTransacoes";


function App() {
  return (
    <Router>
        <UsuarioProvider>
          <div className="app">
            <h1>Gerenciador de Gastos</h1>
            <hr />
            <Routes>
              <Route path="/" element={<><LoginForm /></>} />
              <Route path="/cadastro" element={<CadastroForm />} />
              <Route path="/gestao" element={<Home />} />
              <Route path="/lista-de-transacoes" element={<ListaTransacoes />} />
            </Routes>
          </div>
        </UsuarioProvider>
      </Router>
  );
}

export default App;
