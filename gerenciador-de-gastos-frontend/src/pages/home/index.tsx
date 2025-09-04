import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const { nome } = location.state || { nome: "Usuário" };

  return (
    <div className="home-container">
      <h2>Bem-vindo, {nome}!</h2>
    </div>
  );
};

export default Home;
