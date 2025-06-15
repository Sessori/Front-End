import React from "react";
import Select from "react-select";
import "./SelectPadrao.css";

const SelectPadrao = ({ label, value, options, onChange, placeholder = "Selecione", isClearable = true }) => {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div className="select-padrao-container">
      {label && <label className="select-padrao-label">{label}</label>}
      <Select
        className="select-padrao"
        options={options}
        value={selectedOption}
        onChange={(option) => onChange(option ? option.value : "")}
        placeholder={placeholder}
        isClearable={isClearable}
      />
    </div>
  );
};

export default SelectPadrao;
