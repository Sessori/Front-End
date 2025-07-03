import React from "react";
import "./NotificarAlunos.css";
import { motion } from "framer-motion";

const NotificarAlunos = () => {
  return (
    <div className="notificar-page-container">
      <div className="notificar-wrapper">
        <div className="notificar-text">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Página em construção
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Em breve você poderá utilizar todos os recursos desta página.
          </motion.p>
        </div>

        <div className="notificar-image">
          <img
            src="/imagens/logoemconstrucao.png"
            alt="Imagem ilustrativa"
            className="notificar-banner"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificarAlunos;
