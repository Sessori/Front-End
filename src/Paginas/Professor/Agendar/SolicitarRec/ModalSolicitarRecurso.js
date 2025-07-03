import React, { useEffect, useState } from "react";
import "./ModalSolicitarRecurso.css";
import { supabase } from "../../../../Services/supabaseClient";
import { criarSolicitacaoRecurso } from "../../../../Services/solicitacaoService";

const ModalSolicitarRecurso = ({ espacoCodigo, usuarioCodigo, onClose }) => {
  const [todosRecursos, setTodosRecursos] = useState([]);
  const [recursosFiltrados, setRecursosFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [focado, setFocado] = useState(false);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    async function fetchRecursosNaoVinculados() {
      const { data: vinculados = [] } = await supabase
        .from("espaco_recurso")
        .select("recurso_codigo")
        .eq("espaco_codigo", espacoCodigo);

      const codigosVinculados = vinculados.map((r) => r.recurso_codigo);
      const codigosExclusao = codigosVinculados.length > 0 ? `(${codigosVinculados.join(",")})` : `(0)`;

      const { data, error } = await supabase
        .from("recurso")
        .select("*")
        .not("codigo", "in", codigosExclusao);

      if (!error && data) {
        setTodosRecursos(data);
      }
    }

    fetchRecursosNaoVinculados();
  }, [espacoCodigo]);

  useEffect(() => {
    if (busca.trim().length > 0) {
      const filtrados = todosRecursos.filter(
        (r) =>
          r.nome.toLowerCase().includes(busca.toLowerCase()) &&
          !selecionados.find((s) => s.codigo === r.codigo)
      );
      setRecursosFiltrados(filtrados);
    } else {
      setRecursosFiltrados([]);
    }
  }, [busca, todosRecursos, selecionados]);

  const toggleSelecionado = (recurso) => {
    const jaSelecionado = selecionados.find((r) => r.codigo === recurso.codigo);
    if (jaSelecionado) {
      setSelecionados(selecionados.filter((r) => r.codigo !== recurso.codigo));
    } else {
      setSelecionados([...selecionados, recurso]);
    }
    setBusca(""); // limpa o campo de busca
  };

  const handleSolicitar = async () => {
    const promessas = selecionados.map((recurso) =>
      criarSolicitacaoRecurso({
        recurso_codigo: recurso.codigo,
        usuario_codigo: usuarioCodigo,
        espaco_codigo: espacoCodigo,
      })
    );

    try {
      await Promise.all(promessas);
      alert("Solicitações enviadas com sucesso!");
      onClose();
    } catch (err) {
      alert("Erro ao solicitar recursos.");
      console.error(err);
    }
  };

  return (
    <div className="modal-solicitar-overlay" onClick={onClose}>
      <div className="modal-solicitar" onClick={(e) => e.stopPropagation()}>
        <h3>SOFTWARES</h3>

        <div className="busca-recurso">
          <img src="/icones/Icon-Espacos/Software.svg" alt="Software" />
          <input
            type="text"
            placeholder="Buscar Recurso"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onFocus={() => setFocado(true)}
            onBlur={() => setTimeout(() => setFocado(false), 150)}
          />
        </div>

        {focado && recursosFiltrados.length > 0 && (
          <ul className="dropdown-recursos">
            {recursosFiltrados.map((recurso) => (
              <li key={recurso.codigo} onClick={() => toggleSelecionado(recurso)}>
                + {recurso.nome}
              </li>
            ))}
          </ul>
        )}

        <ul className="recursos-selecionados">
          {selecionados.map((recurso) => (
            <li key={recurso.codigo} className="recurso-item ativo">
              + {recurso.nome.toUpperCase()}
            </li>
          ))}
        </ul>

        <div className="area-botao">
          <button className="btn-solicitar" onClick={handleSolicitar}>
            SOLICITAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSolicitarRecurso;
