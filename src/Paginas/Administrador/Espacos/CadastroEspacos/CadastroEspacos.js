import React, { useState, useEffect } from 'react';
import './CadastroEspacos.css';
import InputCadastro from "../../../../componentes/Inputs/InputCadastro/InputCadastro";
import NumeroCompacto from "../../../../componentes/Inputs/NumeroCompacto/NumeroCompacto";
import RadioGroup from "../../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import { supabase } from '../../../../Services/supabaseClient';
import { inserirEspaco, atualizarEspaco } from "../../../../Services/espacoService";

const CadastroEspacoModal = ({ onClose, espacoSelecionado }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    tipo: "Laboratório",
    andar: 1,
    comporta: "",
    reservasFixas: "SIM",
    ativo: "SIM",
    tv: 0,
    quadro: 0,
    computador: 0
  });

  const [todosRecursos, setTodosRecursos] = useState([]);
  const [filtroRecurso, setFiltroRecurso] = useState("");
  const [recursosSelecionados, setRecursosSelecionados] = useState([]);

  useEffect(() => {
    async function carregarDadosEspaco() {
      if (espacoSelecionado) {
        setFormData({
          codigo: espacoSelecionado.codigo || "",
          nome: espacoSelecionado.nome || "",
          tipo: espacoSelecionado.tipo || "Laboratório",
          andar: espacoSelecionado.andar || 1,
          comporta: espacoSelecionado.capacidade || "",
          reservasFixas: espacoSelecionado.disponibilidade_reserva_fixa ? "SIM" : "NÃO",
          ativo: espacoSelecionado.ativo ? "SIM" : "NÃO",
          tv: 0, quadro: 0, computador: 0,
        });

        const { data: recursosVinculados, error } = await supabase
          .from("espaco_recurso")
          .select("recurso_codigo, qtd_recurso, recurso (nome)")
          .eq("espaco_codigo", espacoSelecionado.codigo);

        if (!error && recursosVinculados) {
          const recursosTratados = recursosVinculados.map(({ recurso_codigo, qtd_recurso, recurso }) => ({
            codigo: recurso_codigo,
            nome: recurso?.nome,
            qtd: qtd_recurso,
          }));

          const recursoPorNome = (nome) => {
          const recurso = recursosTratados.find(r => r.nome?.toLowerCase().includes(nome.toLowerCase()));
          return recurso && typeof recurso.qtd === "number" ? recurso.qtd : 0;
          };

          setFormData(prev => ({
            ...prev,
            tv: recursoPorNome("televisor"),
            quadro: recursoPorNome("quadro"),
            computador: recursoPorNome("computador"),
          }));

          const fisicos = ["televisor", "quadro", "computador"];
          const outrosRecursos = recursosTratados.filter(r =>
            !fisicos.some(nome => r.nome?.toLowerCase().includes(nome))
          );
          setRecursosSelecionados(outrosRecursos);
        }
      }
    }

    carregarDadosEspaco();
  }, [espacoSelecionado]);

  useEffect(() => {
    async function fetchRecursos() {
      const { data, error } = await supabase.from("recurso").select("codigo, nome");
      if (!error) setTodosRecursos(data);
    }
    fetchRecursos();
  }, []);

  const handleSalvar = async () => {
    const espaco = {
      nome: formData.nome,
      tipo: formData.tipo,
      andar: String(formData.andar),
      capacidade: parseInt(formData.comporta),
      disponibilidade_reserva_fixa: formData.reservasFixas === "SIM",
      ativo: formData.ativo === "SIM"
    };

    const recursosComQuantidade = [...recursosSelecionados];

    // Adiciona recurso físico apenas se quantidade > 0
    const adicionarQtd = (nome, qtd) => {
      const recurso = todosRecursos.find(r => r.nome.toLowerCase().includes(nome.toLowerCase()));
      if (recurso && qtd > 0) {
        recursosComQuantidade.push({ codigo: recurso.codigo, qtd });
      }
    };

    adicionarQtd("Televisor", Number(formData.tv));
    adicionarQtd("Quadro", Number(formData.quadro));
    adicionarQtd("Computadores", Number(formData.computador));

    const resultado = formData.codigo
      ? await atualizarEspaco(formData.codigo, espaco, recursosComQuantidade)
      : await inserirEspaco(espaco, recursosComQuantidade);

    if (resultado.success) {
      alert("Espaço salvo com sucesso!");
      onClose();
    } else {
      alert("Erro ao salvar espaço: " + resultado.error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) onClose();
  };

  const recursosFiltrados = filtroRecurso
    ? todosRecursos.filter(r =>
        r.nome.toLowerCase().includes(filtroRecurso.toLowerCase()) &&
        !recursosSelecionados.some(s => s.codigo === r.codigo)
      )
    : [];

  const adicionarRecurso = (recurso) => {
    setRecursosSelecionados(prev => [...prev, { ...recurso, qtd: 1 }]);
    setFiltroRecurso("");
  };

  const removerRecurso = (codigo) => {
    setRecursosSelecionados(prev => prev.filter(r => r.codigo !== codigo));
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>{formData.codigo ? "Editar Espaço" : "Cadastro de Espaço"}</h2>
        </div>

        <div className="form-body">
          <div className="form-grid">
            <div className="form-left">
              <InputCadastro label="Código" value={formData.codigo} visualOnly />
              <InputCadastro label="Nome" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
              <NumeroCompacto value={formData.andar} onChange={(e) => handleChange("andar", e.target.value)} label="ANDAR" />
              <NumeroCompacto value={formData.comporta} onChange={(e) => handleChange("comporta", e.target.value)} label="COMPORTA" />
              <div className="dropdown-tipo">
                <label htmlFor="tipo">TIPO DE ESPAÇO:</label>
                <select id="tipo" value={formData.tipo} onChange={(e) => handleChange("tipo", e.target.value)}>
                  <option value="Laboratório">Laboratório</option>
                  <option value="Sala">Sala</option>
                  <option value="Auditório">Auditório</option>
                </select>
              </div>
            </div>

            <div className="form-right">
              <div className="radio-container">
                <RadioGroup label="Disponível para reservas fixas" options={["SIM", "NÃO"]} value={formData.reservasFixas} onChange={(v) => handleChange("reservasFixas", v)} />
                <RadioGroup label="Ativo" options={["SIM", "NÃO"]} value={formData.ativo} onChange={(v) => handleChange("ativo", v)} />
              </div>
            </div>
          </div>

          {/* Recursos */}
          <div className="recursos">
            <h3>Recursos Disponíveis</h3>
            <div className="recursos-columns">
              <div className="recursos-fisicos">
                <h4>Físicos</h4>
                <div className="recurso">
                  <img src="/icones/Icon-Espacos/TV.svg" alt="TV" className="icone" />
                  <NumeroCompacto value={formData.tv} onChange={(e) => handleChange("tv", e.target.value)} />
                  <span>Televisores</span>
                </div>
                <div className="recurso">
                  <img src="/icones/Icon-Espacos/QuadroNegro.svg" alt="Quadro" className="icone" />
                  <NumeroCompacto value={formData.quadro} onChange={(e) => handleChange("quadro", e.target.value)} />
                  <span>Quadros</span>
                </div>
                <div className="recurso">
                  <img src="/icones/Icon-Espacos/Computador.svg" alt="Computador" className="icone" />
                  <NumeroCompacto value={formData.computador} onChange={(e) => handleChange("computador", e.target.value)} />
                  <span>Computadores</span>
                </div>
              </div>

              <div className="recursos-softwares">
                <h4>Softwares</h4>
                <div className="software-search">
                  <img src="/icones/Icon-Espacos/Software.svg" alt="Buscar" className="icone" />
                  <input type="text" placeholder="Buscar Recurso" value={filtroRecurso} onChange={(e) => setFiltroRecurso(e.target.value)} />
                </div>
                {recursosFiltrados.length > 0 && (
                  <ul className="dropdown-recursos">
                    {recursosFiltrados.map((r) => (
                      <li key={r.codigo} onClick={() => adicionarRecurso(r)}>+ {r.nome}</li>
                    ))}
                  </ul>
                )}
                <ul>
                  {recursosSelecionados.map((r) => (
                    <li key={r.codigo} className="recurso-item">
                      + {r.nome} <span className="remove-recurso" onClick={() => removerRecurso(r.codigo)}>×</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <ButtonSalvar onClick={handleSalvar} />
        </div>
      </div>
    </div>
  );
};

export default CadastroEspacoModal;
