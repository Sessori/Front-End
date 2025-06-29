import React, { useState, useEffect } from "react";
import Agenda from "../../../componentes/Agenda/Agenda";
import HorarioSeletor from "../../../componentes/HorarioSeletor/HorarioSeletor";
import SalaCard from "../../../componentes/SalaCard/SalaCard";
import FiltroLateral from "../../../componentes/FiltroLateral/FiltroLateral";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { buscarEspacosDisponiveis } from "../../../Services/agendarService";
import "./Agendar.css";
import { Link } from "react-router-dom";

const Agendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [espacosDisponiveis, setEspacosDisponiveis] = useState([]);

  const horariosConvertidos = horariosSelecionados.map(h =>
    parse(h.split(" - ")[0], "HH:mm", new Date()).toTimeString().split(" ")[0]
  );

  useEffect(() => {
    async function buscar() {
      if (!selectedDate || horariosSelecionados.length === 0) {
        setEspacosDisponiveis([]);
        return;
      }

      const data = selectedDate.toISOString().split("T")[0];
      const espacos = await buscarEspacosDisponiveis(data, horariosConvertidos);
      setEspacosDisponiveis(espacos);
    }

    buscar();
  }, [selectedDate, horariosSelecionados]);

  return (
    <div className="agendar-container">
      <div className="sidebar">
        <Agenda onDateSelect={setSelectedDate} />
        <HorarioSeletor
          selectedDate={selectedDate}
          onPeriodoSelect={setPeriodoSelecionado}
          onHorariosSelect={setHorariosSelecionados}
        />
      </div>

      <div className="salas-container">
        <h2>SALAS DISPONÍVEIS</h2>
        {espacosDisponiveis.map((espaco) => (
          <SalaCard
            key={espaco.codigo}
            nome={espaco.nome}
            capacidade={`${espaco.capacidade} PESSOAS`}
            localizacao={`${espaco.andar}° ANDAR`}
            dataReserva={selectedDate ? format(selectedDate, "EEEE", { locale: ptBR }).toUpperCase() : ""}
            horario={horariosSelecionados.join(", ")}
          />
        ))}
      </div>

      <FiltroLateral />
    </div>
  );
};

export default Agendar;
