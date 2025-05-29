// src/componentes/EditItem/EditItem.js

import React, { useState } from "react";
import "./EditItem.css";

function EditItem({ dados, onEdit, onDelete }) {
  const [menuAtivo, setMenuAtivo] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuAtivo(!menuAtivo);
  };

  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td>{dados.nome} {dados.sobrenome}</td>
      <td>{dados.email}</td>
      <td>{new Date(dados.created_at).toLocaleDateString()}</td>
      <td>{dados.administrador ? "Administrador" : "Professor(a)"}</td>
      <td>{dados.ativo ? "SIM" : "NÃO"}</td>
      <td className="menu-cell">
        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
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
