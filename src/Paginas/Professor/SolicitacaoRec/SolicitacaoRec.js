import React from "react";
import "./SolicitacaoRec.css";
import { motion } from "framer-motion";

const SolicitacaoRec = () => {
  return (
    <div className="solrec-page-container">
      <div className="solrec-wrapper">
        <div className="solrec-text">
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

        <div className="solrec-image">
          <img
            src="/imagens/logoemconstrucao.png"
            alt="Imagem ilustrativa"
            className="solrec-banner"
          />
        </div>
      </div>
    </div>
  );
};

export default SolicitacaoRec;
