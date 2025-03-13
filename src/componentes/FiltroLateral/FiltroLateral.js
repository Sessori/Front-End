import React, { useState } from "react";
import "./FiltroLateral.css";

const FiltroLateral = () => {
  const [aberto, setAberto] = useState(false);
  const [selecionados, setSelecionados] = useState({
    periodo: "",
    tipo: "",
    capacidade: "",
    aulas: "",
    cursor: "",
  });

  const [opcoesVisiveis, setOpcoesVisiveis] = useState({
    periodo: false,
    tipo: false,
    capacidade: false,
    aulas: false,
    cursor: false,
  });

  // Abre/fecha o dropdown ao clicar
  const toggleOpcoes = (filtro) => {
    setOpcoesVisiveis((prev) => ({
      ...prev,
      [filtro]: !prev[filtro],
    }));
  };

  // Seleciona uma opção e fecha o dropdown
  const selecionarOpcao = (filtro, valor) => {
    setSelecionados((prev) => ({
      ...prev,
      [filtro]: valor,
    }));
    setOpcoesVisiveis((prev) => ({
      ...prev,
      [filtro]: false, // Fecha o dropdown
    }));
  };

  // Fecha o dropdown quando o mouse sai da área das opções
  const fecharDropdown = (filtro) => {
    setOpcoesVisiveis((prev) => ({
      ...prev,
      [filtro]: false,
    }));
  };

  return (
    <div
      className={`filtro-lateral ${aberto ? "aberto" : ""}`}
      onMouseEnter={() => setAberto(true)}
      onMouseLeave={() => setAberto(false)}
    >
      {/* Botão lateral para abrir os filtros */}
      <div className="botao-filtro">
        <span className="mais">+</span>
        <p className="texto-vertical">F I L T R O S</p>
      </div>

      {/* Conteúdo dos filtros */}
      {aberto && (
        <div className="conteudo-filtro">
          {/* Filtro de Período */}
          <div className="filtro">
            <button onClick={() => toggleOpcoes("periodo")} className="dropdown-button">
              {selecionados.periodo || "Período"}
            </button>
            {opcoesVisiveis.periodo && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("periodo")}>
                <p onClick={() => selecionarOpcao("periodo", "MANHÃ")}>MANHÃ</p>
                <p onClick={() => selecionarOpcao("periodo", "TARDE")}>TARDE</p>
                <p onClick={() => selecionarOpcao("periodo", "NOITE")}>NOITE</p>
              </div>
            )}
          </div>

          {/* Filtro de Tipo */}
          <div className="filtro">
            <button onClick={() => toggleOpcoes("tipo")} className="dropdown-button">
              {selecionados.tipo || "Tipo"}
            </button>
            {opcoesVisiveis.tipo && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("tipo")}>
                <p onClick={() => selecionarOpcao("tipo", "SALAS")}>SALAS</p>
                <p onClick={() => selecionarOpcao("tipo", "LABORATÓRIOS")}>LABORATÓRIOS</p>
                <p onClick={() => selecionarOpcao("tipo", "AUDITÓRIOS")}>AUDITÓRIOS</p>
              </div>
            )}
          </div>

          {/* Filtro de Capacidade Mínima */}
          <div className="filtro">
            <button onClick={() => toggleOpcoes("capacidade")} className="dropdown-button">
              {selecionados.capacidade || "Capacidade Min."}
            </button>
            {opcoesVisiveis.capacidade && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("capacidade")}>
                <p onClick={() => selecionarOpcao("capacidade", "30 PESSOAS")}>30 PESSOAS</p>
                <p onClick={() => selecionarOpcao("capacidade", "40 PESSOAS")}>40 PESSOAS</p>
                <p onClick={() => selecionarOpcao("capacidade", "100 PESSOAS")}>100 PESSOAS</p>
              </div>
            )}
          </div>

          {/* Filtro de Aulas Disponíveis */}
          <div className="filtro">
            <button onClick={() => toggleOpcoes("aulas")} className="dropdown-button">
              {selecionados.aulas || "Aulas Disponíveis"}
            </button>
            {opcoesVisiveis.aulas && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("aulas")}>
                <p onClick={() => selecionarOpcao("aulas", "1 AULA")}>1 AULA</p>
                <p onClick={() => selecionarOpcao("aulas", "2 AULAS")}>2 AULAS</p>
                <p onClick={() => selecionarOpcao("aulas", "4 AULAS")}>4 AULAS</p>
              </div>
            )}
          </div>

          {/* Filtro de Cursor */}
          <div className="filtro">
            <button onClick={() => toggleOpcoes("cursor")} className="dropdown-button">
              {selecionados.cursor || "Cursor"}
            </button>
            {opcoesVisiveis.cursor && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("cursor")}>
                <p onClick={() => selecionarOpcao("cursor", "CURSOR")}>CURSOR</p>
              </div>
            )}
          </div>

          {/* Opções Extras conforme seu código anterior */}
          <div className="opcoes-extra">
            <p>+ SALAS</p>
            <p>+ 40 PESSOAS</p>
            <p>+ 2 AULAS</p>
            <p>+ CURSOR</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroLateral;
