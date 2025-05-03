import React from "react";

const EspacoRow = ({ espaco }) => {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td>{espaco.codigo}</td>
      <td>{espaco.nome}</td>
      <td>{espaco.tipo}</td>
      <td>{espaco.andar}</td>
      <td>{espaco.capacidade}</td>
      <td>{espaco.ativo ? "SIM" : "NÃO"}</td>
      <td className="menu-cell">
        <button className="menu-button">⋮</button>
      </td>
    </tr>
  );
};

export default EspacoRow;
