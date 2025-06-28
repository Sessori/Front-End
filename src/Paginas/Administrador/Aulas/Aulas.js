import React, { useState, useEffect, useCallback } from "react";
import { supabase } from '../../../Services/supabaseClient';

// Componentes reutilizáveis
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import CadastroAula from "./CadastroAula/CadastroAula";
import EditItem from "../../../componentes/EditItem/EditItem";
import CampoBusca from "../../../componentes/Inputs/CampoBusca/CampoBusca";

import "./Aulas.css";

// Função de exclusão via API
import { excluirAula } from '../../../Services/aulaService';

// Função utilitária para otimizar a busca com atraso (debounce)
import debounce from 'lodash.debounce';

const Aulas = () => {
  // Lista de aulas retornadas do banco
  const [aulas, setAulas] = useState([]);

  // Controle de exibição do modal de cadastro/edição
  const [showCadastro, setShowCadastro] = useState(false);

  // Aula atualmente selecionada para edição
  const [aulaSelecionada, setAulaSelecionada] = useState(null);

  // Valor do campo de busca
  const [busca, setBusca] = useState("");

  /**
   * Busca as aulas no Supabase com filtro por nome ou período
   */
  const fetchAulas = async (filtro = "") => {
    const { data, error } = await supabase
      .from("aula")
      .select("*, usuario:usuario_codigo (nome, sobrenome)")
      .or(`nome.ilike.%${filtro}%,periodo.ilike.%${filtro}%`);

    if (error) {
      console.error("Erro ao buscar aulas:", error);
    } else {
      setAulas(data);
    }
  };

  // Executa a busca inicial ao montar o componente
  useEffect(() => {
    fetchAulas();
  }, []);

  /**
   * Realiza a busca com debounce (espera 500ms após digitação)
   */
  const debouncedSearch = useCallback(
    debounce((valor) => {
      fetchAulas(valor);
    }, 500),
    []
  );

  // Atualiza o estado da busca e dispara a busca debounced
  const handleBuscaChange = (valor) => {
    setBusca(valor);
    debouncedSearch(valor);
  };

  // Abre o modal para incluir nova aula
  const handleIncluir = () => {
    setAulaSelecionada(null);
    setShowCadastro(true);
  };

  // Abre o modal para editar a aula selecionada
  const handleEditar = (aula) => {
    setAulaSelecionada(aula);
    setShowCadastro(true);
  };

  // Solicita confirmação e exclui a aula
  const handleExcluir = async (aula) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir a aula ${aula.nome}?`);
    if (!confirm) return;

    const res = await excluirAula(aula.codigo);

    if (res.success) {
      alert("Aula excluída com sucesso!");
      fetchAulas(); // Recarrega a lista
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  // Após salvar (inclusão ou edição), recarrega a lista e fecha o modal
  const handleSave = () => {
    fetchAulas();
    setShowCadastro(false);
  };

  return (
    <div className="aulas-container">
      {/* Cabeçalho com busca e botão de incluir */}
      <div className="aulas-header">
        <CampoBusca
          valor={busca}
          onChange={handleBuscaChange}
          placeholder="Pesquisar por nome ou período"
        />
        <div className="aulas-actions">
          <ButtonIncluir label="INCLUIR" onClick={handleIncluir} />
        </div>
      </div>

      {/* Tabela de exibição das aulas */}
      <table className="aulas-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>PERÍODO</th>
            <th>PROFESSOR</th>
            <th>QTD ALUNOS</th>
            <th>ATIVO</th>
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
          <EditItem
            key={aula.codigo}
            dados={{
              nome: aula.nome,
              periodo: aula.periodo,
              professor_nome: aula.usuario ? `${aula.usuario.nome} ${aula.usuario.sobrenome}` : "-",
              qtd_alunos: aula.qtd_alunos,
              ativo: aula.ativo ? "SIM" : "NÃO",
              codigo: aula.codigo
            }}
            onEdit={handleEditar}
            onDelete={handleExcluir}
          />
          ))}
        </tbody>
      </table>

      {/* Modal de cadastro/edição */}
      {showCadastro && (
        <div className="modal-overlay">
          <CadastroAula
            onClose={() => setShowCadastro(false)}
            onSave={handleSave}
            aulaSelecionada={aulaSelecionada}
          />
        </div>
      )}
    </div>
  );
};

export default Aulas;
