// RadioGroup.js
import React from "react";
import "./RadioGroup.css";

const RadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div className="radio-group">
      <label>{label}</label>
      {options.map((option) => (
        <label key={option} className="radio-option">
          <input type="radio" name={label} value={option} checked={value === option} onChange={() => onChange(option)} />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
