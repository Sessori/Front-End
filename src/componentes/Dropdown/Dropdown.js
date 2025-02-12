// Dropdown.jsx
import React from "react";

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="dropdown-group">
      <label className="dropdown-label">{label}</label>
      <select className="dropdown-field" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
