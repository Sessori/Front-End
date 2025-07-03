import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../Services/supabaseClient";
import CampoBusca from "../../../componentes/Inputs/CampoBusca/CampoBusca";
import debounce from "lodash.debounce";
import "./Solicitacoes.css";
import { atualizarStatusSolicitacao } from "../../../Services/solicitacaoService";

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [busca, setBusca] = useState("");

  const fetchSolicitacoes = async () => {
    const { data, error } = await supabase
      .from("solicitacao_recurso")
      .select(`
        codigo,
        status,
        recurso:recurso_codigo (nome),
        usuario:usuario_codigo (nome, sobrenome),
        espaco:espaco_codigo (nome)
      `);

    if (error) {
      console.error("Erro ao buscar solicitações:", error);
    } else {
      const filtro = busca.toLowerCase();
      const filtradas = data.filter((s) => {
        const nome = s.usuario?.nome?.toLowerCase() || "";
        const sobrenome = s.usuario?.sobrenome?.toLowerCase() || "";
        const status = s.status?.toLowerCase() || "";
        return (
          nome.includes(filtro) ||
          sobrenome.includes(filtro) ||
          status.includes(filtro)
        );
      });

      setSolicitacoes(filtradas);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const debouncedSearch = useCallback(
    debounce((valor) => fetchSolicitacoes(valor), 500),
    []
  );

  const handleBuscaChange = (valor) => {
    setBusca(valor);
    debouncedSearch(valor);
  };

  const alterarStatus = async (codigo) => {
  const confirmar = window.confirm("Marcar esta solicitação como CONCLUÍDA?");
    if (!confirmar) return;

    const { data, error } = await supabase
      .from("solicitacao_recurso")
      .update({ status: "Concluída" }) // ✅ agora válido
      .eq("codigo", codigo)
      .select();

    if (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status.");
    } else {
      alert("Status atualizado com sucesso!");
      fetchSolicitacoes();
    }
  };


  return (
    <div className="solicitacoes-container">
      <div className="solicitacoes-header">
        <CampoBusca
          valor={busca}
          onChange={handleBuscaChange}
          placeholder="Buscar por professor ou status"
        />
      </div>

      <table className="solicitacoes-table">
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>ESPAÇO</th>
            <th>PROFESSOR</th>
            <th>RECURSO</th>
            <th>STATUS</th>
            <th>AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((s) => (
            <tr key={s.codigo}>
              <td>{s.codigo}</td>
              <td>{s.espaco?.nome || "-"}</td>
              <td>{s.usuario ? `${s.usuario.nome} ${s.usuario.sobrenome}` : "-"}</td>
              <td>{s.recurso?.nome || "-"}</td>
              <td>{s.status || "-"}</td>
              <td>
                {s.status !== "ATENDIDA" && (
                  <button
                    className="solicitacoes-btn"
                    onClick={() => alterarStatus(s.codigo)}
                  >
                    Marcar como Atendida
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitacoes;
