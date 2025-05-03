import React from "react";
import "./RadioGroup.css";

const RadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div className="radio-group-vertical">
      <span className="radio-label-vertical">{label}</span>
      <div className="radio-options-vertical">
        {options.map((option) => (
          <label key={option} className="radio-option-vertical">
            <input
              type="radio"
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
