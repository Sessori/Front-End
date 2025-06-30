import Agenda from "../../../componentes/Agenda/Agenda";
import HorarioSeletor from "../../../componentes/HorarioSeletor/HorarioSeletor";
import SalaCard from "../../../componentes/SalaCard/SalaCard";
import FiltroLateral from "../../../componentes/FiltroLateral/FiltroLateral";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { buscarEspacosDisponiveis } from "../../../Services/agendarService";
import "./Agendar.css";
import { Link } from "react-router-dom";
import { supabase } from "../../../Services/supabaseClient";
import React, { useState, useEffect } from "react";

const Agendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [espacosDisponiveis, setEspacosDisponiveis] = useState([]);
  const [filtros, setFiltros] = useState({
    tipo: "",
    capacidade: "",
    aulas: "",
    ferramenta: ""
  });

  const [usuarioCodigo, setUsuarioCodigo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUsuarioCodigo(user.user_metadata?.codigo);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
  console.log("📌 selectedDate:", selectedDate);
  console.log("📌 horariosSelecionados:", horariosSelecionados);

  const buscar = async () => {
    if (!selectedDate || horariosSelecionados.length === 0) {
      console.log("⚠️ Data ou horários não definidos");
      setEspacosDisponiveis([]);
      return;
    }

    const data = selectedDate.toISOString().split("T")[0];
    
    const horariosConvertidos = horariosSelecionados.map(h =>
      parse(h.split(" - ")[0], "HH:mm", new Date()).toTimeString().split(" ")[0]
    );

    console.log("📅 Chamando buscarEspacosDisponiveis com:", data, horariosConvertidos, filtros);
    const espacos = await buscarEspacosDisponiveis(data, horariosConvertidos, filtros);
    console.log("✅ Espaços recebidos:", espacos);
    setEspacosDisponiveis(espacos);
  };

    buscar();
  }, [selectedDate, horariosSelecionados, filtros]);

  return (
    <div className="agendar-container">
      <div className="sidebar">
        <Agenda onDateSelect={setSelectedDate} />
        <HorarioSeletor
          selectedDate={selectedDate}
          onHorariosSelect={setHorariosSelecionados}
        />
      </div>

      <div className="salas-container">
        <h2>SALAS DISPONÍVEIS</h2>
        {espacosDisponiveis.length === 0 ? (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            Nenhum espaço disponível no período selecionado.
          </p>
        ) : (
          espacosDisponiveis.map((espaco) => {
            console.log("🔍 Dados do espaço para renderizar:", espaco);

            const nome = espaco.nome || "Sem nome";
            const capacidade = espaco.capacidade
              ? `${espaco.capacidade} PESSOAS`
              : "Capacidade não informada";
            const localizacao = espaco.andar
              ? `${espaco.andar}° ANDAR`
              : "Localização não informada";
            const dataReserva = selectedDate
              ? format(selectedDate, "EEEE", { locale: ptBR }).toUpperCase()
              : "";
            const horario = horariosSelecionados.join(", ");

            return (
              <Link
                to="/professor/resumo"
                state={{
                  espaco,
                  selectedDate,
                  horariosSelecionados,
                  usuarioCodigo
                }}
                key={espaco.codigo}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <SalaCard
                  nome={nome}
                  capacidade={capacidade}
                  localizacao={localizacao}
                  dataReserva={dataReserva}
                  horario={horario}
                />
              </Link>
            );
          })
        )}
      </div>

      <FiltroLateral onChangeFilters={setFiltros} />
    </div>
  );
};

export default Agendar;
