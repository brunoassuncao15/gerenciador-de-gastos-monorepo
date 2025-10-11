import { createContext, use, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Usuario {
    id: string;
    nome: string;
    email: string;
}

interface UsuarioContextType {
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario | null) => void;
    nome: string;
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    transacao: {
        usuarioId: number;
        tipo: string;
        valor: number;
        descricao: string;
        data: string;
    };
    setTransacao: (transacao: { usuarioId: number; tipo: string; descricao: string; valor: number; data: string; }) => void;
    handleSaveTransacao: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    loginFormData: {
        email: string;
        senha: string;
    };
    setLoginFormData: (loginFormData: { email: string; senha: string; }) => void;
}

const UsuarioContext = createContext<UsuarioContextType>({} as UsuarioContextType);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { nome, id } = location.state || { nome: "Usuário", id: 0 };
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [transacao, setTransacao] = useState({
    usuarioId: 0,
    tipo: "entrada",
    valor: 0,
    descricao: "",
    data: "",
  });

   const [loginFormData, setLoginFormData] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();

      if (response.ok) {
    navigate("/gestao", { state: { nome: data.usuario?.nome || "Usuário", id: data.usuario?.id || 0, email: data.usuario?.email || "" } });
        setLoginFormData({ email: "", senha: "" });
        setTransacao({ ...transacao, usuarioId: data.usuario?.id });
      } else {
        alert("Erro: " + data.mensagem);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (id) {
      setTransacao({ ...transacao, usuarioId: id });
    }
  }, [id]);

  const handleSaveTransacao = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/transacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transacao),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Transação adicionada com sucesso!");
        setTransacao({
          usuarioId: id,
          tipo: "entrada",
          descricao: "",
          valor: 0,
          data: "",
        });
      } else {
        alert("Erro ao adicionar transação: " + data.mensagem);
      }
    } catch (error) {
      alert("Ocorreu um erro ao adicionar a transação.");
    }
  };

    const contextValue: UsuarioContextType = {
        usuario,
        setUsuario,
        nome,
        handleLogin,
        handleInputChange,
        transacao,
        setTransacao,
        handleSaveTransacao,
        loginFormData,
        setLoginFormData
    };

    return (
        <UsuarioContext.Provider value={contextValue}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario deve ser usado dentro de UsuarioProvider');
    }
    return context;
};
