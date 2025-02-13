import React from "react";
import "./ButtonGeneric.css";

const ButtonGeneric = ({ label, icon }) => {
  return (
    <button className="button">
      {icon && <img src={icon} alt={label} className="button-icon" />}
      {label}
    </button>
  );
};

export default ButtonGeneric;

