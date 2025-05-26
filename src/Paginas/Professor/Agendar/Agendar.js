import React, { useState } from "react";
import Agenda from "../../../componentes/Agenda/Agenda";
import HorarioSeletor from "../../../componentes/HorarioSeletor/HorarioSeletor";
import SalaCard from "../../../componentes/SalaCard/SalaCard";
import FiltroLateral from "../../../componentes/FiltroLateral/FiltroLateral"; // Importa o novo componente
import "./Agendar.css";

const salasDisponiveis = [
  {
    nome: "Laboratório 4",
    capacidade: "35 PESSOAS",
    localizacao: "3º ANDAR",
    dataReserva: "QUINTA-FEIRA",
    horario: "10:20 - 12:10",
  },
  {
    nome: "Laboratório 2",
    capacidade: "35 PESSOAS",
    localizacao: "3º ANDAR",
    dataReserva: "QUINTA-FEIRA",
    horario: "10:20 - 12:10",
  },
];

const Agendar = () => {
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  return (
    <div className="agendar-container">
      {/* Sidebar com calendário e seleção de horário */}
      <div className="sidebar">
        <Agenda />
        <HorarioSeletor onHorarioSelecionado={setHorarioSelecionado} />
      </div>

      {/* Área principal com as salas disponíveis */}
      <div className="salas-container">
        <h2>SALAS DISPONÍVEIS</h2>
        {salasDisponiveis.map((sala, index) => (
          <SalaCard key={index} {...sala} />
        ))}
      </div>

      {/* Filtro lateral fixo no lado direito */}
      <FiltroLateral />
    </div>
  );
};

export default Agendar;
