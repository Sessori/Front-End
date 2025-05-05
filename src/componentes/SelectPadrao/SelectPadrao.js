import React, { useState } from "react";
import "./SelectPadrao.css";

const SelectPadrao = ({ label = "", value, options = [], onChange }) => {
  const [aberto, setAberto] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setAberto(false);
  };

  return (
    <div className="select-padrao-wrapper">
      {label && <span className="select-padrao-label">{label}</span>}
      <button
        className={`dropdown-button ${aberto ? "dropdown-open" : ""}`}
        onClick={() => setAberto((prev) => !prev)}
      >
        <span className={value ? "dropdown-value" : "dropdown-placeholder"}>
            {value || ""}
        </span>
        <img src="/icones/dropdown.svg" alt="Abrir" className="dropdown-icon" />
      </button>
      {aberto && (
        <div className="opcoes" onMouseLeave={() => setAberto(false)}>
          {options.map((op, idx) => (
            <p key={idx} onClick={() => handleSelect(op)}>
              {op}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectPadrao;
