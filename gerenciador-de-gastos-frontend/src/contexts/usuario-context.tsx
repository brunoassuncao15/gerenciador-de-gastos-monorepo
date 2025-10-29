import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarTransacoes, loginUsuario, salvarTransacao } from '../service/services';
import { useQuery } from '@tanstack/react-query';

interface Usuario {
    id: string;
    nome: string;
    email: string;
}

interface Transacao {
    usuarioId: number;
    tipo: string;
    descricao: string;
    valor: number;
    data: string;
}

interface UsuarioContextType {
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario | null) => void;
    nome: string;
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    transacao: Transacao;
    setTransacao: (transacao: Transacao) => void;
    handleSaveTransacao: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    loginFormData: {
        email: string;
        senha: string;
    };
    setLoginFormData: (loginFormData: { email: string; senha: string; }) => void;
    fetchTransacoes: ReturnType<typeof useQuery>;
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

  useEffect(() => {
    if (id) {
      setTransacao({ ...transacao, usuarioId: id });
    }
  }, [id]);

 const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUsuario(loginFormData);
      if (data.usuario) {
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

  const handleSaveTransacao = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await salvarTransacao(transacao);
      if (!data || !data.mensagem) throw new Error();
      if (data.mensagem.toLowerCase().includes("sucesso")) {
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
    const fetchTransacoes = useQuery({
        queryKey: ['transacoes', id],
        queryFn: () => buscarTransacoes(id),
        enabled: !!id,
    });

    console.log(fetchTransacoes.data);
    console.log(id);

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
        setLoginFormData,
        fetchTransacoes,
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
