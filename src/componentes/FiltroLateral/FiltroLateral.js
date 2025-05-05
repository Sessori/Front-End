import React, { useState } from "react";
import "./FiltroLateral.css";
import SelectPadrao from "../../componentes/SelectPadrao/SelectPadrao";

const FiltroLateral = () => {
  const [aberto, setAberto] = useState(false);
  const [selecionados, setSelecionados] = useState({
    tipo: "",
    capacidade: "",
    aulas: "",
    cursor: "",
  });

  const handleChange = (filtro, valor) => {
    setSelecionados((prev) => ({ ...prev, [filtro]: valor }));
  };

  const removerFiltro = (chave) => {
    setSelecionados((prev) => ({ ...prev, [chave]: "" }));
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
          <div className="filtro">
            <SelectPadrao
              label="Tipo"
              value={selecionados.tipo}
              options={["SALAS", "LABORATÓRIOS", "AUDITÓRIOS"]}
              onChange={(val) => handleChange("tipo", val)}
            />
          </div>

          <div className="filtro">
            <SelectPadrao
              label="Capacidade Máx."
              value={selecionados.capacidade}
              options={["30 PESSOAS", "40 PESSOAS", "100 PESSOAS"]}
              onChange={(val) => handleChange("capacidade", val)}
            />
          </div>

          <div className="filtro">
            <SelectPadrao
              label="Aulas Disponíveis"
              value={selecionados.aulas}
              options={["1 AULA", "2 AULAS", "4 AULAS"]}
              onChange={(val) => handleChange("aulas", val)}
            />
          </div>

          <div className="filtro">
            <div className="search-input-wrapper">
              <input type="text" placeholder="Ferramenta" className="search-input" />
              <img src="/icones/pesquisar.svg" alt="Buscar" className="search-icon" />
            </div>
          </div>

          <div className="linha-separadora"></div>

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
