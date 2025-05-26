import React, { useState, useEffect } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import ButtonExcluir from "../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import EspacoRow from "../../../componentes/EspacoRow/EspacoRow";
import CadastroEspacoModal from "./CadastroEspacos/CadastroEspacos";
import "./Espacos.css";

const Espacos = () => {
  const [espacos, setEspacos] = useState([]);
  const [showModal, setShowModal] = useState(false); // CONTROLE DO MODAL

  useEffect(() => {
    async function fetchEspacos() {
      const { data, error } = await supabase.from("espacos").select("*");
      if (error) {
        console.error("Erro ao buscar espaços:", error);
      } else {
        setEspacos(data);
      }
    }
    fetchEspacos();
  }, []);

  return (
    <div className="espacos-container">
      <div className="espacos-header">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
        <div className="espacos-actions">
          <ButtonIncluir label="INCLUIR" onClick={() => setShowModal(true)} />
          <ButtonExcluir label="EXCLUIR" onClick={() => alert("Excluir selecionados")} />
        </div>
      </div>

      <table className="espacos-table">
        <thead>
          <tr>
            <th></th>
            <th>CÓDIGO</th>
            <th>NOME</th>
            <th>TIPO</th>
            <th>ANDAR</th>
            <th>COMPORTA</th>
            <th>ATIVO</th>
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {espacos.map((espaco) => (
            <EspacoRow key={espaco.id} espaco={espaco} />
          ))}
        </tbody>
      </table>

      {/* MODAL DE CADASTRO */}
      {showModal && <CadastroEspacoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Espacos;
