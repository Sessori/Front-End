import React, { useState } from "react";
import "./InputLogin.css";

const InputLogin = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-container">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          className="toggle-password-button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <img
            src={
              showPassword
                ? "/icones/icon-login/eye.svg"
                : "/icones/icon-login/eyeoff.svg"
            }
            alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
          />
        </button>
      )}
    </div>
  );
};

export default InputLogin;
