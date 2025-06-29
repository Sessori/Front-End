import React, { useState } from "react";
import "./HorarioSeletor.css"; // Importa o CSS externo

const horariosPorPeriodo = {
  manhã: [
    "07:40 - 08:30",
    "08:30 - 09:20",
    "09:30 - 10:20",
    "10:20 - 11:10",
    "11:20 - 12:10",
    "12:10 - 13:00",
  ],
  tarde: [
    "13:20 - 14:10",
    "14:10 - 15:00",
    "15:10 - 16:00",
    "16:00 - 16:50",
    "17:00 - 17:50",
    "17:50 - 18:40",
  ],
  noite: [
    "19:00 - 19:50",
    "19:50 - 20:40",
    "20:50 - 21:40",
    "21:40 - 22:30",
  ],
};

const HorarioSeletor = ({ onHorarioSelecionado }) => {
  const [periodo, setPeriodo] = useState("manhã");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]); // Agora permite múltiplos horários

  const handlePeriodoChange = (event) => {
    setPeriodo(event.target.value);
    setHorariosSelecionados([]); // Reseta a seleção ao mudar de período
  };

  const handleHorarioClick = (horario) => {
    let novaSelecao;

    if (horariosSelecionados.includes(horario)) {
      novaSelecao = horariosSelecionados.filter((h) => h !== horario);
    } else {
      novaSelecao = [...horariosSelecionados, horario];
    }

    setHorariosSelecionados(novaSelecao);

    // Envia os horários atualizados para o pai
    onHorarioSelecionado && onHorarioSelecionado(novaSelecao);
  };

  return (
    <div className="horario-container">
      {/* Dropdown de períodos */}
      <select className="horario-select" value={periodo} onChange={handlePeriodoChange}>
        <option value="manhã">MANHÃ</option>
        <option value="tarde">TARDE</option>
        <option value="noite">NOITE</option>
      </select>

      {/* Lista de horários */}
      <div className="horario-lista">
        {horariosPorPeriodo[periodo].map((horario) => (
          <button
            key={horario}
            className={`horario-botao ${horariosSelecionados.includes(horario) ? "selecionado" : ""}`}
            onClick={() => handleHorarioClick(horario)}
          >
            {horario}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorarioSeletor;
