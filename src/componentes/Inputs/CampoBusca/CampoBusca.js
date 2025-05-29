import React from "react";
import "./CampoBusca.css";

const CampoBusca = ({ valor, onChange, placeholder }) => {
  return (
    <div className="campo-busca-container">
      <input
        type="text"
        className="campo-busca"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <img src="/icones/Busca.svg" alt="Buscar" className="icone-busca" />
    </div>
  );
};

export default CampoBusca;
