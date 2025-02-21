import React from "react";
import "./ButtonGW.css";

const ButtonGW = ({ icon, text, onClick }) => {
  return (
    <button className="button-gw" onClick={onClick}>
      <img src={icon} alt={text} className="button-gw-icon" />
      <span>{text}</span>
    </button>
  );
};

export default ButtonGW;
