import React, { useState, useEffect } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import ButtonExcluir from "../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import CadastroUsuario from "./CadastroUsuario/CadastroUsuario";
import UsuarioRow from "../../../componentes/UsuarioRow/UsuarioRow";
import "./Usuarios.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);

  //Função para buscar usuários do Supabase
  useEffect(() => {
    async function fetchUsuarios() {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (error) {
        console.error("Erro ao buscar usuários:", error);
      } else {
        setUsuarios(data);
      }
    }
    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-container">
      {/* Barra de Pesquisa e Botões */}
      <div className="usuarios-header">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
        <div className="usuarios-actions">
          <ButtonIncluir label="INCLUIR" onClick={() => setShowCadastro(true)} />
          <ButtonExcluir label="EXCLUIR" onClick={() => alert("Excluir selecionados")} />
        </div>
      </div>

      {/* Tabela de Usuários */}
      <table className="usuarios-table">
        <thead>
          <tr>
            <th></th>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>DATA DE CADASTRO</th>
            <th>TIPO</th>
            <th>ATIVO</th>
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <UsuarioRow key={user.id} usuario={user} />
          ))}
        </tbody>
      </table>

      {/* Modal de Cadastro de Usuário */}
      {showCadastro && (
        <div className="modal-overlay">
          <CadastroUsuario 
            onClose={() => setShowCadastro(false)}
            onSave={(userData) => {
              console.log("Novo usuário cadastrado:", userData);
              setShowCadastro(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Usuarios;
