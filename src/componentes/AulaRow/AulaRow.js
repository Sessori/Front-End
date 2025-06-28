import React from "react";

const AulaRow = ({ aula, onEdit }) => {
  return (
    <tr>
      {/* Checkbox para seleção futura (ex: exclusão em massa) */}
      <td><input type="checkbox" /></td>

      {/* Dados da aula */}
        <td>{dados.nome}</td>
        <td>{dados.periodo}</td>
        <td>{dados.professor_nome}</td>
        <td>{dados.qtd_alunos}</td>
        <td>{dados.ativo}</td>
        <td><button onClick={() => onEdit(dados)}>⋮</button></td>

      {/* Botão de ações */}
      <td>
        <button className="editar-btn" onClick={onEdit} title="Editar aula">
          ⋮
        </button>
      </td>
    </tr>
  );
};

export default AulaRow;
