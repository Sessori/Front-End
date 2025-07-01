import React from "react";
import "./SalaCard.css"; // Estilos do card

const SalaCard = ({ nome, capacidade, localizacao, dataReserva, horario, onClick }) => {
  return (
    <div
      className="sala-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="sala-header">
        <h3>{nome}</h3>
      </div>

      <div className="sala-info">
        <div className="info-coluna">
          <p className="info-label">COMPORTA</p>
          <p className="info-dado">{capacidade}</p>
        </div>
        <div className="info-coluna">
          <p className="info-label">LOCALIZAÇÃO</p>
          <p className="info-dado">{localizacao}</p>
        </div>
        <div className="info-coluna">
          <p className="info-label">DATA DA RESERVA</p>
          <p className="info-dado">{dataReserva}</p>
        </div>
        <div className="info-coluna">
          <p className="info-label">HORÁRIO</p>
          <p className="info-dado">{horario}</p>
        </div>
      </div>
    </div>
  );
};

export default SalaCard;
