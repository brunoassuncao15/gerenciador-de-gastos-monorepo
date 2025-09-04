import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/gestao", { state: { nome: data.usuario?.nome || "Usuário" } });
        setFormData({ email: "", senha: "" });
        // alert(data.mensagem);
      } else {
        alert("Erro: " + data.mensagem);
      }
    } catch (error) {
      // console.error("Erro ao enviar dados:", error);
      alert(error);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Conectar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <br />
      <a href="/cadastro">Não tem uma conta? Cadastre-se</a>
    </div>
  );
};

export default LoginForm;
