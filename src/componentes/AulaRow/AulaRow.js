import React from "react";

const AulaRow = ({ aula }) => {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td>{aula.id}</td>
      <td>{aula.nome}</td>
      <td>{aula.periodo}</td>
      <td>{aula.professor}</td>
      <td>{aula.qtd_alunos}</td>
      <td>{aula.ativo ? "SIM" : "NÃO"}</td>
      <td><button className="editar-btn">⋮</button></td>
    </tr>
  );
};

export default AulaRow;
