import React, { useState } from "react";
import "./SelectPadrao.css";

/**
 * Componente genérico de seleção tipo dropdown.
 * Aceita opções no formato: { label: string, value: any }
 */
const SelectPadrao = ({ label = "", value, options = [], onChange, placeholder = "Selecione" }) => {
  const [aberto, setAberto] = useState(false);

  // Trata seleção de uma opção
  const handleSelect = (val) => {
    onChange(val);
    setAberto(false);
  };

  // Encontra o label da opção selecionada
  const selectedLabel = options.find((op) => op.value === value)?.label || placeholder;

  return (
    <div className="select-padrao-wrapper">
      {label && <span className="select-padrao-label">{label}</span>}
      <button
        className={`dropdown-button ${aberto ? "dropdown-open" : ""}`}
        onClick={() => setAberto((prev) => !prev)}
      >
        <span className={value ? "dropdown-value" : "dropdown-placeholder"}>
          {selectedLabel}
        </span>
        <img src="/icones/dropdown.svg" alt="Abrir" className="dropdown-icon" />
      </button>
      {aberto && (
        <div className="opcoes" onMouseLeave={() => setAberto(false)}>
          {options.map((op, idx) => (
            <p key={idx} onClick={() => handleSelect(op.value)}>
              {op.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectPadrao;
