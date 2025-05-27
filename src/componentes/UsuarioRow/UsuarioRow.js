import React, { useState } from "react";

function UsuarioRow({ usuario, onEdit, onDelete }) {
  const [menuAtivo, setMenuAtivo] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuAtivo(!menuAtivo);
  };

  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td>{usuario.nome} {usuario.sobrenome}</td>
      <td>{usuario.email}</td>
      <td>{new Date(usuario.created_at).toLocaleDateString()}</td>
      <td>{usuario.administrador ? "Administrador" : "Professor(a)"}</td>
      <td>{usuario.ativo ? "SIM" : "NÃO"}</td>
      <td className="menu-cell">
        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
          {menuAtivo && (
            <div className="dropdown-menu">
              <button onClick={() => onEdit(usuario)}>Editar</button>
              <button onClick={() => onDelete(usuario)}>Excluir</button>
              <button onClick={() => alert('Desativar')}>Desativar</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UsuarioRow;
