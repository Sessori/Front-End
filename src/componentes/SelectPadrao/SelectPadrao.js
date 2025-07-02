import React, { useState } from "react";
import "./SelectPadrao.css";

/**
 * Componente genérico de seleção tipo dropdown.
 * Aceita opções no formato: { label: string, value: any }
 * Agora também aceita classes externas: wrapperClassName, labelClassName, buttonClassName, optionClassName
 */
const SelectPadrao = ({
  label = "",
  value,
  options = [],
  onChange,
  placeholder = "Selecione",
  wrapperClassName = "",
  labelClassName = "",
  buttonClassName = "",
  optionClassName = ""
}) => {
  const [aberto, setAberto] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setAberto(false);
  };

  const selectedLabel = options.find((op) => op.value === value)?.label || placeholder;

  return (
    <div className={`select-padrao-wrapper ${wrapperClassName}`}>
      {label && <span className={`select-padrao-label ${labelClassName}`}>{label}</span>}

      <button
        className={`dropdown-button ${aberto ? "dropdown-open" : ""} ${buttonClassName}`}
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
            <p
              key={idx}
              className={optionClassName}
              onClick={() => handleSelect(op.value)}
            >
              {op.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectPadrao;
