import React, { useState } from "react";
import "./FiltroLateral.css";

const FiltroLateral = () => {
  const [aberto, setAberto] = useState(false);
  const [selecionados, setSelecionados] = useState({
    tipo: "",
    capacidade: "",
    aulas: "",
    cursor: "",
  });

  const [opcoesVisiveis, setOpcoesVisiveis] = useState({
    tipo: false,
    capacidade: false,
    aulas: false,
  });

  const toggleOpcoes = (filtro) => {
    setOpcoesVisiveis((prev) => ({
      ...prev,
      [filtro]: !prev[filtro],
    }));
  };

  const selecionarOpcao = (filtro, valor) => {
    setSelecionados((prev) => ({
      ...prev,
      [filtro]: valor,
    }));
    setOpcoesVisiveis((prev) => ({
      ...prev,
      [filtro]: false,
    }));
  };

  const fecharDropdown = (filtro) => {
    setOpcoesVisiveis((prev) => ({
      ...prev,
      [filtro]: false,
    }));
  };

  const removerFiltro = (chave) => {
    setSelecionados((prev) => ({
      ...prev,
      [chave]: "",
    }));
  };

  return (
    <div
      className={`filtro-lateral ${aberto ? "aberto" : ""}`}
      onMouseEnter={() => setAberto(true)}
      onMouseLeave={() => setAberto(false)}
    >
      <div className="botao-filtro">
        <div className="texto-vertical">
          <span>+</span>
          <span>F</span>
          <span>I</span>
          <span>L</span>
          <span>T</span>
          <span>R</span>
          <span>O</span>
          <span>S</span>
        </div>
      </div>

      {aberto && (
        <div className="conteudo-filtro">
          {/* Filtro Tipo */}
          <div className="filtro">
            <button
              onClick={() => toggleOpcoes("tipo")}
              className={`dropdown-button ${opcoesVisiveis.tipo ? "dropdown-open" : ""}`}
            >
              <span>{selecionados.tipo || "Tipo"}</span>
              <img src="/icones/dropdown.svg" alt="Abrir" className="dropdown-icon" />
            </button>
            {opcoesVisiveis.tipo && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("tipo")}>
                <p onClick={() => selecionarOpcao("tipo", "SALAS")}>SALAS</p>
                <p onClick={() => selecionarOpcao("tipo", "LABORATÓRIOS")}>LABORATÓRIOS</p>
                <p onClick={() => selecionarOpcao("tipo", "AUDITÓRIOS")}>AUDITÓRIOS</p>
              </div>
            )}
          </div>

          {/* Filtro Capacidade */}
          <div className="filtro">
            <button
              onClick={() => toggleOpcoes("capacidade")}
              className={`dropdown-button ${opcoesVisiveis.capacidade ? "dropdown-open" : ""}`}
            >
              <span>{selecionados.capacidade || "Capacidade Máx."}</span>
              <img src="/icones/dropdown.svg" alt="Abrir" className="dropdown-icon" />
            </button>
            {opcoesVisiveis.capacidade && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("capacidade")}>
                <p onClick={() => selecionarOpcao("capacidade", "30 PESSOAS")}>30 PESSOAS</p>
                <p onClick={() => selecionarOpcao("capacidade", "40 PESSOAS")}>40 PESSOAS</p>
                <p onClick={() => selecionarOpcao("capacidade", "100 PESSOAS")}>100 PESSOAS</p>
              </div>
            )}
          </div>

          {/* Filtro Aulas */}
          <div className="filtro">
            <button
              onClick={() => toggleOpcoes("aulas")}
              className={`dropdown-button ${opcoesVisiveis.aulas ? "dropdown-open" : ""}`}
            >
              <span>{selecionados.aulas || "Aulas Disponíveis"}</span>
              <img src="/icones/dropdown.svg" alt="Abrir" className="dropdown-icon" />
            </button>
            {opcoesVisiveis.aulas && (
              <div className="opcoes" onMouseLeave={() => fecharDropdown("aulas")}>
                <p onClick={() => selecionarOpcao("aulas", "1 AULA")}>1 AULA</p>
                <p onClick={() => selecionarOpcao("aulas", "2 AULAS")}>2 AULAS</p>
                <p onClick={() => selecionarOpcao("aulas", "4 AULAS")}>4 AULAS</p>
              </div>
            )}
          </div>

          {/* Campo de Pesquisa Ferramenta */}
          <div className="filtro">
            <div className="search-input-wrapper">
              <input type="text" placeholder="Ferramenta" className="search-input" />
              <img src="/icones/pesquisar.svg" alt="Buscar" className="search-icon" />
            </div>
          </div>

          <div className="linha-separadora"></div>

          {/* Filtros Selecionados */}
          {(selecionados.tipo || selecionados.capacidade || selecionados.aulas || selecionados.cursor) && (
            <div className="filtros-selecionados">
              {Object.entries(selecionados).map(([chave, valor]) => (
                valor && (
                  <div key={chave} className="filtro-tag">
                    {valor}
                    <span className="filtro-remove" onClick={() => removerFiltro(chave)}>×</span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltroLateral;
