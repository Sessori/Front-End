import React from "react";
import "./NumeroCompacto.css";

const NumeroCompacto = ({ value, onChange, label }) => {
  return (
    <div className="input-numero-compacto-wrapper">
       {label && <span className="label-numero">{label}</span>}
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={0}
        className="input-numero-compacto"
      />
    </div>
  );
};

export default NumeroCompacto;
