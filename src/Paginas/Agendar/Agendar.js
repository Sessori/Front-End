import React, { useState } from "react";
import Agenda from "../../componentes/Agenda/Agenda"; // Importa o componente de agenda
import "./Agendar.css";

const horarios = [
  "7:40 AM - 8:30 AM",
  "8:30 AM - 9:20 AM",
  "9:30 AM - 10:20 AM",
  "10:20 AM - 11:10 AM",
  "11:20 AM - 12:10 PM",
  "12:10 PM - 1:00 PM",
];

const salasDisponiveis = [
  {
    nome: "Laboratório 4",
    capacidade: "35 PESSOAS",
    localizacao: "3º ANDAR",
    dataReserva: "QUINTA-FEIRA",
    horario: "10:20 AM - 12:10 AM",
  },
  {
    nome: "Laboratório 2",
    capacidade: "35 PESSOAS",
    localizacao: "3º ANDAR",
    dataReserva: "QUINTA-FEIRA",
    horario: "10:20 AM - 12:10 AM",
  },
];

const Agendar = () => {
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  return (
    <div className="agendar-container">
      {/* Sidebar com calendário e horários */}
      <div className="sidebar">
        <Agenda />
        <select className="periodo-select">
          <option>MANHÃ</option>
          <option>TARDE</option>
          <option>NOITE</option>
        </select>
        <div className="horarios">
          {horarios.map((hora, index) => (
            <button
              key={index}
              className={`horario-btn ${horarioSelecionado === hora ? "selecionado" : ""}`}
              onClick={() => setHorarioSelecionado(hora)}
            >
              {hora}
            </button>
          ))}
        </div>
      </div>

      {/* Área principal com as salas disponíveis */}
      <div className="salas-container">
        <h2>SALAS DISPONÍVEIS</h2>
        {salasDisponiveis.map((sala, index) => (
          <div key={index} className="sala-card">
            <h3>{sala.nome}</h3>
            <p><strong>Comporta:</strong> {sala.capacidade}</p>
            <p><strong>Localização:</strong> {sala.localizacao}</p>
            <p><strong>Data da Reserva:</strong> {sala.dataReserva}</p>
            <p><strong>Horário:</strong> {sala.horario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agendar;
