import React, { useState, useEffect } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import CadastroUsuario from "./CadastroUsuario/CadastroUsuario";
import UsuarioRow from "../../../componentes/UsuarioRow/UsuarioRow";
import "./Usuarios.css";

import { excluirUsuario } from '../../../Services/usuarioService';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  // Função para buscar usuários do Supabase
  const fetchUsuarios = async () => {
    const { data, error } = await supabase.from("usuario").select("*");
    if (error) {
      console.error("Erro ao buscar usuários:", error);
    } else {
      setUsuarios(data);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleIncluir = () => {
    setUsuarioSelecionado(null);
    setShowCadastro(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioSelecionado(usuario);
    setShowCadastro(true);
  };

  const handleExcluir = async (usuario) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir ${usuario.nome}?`);
    if (!confirm) return;

    const res = await excluirUsuario(usuario.id);

    if (res.success) {
      alert("Usuário excluído com sucesso!");
      fetchUsuarios(); // Atualiza a lista
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  const handleSave = () => {
    fetchUsuarios(); // Atualiza lista após criar/editar
    setShowCadastro(false);
  };

  return (
    <div className="usuarios-container">
      {/* Barra de Pesquisa e Botões */}
      <div className="usuarios-header">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
        <div className="usuarios-actions">
          <ButtonIncluir label="INCLUIR" onClick={handleIncluir} />
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
            <UsuarioRow
              key={user.id}
              usuario={user}
              onEdit={handleEditar}
              onDelete={handleExcluir}
            />
          ))}
        </tbody>
      </table>

      {/* Modal de Cadastro/Edição de Usuário */}
      {showCadastro && (
        <div className="modal-overlay">
          <CadastroUsuario
            onClose={() => setShowCadastro(false)}
            onSave={handleSave}
            usuarioSelecionado={usuarioSelecionado}
          />
        </div>
      )}
    </div>
  );
};

export default Usuarios;
