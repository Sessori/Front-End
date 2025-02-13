import React from "react";
import "./ButtonIncluir.css";

const ButtonIncluir = ({ label, onClick }) => {
  return (
    <button className="btn-incluir btn-incluir-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonIncluir;

