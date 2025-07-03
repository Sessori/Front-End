import React from "react";
import "./Home.css";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="page-container">
      {/* Faixa de fundo (hero section) */}
      <div className="hero-section">
        <div className="home-wrapper">
          <div className="home-text">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Bem-vindo à Plataforma Sessori
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Selecione uma das opções no menu lateral para começar.
            </motion.p>
          </div>

          <div className="home-image">
            <img
              src="/imagens/banner.png"
              alt="Imagem de boas-vindas"
              className="home-banner"
            />
          </div>
        </div>
      </div>

      {/* Rodapé com informações úteis */}
      <footer className="home-footer">
        <h2>Informações úteis:</h2>
        <ul>
          <li>As reservas devem ser feitas com no mínimo 24h de antecedência.</li>
          <li>Para dúvidas sobre uso ou permissões, entre em contato com o administrador do sistema.</li>
          <li>Alterações de reservas são notificadas automaticamente por WhatsApp, quando aplicável.</li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
