import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <h1>Bem-vindo ao Sistema de Reservas</h1>
          <h1>Sessori</h1>
          <p>
            Organize seus agendamentos de forma rápida e intuitiva.
            Escolha salas, horários e recursos com facilidade.
          </p>
        </div>
        <div className="home-image">
          <img src="/imagens/boas-vindas.svg" alt="Boas-vindas" />
        </div>
      </div>
    </div>
  );
};

export default Home;