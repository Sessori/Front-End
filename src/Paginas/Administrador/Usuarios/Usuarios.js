import React, { useState, useEffect, useCallback } from "react";
import { supabase } from '../../../Services/supabaseClient';
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import CadastroUsuario from "./CadastroUsuario/CadastroUsuario";
import EditItem from "../../../componentes/Rows/EditItemUsuario/EditItem";
import CampoBusca from "../../../componentes/Inputs/CampoBusca/CampoBusca";
import "./Usuarios.css";

import { excluirUsuario } from '../../../Services/usuarioService'; // Função para exclusão via API/service
import debounce from 'lodash.debounce'; // Utilitário para otimizar chamadas de função com atraso

const Usuarios = () => {
  // Estado para armazenar a lista de usuários
  const [usuarios, setUsuarios] = useState([]);
  // Estado para controlar exibição do modal de cadastro
  const [showCadastro, setShowCadastro] = useState(false);
  // Estado que guarda o usuário selecionado para edição
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  // Texto digitado na barra de busca
  const [busca, setBusca] = useState("");

  // Função que busca os usuários no Supabase com base em um filtro (nome ou email)
  const fetchUsuarios = async (filtro = "") => {
    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .or(`nome.ilike.%${filtro}%,email.ilike.%${filtro}%`);

    if (error) {
      console.error("Erro ao buscar usuários:", error);
    } else {
      setUsuarios(data); // Atualiza a lista de usuários
    }
  };

  // Chamada inicial quando o componente é montado
  useEffect(() => {
    fetchUsuarios(); // Busca todos os usuários inicialmente
  }, []);

  // Função debounced para evitar chamadas excessivas ao buscar usuários
  const debouncedSearch = useCallback(
    debounce((valor) => {
      fetchUsuarios(valor);
    }, 500), // Espera 500ms após o último caractere digitado
    []
  );

  // Atualiza o campo de busca e dispara a busca com debounce
  const handleBuscaChange = (valor) => {
    setBusca(valor);
    debouncedSearch(valor);
  };

  // Abre o modal para inclusão de novo usuário
  const handleIncluir = () => {
    setUsuarioSelecionado(null); // Nenhum usuário selecionado para edição
    setShowCadastro(true);
  };

  // Abre o modal com dados do usuário selecionado para edição
  const handleEditar = (usuario) => {
    setUsuarioSelecionado(usuario);
    setShowCadastro(true);
  };

  // Exclui um usuário após confirmação e atualiza a lista
  const handleExcluir = async (usuario) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir ${usuario.nome}?`);
    if (!confirm) return;

    const res = await excluirUsuario(usuario.codigo);

    if (res.success) {
      alert("Usuário excluído com sucesso!");
      fetchUsuarios(); // Recarrega a lista
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  // Após salvar (incluir ou editar), recarrega os usuários e fecha o modal
  const handleSave = () => {
    fetchUsuarios();
    setShowCadastro(false);
  };

  return (
    <div className="usuarios-container">
      {/* Cabeçalho com campo de busca e botão de incluir */}
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

      {/* Tabela de exibição de usuários */}
      <table className="usuarios-table">
        <thead>
          <tr>
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

      {/* Modal com o formulário de cadastro/edição */}
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