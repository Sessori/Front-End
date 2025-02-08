import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token ao sair
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="Home">
      {/* Conteúdo Principal */}
      <div className="Home-content">
        <header>
          <h1>Bem-vindo ao Sessori!</h1>
        </header>
        <main>
          <p>Aqui você pode gerenciar reservas de espaços educacionais.</p>
          <button onClick={handleLogout}>Sair</button>
        </main>
      </div>
    </div>
  );
};

export default Home;
