import React from "react";
import "./SalaCard.css"; // Importa o CSS

const SalaCard = ({ nome, capacidade, localizacao, dataReserva, horario }) => {
  return (
    <div className="sala-card">
      {/* Barra lateral verde e título */}
      <div className="sala-header">
        <span className="barra-lateral"></span>
        <h3>{nome}</h3>
      </div>

      {/* Informações da sala */}
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