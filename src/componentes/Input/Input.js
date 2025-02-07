import React from "react";
import "./Input.css";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
