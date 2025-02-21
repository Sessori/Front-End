import React from "react";
import "./ButtonEntrar.css";

const ButtonEntrar = ({ onClick }) => {
  return (
    <button
      className="bttn-Entrar"
      onClick={onClick}
    >
      ENTRAR
    </button>
  );
};

export default ButtonEntrar;
