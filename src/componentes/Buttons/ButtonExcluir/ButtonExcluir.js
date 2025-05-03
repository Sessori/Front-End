import React from "react";
import "./ButtonExcluir.css";

const ButtonExcluir = ({ label, onClick }) => {
  return (
    <button className="btn-excluir btn-excluir-primary" onClick={onClick}>
      EXCLUIR
    </button>
  );
};

export default ButtonExcluir;
