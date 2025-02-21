import React from "react";
import "./InputLogin.css";

const InputLogin = ({ type, placeholder, value, onChange }) => {
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

export default InputLogin;
