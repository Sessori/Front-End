import React, { useState, useEffect } from 'react';
import './CadastroAula.css';

import NumeroCompacto from '../../../../componentes/Inputs/NumeroCompacto/NumeroCompacto';
import InputCadastro from "../../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import SelectPadrao from "../../../../componentes/SelectPadrao/SelectPadrao";
import { supabase } from '../../../../Services/supabaseClient';

const CadastroAula = ({ onClose, aulaSelecionada = null, onSave }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    periodo: "MANHÃ",
    professor: "",
    qtdAlunos: 0,
    ativo: "SIM"
  });

  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    if (aulaSelecionada) {
      setFormData({
        codigo: aulaSelecionada.codigo || "",
        nome: aulaSelecionada.nome || "",
        periodo: aulaSelecionada.periodo || "MANHÃ",
        professor: aulaSelecionada.usuario_codigo ? String(aulaSelecionada.usuario_codigo) : "",
        qtdAlunos: aulaSelecionada.qtd_alunos || 0,
        ativo: aulaSelecionada.ativo === true || aulaSelecionada.ativo === "SIM" ? "SIM" : "NÃO"
      });
    } else {
      setFormData({
        codigo: "",
        nome: "",
        periodo: "MANHÃ",
        professor: "",
        qtdAlunos: 0,
        ativo: "SIM"
      });
    }
  }, [aulaSelecionada]);

  useEffect(() => {
    async function fetchProfessores() {
      const { data, error } = await supabase
        .from("usuario")
        .select("codigo, nome, sobrenome")
        .eq("administrador", false)
        .order("nome", { ascending: true });

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
      usuario_codigo: formData.professor ? parseInt(formData.professor) : null,
      qtd_alunos: formData.qtdAlunos ? parseInt(formData.qtdAlunos) : null,
      ativo: formData.ativo === "SIM"
    };

    if (!aula.usuario_codigo) {
      alert("Selecione um professor antes de salvar.");
      return;
    }

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

    const { error } = await supabase.from("aula").delete().eq("codigo", formData.codigo);
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
              options={professores.map(p => ({ label: `${p.nome} ${p.sobrenome}`, value: String(p.codigo) }))}
              onChange={(valor) => handleChange("professor", valor)}
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