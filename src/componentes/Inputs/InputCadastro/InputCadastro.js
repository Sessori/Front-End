import React from "react";
import "./InputCadastro.css";

const InputCadastro = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="input-cadastro-container">
      {label && <label className="input-cadastro-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input-cadastro-field"
      />
    </div>
  );
};

export default InputCadastro;
