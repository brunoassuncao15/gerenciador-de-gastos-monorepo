import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const { nome } = location.state || { nome: "Usuário" };

  return (
    <div className="home-container">
      <h2>Bem-vindo, {nome}!</h2>
      {/* <form
        className="transaction-form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const fd = new FormData(form);
          const payload = {
            tipo: fd.get("tipo"),
            descricao: fd.get("descricao"),
            valor: Number(fd.get("valor")),
            data: fd.get("data"),
            categoria: fd.get("categoria"),
          };
          console.log("Nova transação:", payload);
          form.reset();
        }}
      >
        <div className="field">
          <label htmlFor="tipo">Tipo</label>
          <select id="tipo" name="tipo" defaultValue="entrada" required>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="descricao">Descrição</label>
          <input id="descricao" name="descricao" type="text" placeholder="Ex: Salário, Mercado" required />
        </div>

        <div className="field">
          <label htmlFor="valor">Valor</label>
          <input id="valor" name="valor" type="number" step="0.01" min="0" placeholder="0,00" required />
        </div>

        <div className="field">
          <label htmlFor="data">Data</label>
          <input id="data" name="data" type="date" required />
        </div>

        <div className="field">
          <label htmlFor="categoria">Categoria</label>
          <input id="categoria" name="categoria" type="text" placeholder="Ex: Alimentação, Transporte" />
        </div>

        <button type="submit">Adicionar</button>
      </form> */}
    </div>
  );
};

export default Home;
