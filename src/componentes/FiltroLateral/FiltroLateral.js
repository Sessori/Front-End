import React, { useState, useEffect } from "react";
import "./FiltroLateral.css";
import SelectPadrao from "../../componentes/SelectPadrao/SelectPadrao";
import {
  buscarTipos,
  buscarCapacidades,
  buscarAndares,
  buscarFerramentas
} from "../../Services/filtroService";

const FiltroLateral = ({ onChangeFilters }) => {
  // Estado para controle de visibilidade da barra lateral
  const [aberto, setAberto] = useState(false);

  // Filtros aplicados
  const [selecionados, setSelecionados] = useState({
      tipo: "",
      capacidade: "",
      andar: "",
      ferramentas: []
  });

  // Lista de sugestões
  const [tipos, setTipos] = useState([]);
  const [capacidades, setCapacidades] = useState([]);
  const [andares, setAndares] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [ferramentaInput, setFerramentaInput] = useState("");

  // Carrega as opções ao montar
  useEffect(() => { buscarTipos().then(setTipos); }, []);
  useEffect(() => { buscarCapacidades().then(setCapacidades); }, []);
  useEffect(() => { buscarAndares().then(setAndares); }, []);
  useEffect(() => { buscarFerramentas().then(setFerramentas); }, []);

  // Atualiza filtros e informa o pai
  const update = (chave, valor) => {
    const next = { ...selecionados, [chave]: valor };
    setSelecionados(next);
    onChangeFilters(next);
  };

  // Adiciona ferramenta selecionada da lista
  const adicionarFerramenta = (f) => {
    if (!selecionados.ferramentas.includes(f)) {
      const novas = [...selecionados.ferramentas, f];
      update("ferramentas", novas);
    }
    setFerramentaInput("");
  };

  // Remove uma ferramenta
  const removerFerramenta = (f) => {
    const novas = selecionados.ferramentas.filter(x => x !== f);
    update("ferramentas", novas);
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
              options={tipos}
              onChange={(val) => update("tipo", val)}
            />
          </div>

          <div className="filtro">
            <SelectPadrao
              label="Capacidade Máx."
              value={selecionados.capacidade}
              options={capacidades}
              onChange={(val) => update("capacidade", val)}
            />
          </div>

          <div className="filtro">
              <SelectPadrao
                label="Andar"
                value={selecionados.andar}
                options={andares}
                onChange={(val) => update("andar", val)}
              />
          </div>

          <div className="filtro">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Ferramenta"
                value={ferramentaInput}
                onChange={(e) => setFerramentaInput(e.target.value)}
              />
              {ferramentaInput && (
                <ul className="sugestoes-ferramentas">
                  {ferramentas
                    .filter(f => f.toLowerCase().includes(ferramentaInput.toLowerCase()))
                    .map((f, i) => (
                      <li key={i} onClick={() => adicionarFerramenta(f)}>
                        {f}
                      </li>
                    ))}
                </ul>
              )}
              <img src="/icones/pesquisar.svg" alt="Buscar" className="search-icon" />
            </div>
          </div>

          <div className="linha-separadora"></div>

          {(selecionados.tipo || selecionados.capacidade || selecionados.aulas || selecionados.ferramentas.length > 0) && (
            <div className="filtros-selecionados">
              {selecionados.tipo && (
                <div className="filtro-tag">
                  {selecionados.tipo}
                  <span className="filtro-remove" onClick={() => update("tipo", "")}>×</span>
                </div>
              )}
              {selecionados.capacidade && (
                <div className="filtro-tag">
                  {selecionados.capacidade}
                  <span className="filtro-remove" onClick={() => update("capacidade", "")}>×</span>
                </div>
              )}
              {selecionados.andar && (
                <div className="filtro-tag">
                  {selecionados.andar}
                  <span className="filtro-remove" onClick={() => update("andar", "")}>×</span>
                </div>
              )}
              {selecionados.ferramentas.map((f, i) => (
                <div className="filtro-tag" key={i}>
                  {f}
                  <span className="filtro-remove" onClick={() => removerFerramenta(f)}>×</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltroLateral;
