// Componente EspacoRow com menu suspenso para editar/excluir
import React, { useState, useEffect, useRef } from "react";


const EspacoRow = ({ espaco, onEdit, onDelete }) => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const menuRef = useRef(null);

  // Alterna a visibilidade do menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuAtivo(!menuAtivo);
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAtivo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <tr>
      <td>{espaco.codigo}</td>
      <td>{espaco.nome}</td>
      <td>{espaco.tipo}</td>
      <td>{espaco.andar}</td>
      <td>{espaco.capacidade}</td>
      <td>{espaco.ativo ? "SIM" : "NÃO"}</td>
      <td className="menu-cell">
        <div className="menu-container" ref={menuRef}>
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
          {menuAtivo && (
            <div className="dropdown-menu">
              <button onClick={() => onEdit(espaco)}>Editar</button>
              <button onClick={() => onDelete(espaco)}>Excluir</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EspacoRow;
