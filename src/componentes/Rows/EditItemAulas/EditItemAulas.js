import React, { useState, useEffect, useRef } from "react";
import "./EditItemAulas.css";

const EditItemAula = ({ dados, onEdit, onDelete }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <tr>
      <td>{dados.nome}</td>
      <td>{dados.periodo}</td>
      <td>{dados.professor_nome}</td>
      <td>{dados.qtd_alunos}</td>
      <td>{dados.ativo}</td>
      <td className="menu-cell">
        <div className="menu-container" ref={menuRef}>
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
          {menuAberto && (
            <div className="dropdown-menu">
              <button onClick={() => onEdit(dados)}>Editar</button>
              <button onClick={() => onDelete(dados)}>Excluir</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EditItemAula;
