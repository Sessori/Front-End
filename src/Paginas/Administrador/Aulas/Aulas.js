import React, { useState, useEffect } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import ButtonExcluir from "../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import AulaRow from "../../../componentes/AulaRow/AulaRow";
import CadastroAula from "./CadastroAula/CadastroAula";
import "./Aulas.css";

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchAulas() {
      const { data, error } = await supabase.from("aulas").select("*");
      if (error) {
        console.error("Erro ao buscar aulas:", error);
      } else {
        setAulas(data);
      }
    }
    fetchAulas();
  }, []);

  return (
    <div className="aulas-container">
      <div className="aulas-header">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
        <div className="aulas-actions">
          <ButtonIncluir label="INCLUIR" onClick={() => setShowModal(true)} />
          <ButtonExcluir label="EXCLUIR" onClick={() => alert("Excluir selecionados")} />
        </div>
      </div>

      <table className="aulas-table">
        <thead>
          <tr>
            <th></th>
            <th>CÓDIGO</th>
            <th>NOME</th>
            <th>PERÍODO</th>
            <th>PROFESSOR</th>
            <th>QUANTIDADE DE ALUNOS</th>
            <th>ATIVO</th>
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <AulaRow key={aula.id} aula={aula} />
          ))}
        </tbody>
      </table>

      {showModal && <CadastroAula onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Aulas;
