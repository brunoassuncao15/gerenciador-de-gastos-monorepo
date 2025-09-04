import React, { useState } from "react";
import "./index.css";

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensagem);
        setFormData({
          nome: "",
          email: "",
          senha: "",
        });
      } else {
        alert("Erro: " + data.mensagem);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Ocorreu um erro ao tentar se conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastre-se</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <button type="submit">Cadastrar</button>
      </form>
      <br />
      <a href="/">Já tem uma conta? Faça login</a>
    </div>
  );
};

export default CadastroForm;
