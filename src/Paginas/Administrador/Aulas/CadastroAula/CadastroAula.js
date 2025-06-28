import React, { useState, useEffect } from 'react';
import './CadastroAula.css';

import NumeroCompacto from '../../../../componentes/Inputs/NumeroCompacto/NumeroCompacto';
import InputCadastro from "../../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import SelectPadrao from "../../../../componentes/SelectPadrao/SelectPadrao";
import { supabase } from '../../../../Services/supabaseClient';

/**
 * Componente para cadastro ou edição de aulas.
 */
const CadastroAula = ({ onClose, aulaSelecionada = null, onSave }) => {
  const {
    codigo = "",
    nome = "",
    periodo = "MANHÃ",
    usuario_codigo = "",
    qtd_alunos = 0,
    ativo = true
  } = aulaSelecionada || {};

  const [formData, setFormData] = useState({
    codigo,
    nome,
    periodo,
    professor: usuario_codigo,
    qtdAlunos: qtd_alunos,
    ativo: ativo ? "SIM" : "NÃO"
  });

  const [professores, setProfessores] = useState([]);

  // Busca todos os usuários que não são administradores
  useEffect(() => {
  async function fetchProfessores() {
    const { data, error } = await supabase
      .from("usuario")
      .select("codigo, nome, sobrenome")
      .eq("administrador", false)
      .order("nome", { ascending: true });

    console.log("Professores retornados:", data, error); // 🔍 log

    if (!error && data) setProfessores(data);
    else console.error("Erro ao buscar professores:", error);
  }

  fetchProfessores();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSalvar = async () => {
    const aula = {
      nome: formData.nome,
      periodo: formData.periodo,
      usuario_codigo: formData.professor,
      qtd_alunos: formData.qtdAlunos,
      ativo: formData.ativo === "SIM"
    };

    const { error } = formData.codigo
      ? await supabase.from("aula").update(aula).eq("codigo", formData.codigo)
      : await supabase.from("aula").insert(aula);

    if (error) {
      alert("Erro ao salvar aula: " + error.message);
      return;
    }

    onSave && onSave();
    onClose();
  };

  const handleExcluir = async () => {
    if (!formData.codigo) return;

    const { error } = await supabase.from("Aula").delete().eq("codigo", formData.codigo);
    if (error) alert("Erro ao excluir aula: " + error.message);
    else {
      onSave && onSave();
      onClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>{formData.codigo ? "Editar Aula" : "Cadastro de Aula"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-grid">
          <div className="form-left">
            <InputCadastro label="Código" value={formData.codigo} visualOnly />
            <InputCadastro label="Nome da Disciplina" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
            <SelectPadrao label="Período" value={formData.periodo} options={["MANHÃ", "TARDE", "NOITE"].map(p => ({ label: p, value: p }))} onChange={(valor) => handleChange("periodo", valor)} />
            <SelectPadrao
              label="Professor"
              value={formData.professor}
              options={professores.map(p => ({ label: `${p.nome} ${p.sobrenome}`, value: p.codigo }))}
              onChange={(valor) => {
                console.log("Professor selecionado:", valor);
                handleChange("professor", valor);
              }}
              placeholder="Selecione o professor"
            />
            <NumeroCompacto value={formData.qtdAlunos} onChange={(e) => handleChange("qtdAlunos", e.target.value)} label="Quantidade Matriculados" />
          </div>

          <div className="form-right">
            <div className="radio-container">
              <RadioGroup label="Ativo" options={["SIM", "NÃO"]} value={formData.ativo} onChange={(value) => handleChange("ativo", value)} />
            </div>

            <div className="form-actions">
              <ButtonSalvar onClick={handleSalvar} />
              {formData.codigo && <ButtonExcluir onClick={handleExcluir} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroAula;
