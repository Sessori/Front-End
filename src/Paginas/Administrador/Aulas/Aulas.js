import React, { useState, useEffect, useCallback } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import CadastroAula from "./CadastroAula/CadastroAula";
import EditItem from "../../../componentes/EditItem/EditItem";
import CampoBusca from "../../../componentes/Inputs/CampoBusca/CampoBusca";
import "./Aulas.css";

import { excluirAula } from '../../../Services/aulaService';
import debounce from 'lodash.debounce';

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [busca, setBusca] = useState("");

  const fetchAulas = async (filtro = "") => {
    const { data, error } = await supabase
      .from("Aula")
      .select("*, usuario:usuario_codigo (nome)")
      .or(`nome.ilike.%${filtro}%,periodo.ilike.%${filtro}%`);

    if (error) {
      console.error("Erro ao buscar aulas:", error);
    } else {
      setAulas(data);
    }
  };

  useEffect(() => {
    fetchAulas();
  }, []);

  const debouncedSearch = useCallback(
    debounce((valor) => {
      fetchAulas(valor);
    }, 500),
    []
  );

  const handleBuscaChange = (valor) => {
    setBusca(valor);
    debouncedSearch(valor);
  };

  const handleIncluir = () => {
    setAulaSelecionada(null);
    setShowCadastro(true);
  };

  const handleEditar = (aula) => {
    setAulaSelecionada(aula);
    setShowCadastro(true);
  };

  const handleExcluir = async (aula) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir a aula ${aula.nome}?`);
    if (!confirm) return;

    const res = await excluirAula(aula.codigo);

    if (res.success) {
      alert("Aula excluída com sucesso!");
      fetchAulas();
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  const handleSave = () => {
    fetchAulas();
    setShowCadastro(false);
  };

  return (
    <div className="aulas-container">
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

      <table className="aulas-table">
        <thead>
          <tr>
            <th></th>
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
                ...aula,
                professor_nome: aula.usuario?.nome || "-"
              }}
              onEdit={handleEditar}
              onDelete={handleExcluir}
            />
          ))}
        </tbody>
      </table>

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
