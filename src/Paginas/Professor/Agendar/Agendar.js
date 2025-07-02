import React, { useState, useEffect } from "react";
import Agenda from "../../../componentes/Agenda/Agenda";
import HorarioSeletor from "../../../componentes/HorarioSeletor/HorarioSeletor";
import SalaCard from "../../../componentes/SalaCard/SalaCard";
import FiltroLateral from "../../../componentes/FiltroLateral/FiltroLateral";
import ResumoReserva from "./ResumoReserva/ResumoReserva";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { buscarEspacosDisponiveis } from "../../../Services/agendarService";
import { supabase } from "../../../Services/supabaseClient";
import "./Agendar.css";

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
  const [showModal, setShowModal] = useState(false);
  const [espacoSelecionado, setEspacoSelecionado] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const email = user.email;

        const { data: usuarioData, error } = await supabase
          .from("usuario")
          .select("codigo")
          .eq("email", email)
          .single();

        if (!error && usuarioData) {
          setUsuarioCodigo(usuarioData.codigo);
        } else {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
    const buscar = async () => {
      if (!selectedDate || horariosSelecionados.length === 0) {
        setEspacosDisponiveis([]);
        return;
      }

      const data = selectedDate.toISOString().split("T")[0];
      const horariosConvertidos = horariosSelecionados.map(h =>
        parse(h.split(" - ")[0], "HH:mm", new Date()).toTimeString().split(" ")[0]
      );

      const espacos = await buscarEspacosDisponiveis(data, horariosConvertidos, filtros);
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
              <SalaCard
                key={espaco.codigo}
                nome={nome}
                capacidade={capacidade}
                localizacao={localizacao}
                dataReserva={dataReserva}
                horario={horario}
                onClick={() => {
                  setEspacoSelecionado(espaco);
                  setShowModal(true);
                }}
              />
            );
          })
        )}
      </div>

      {/* Filtro Lateral com bloqueio de interação quando modal aberto */}
      <div className="filtro-wrapper">
        <FiltroLateral onChangeFilters={setFiltros} />
        {showModal && <div className="filtro-overlay" />}
      </div>

      {/* Modal Overlay estilo CadastroAula */}
      {showModal && espacoSelecionado && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setShowModal(false);
            }
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <ResumoReserva
              espaco={espacoSelecionado}
              selectedDate={selectedDate}
              horariosSelecionados={horariosSelecionados}
              usuarioCodigo={usuarioCodigo}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendar;
