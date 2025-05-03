import React from "react";
import "./ButtonSalvar.css";

const ButtonSalvar = ({ onClick }) => {
  return (
    <button className="btn-salvar" onClick={onClick}>
      SALVAR
    </button>
  );
};

export default ButtonSalvar;