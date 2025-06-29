// Componente EditItem: representa uma linha da tabela de usuários com opções de edição/exclusão
import React, { useState, useEffect, useRef } from "react";
import "./EditItem.css";

function EditItem({ dados, onEdit, onDelete }) {
  // Estado local para controle da exibição do menu suspenso
  const [menuAtivo, setMenuAtivo] = useState(false);
  
  // Referência ao container do menu suspenso
  const menuRef = useRef(null);

  // Alterna a visibilidade do menu ao clicar no botão de três pontos
  const toggleMenu = (e) => {
    e.stopPropagation(); // Previne que o clique propague para outros elementos
    setMenuAtivo(!menuAtivo);
  };

  // Fecha o menu automaticamente ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAtivo(false); // Fecha o menu se o clique for fora
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <tr>
       {/* Informações do usuário */}
      <td>{dados.nome} {dados.sobrenome}</td>
      <td>{dados.email}</td>
      <td>{new Date(dados.created_at).toLocaleDateString()}</td>
      <td>{dados.administrador ? "Administrador" : "Professor(a)"}</td>
      <td>{dados.ativo ? "SIM" : "NÃO"}</td>

      {/* Coluna de ações com botão de menu */}
      <td className="menu-cell">
        <div className="menu-container" ref={menuRef}>
          <button className="menu-button" onClick={toggleMenu}>⋮</button>

          {/* Menu suspenso com opções de ação */}
          {menuAtivo && (
            <div className="dropdown-menu">
              <button onClick={() => onEdit(dados)}>Editar</button>
              <button onClick={() => onDelete(dados)}>Excluir</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default EditItem;
