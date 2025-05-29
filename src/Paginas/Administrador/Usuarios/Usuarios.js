import React, { useState, useEffect, useCallback } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import CadastroUsuario from "./CadastroUsuario/CadastroUsuario";
import EditItem from "../../../componentes/EditItem/EditItem";
import CampoBusca from "../../../componentes/Inputs/CampoBusca/CampoBusca";
import "./Usuarios.css";

import { excluirUsuario } from '../../../Services/usuarioService';
import debounce from 'lodash.debounce';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [busca, setBusca] = useState("");

  const fetchUsuarios = async (filtro = "") => {
    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .or(
        `nome.ilike.%${filtro}%,email.ilike.%${filtro}%`
      );

    if (error) {
      console.error("Erro ao buscar usuários:", error);
    } else {
      setUsuarios(data);
    }
  };

  useEffect(() => {
    fetchUsuarios(); // inicial
  }, []);

  //Debounced search
  const debouncedSearch = useCallback(
    debounce((valor) => {
      fetchUsuarios(valor);
    }, 500),
    []
  );

  const handleBuscaChange = (valor) => {
    setBusca(valor);
    debouncedSearch(valor);
  };

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

    const res = await excluirUsuario(usuario.codigo);

    if (res.success) {
      alert("Usuário excluído com sucesso!");
      fetchUsuarios();
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  const handleSave = () => {
    fetchUsuarios();
    setShowCadastro(false);
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <CampoBusca
          valor={busca}
          onChange={handleBuscaChange}
          placeholder="Pesquisar por nome, e-mail ou código"
        />
        <div className="usuarios-actions">
          <ButtonIncluir label="INCLUIR" onClick={handleIncluir} />
        </div>
      </div>

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
          <EditItem
            key={user.codigo}
            dados={user}
            onEdit={handleEditar}
            onDelete={handleExcluir}
          />
        ))}
        </tbody>
      </table>

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
