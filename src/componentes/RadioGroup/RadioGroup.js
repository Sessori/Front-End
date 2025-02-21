import React from "react";
import "./RadioGroup.css";

const RadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div className="radio-group">
      <input type="text" className="radio-input" value={label} readOnly />
      <div className="radio-options">
        {options.map((option) => (
          <label key={option} className="radio-option">
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span className="custom-radio"></span>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
