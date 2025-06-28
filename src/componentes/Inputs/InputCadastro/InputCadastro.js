import React from "react";
import "./InputCadastro.css";

const InputCadastro = ({ label, type = "text", value, onChange, disabled = false, visualOnly = false }) => {
  return (
    <div className="input-cadastro-container">
      {label && <label className="input-cadastro-label">{label}</label>}
      {visualOnly ? (
        <div className="input-cadastro-visual">{value}</div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input-cadastro-field"
        />
      )}
    </div>
  );
};

export default InputCadastro;
