import React from "react";
import "./Button.css";

const Button = ({ label, icon }) => {
  return (
    <button className="button">
      {icon && <img src={icon} alt={label} className="button-icon" />}
      {label}
    </button>
  );
};

export default Button;

