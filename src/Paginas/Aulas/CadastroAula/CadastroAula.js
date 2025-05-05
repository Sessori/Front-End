import React, { useState, useEffect } from 'react';
import './CadastroAula.css';
import NumeroCompacto from '../../../componentes/Inputs/NumeroCompacto/NumeroCompacto';
import InputCadastro from "../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import SelectPadrao from "../../../componentes/SelectPadrao/SelectPadrao";
import supabase from "../../../Services/Supabase";

const CadastroAula = ({ onClose, aulaSelecionada = {} }) => {
  const [formData, setFormData] = useState({
    codigo: aulaSelecionada.id || "",
    nome: aulaSelecionada.nome || "",
    periodo: aulaSelecionada.periodo || "MANHÃ",
    professor: aulaSelecionada.professor || "",
    qtdAlunos: aulaSelecionada.qtd_alunos || 0,
    ativo: aulaSelecionada.ativo || "SIM"
  });

  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    async function fetchProfessores() {
      const { data, error } = await supabase.from("professores").select("*");
      if (!error) setProfessores(data);
    }
    fetchProfessores();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSalvar = async () => {
    const aula = {
      nome: formData.nome,
      periodo: formData.periodo,
      professor: formData.professor,
      qtd_alunos: formData.qtdAlunos,
      ativo: formData.ativo === "SIM"
    };

    if (formData.codigo) {
      await supabase.from("aulas").update(aula).eq("id", formData.codigo);
    } else {
      await supabase.from("aulas").insert(aula);
    }

    onClose();
  };

  const handleExcluir = async () => {
    if (formData.codigo) {
      await supabase.from("aulas").delete().eq("id", formData.codigo);
    }
    onClose();
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
          <h2>Cadastro de Aula</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-grid">
          <div className="form-left">
            <InputCadastro
              label="Código"
              value={formData.codigo}
              onChange={() => {}}
              disabled
            />
            <InputCadastro
              label="Nome da Disciplina"
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
            <SelectPadrao
              label="Período"
              value={formData.periodo}
              options={["MANHÃ", "TARDE", "NOITE"]}
              onChange={(valor) => handleChange("periodo", valor)}
            />

            <SelectPadrao
              label="Professor"
              value={formData.professor}
              options={professores.map((p) => p.nome)}
              onChange={(valor) => handleChange("professor", valor)}
            />

            <NumeroCompacto
              value={formData.qtdAlunos}
              onChange={(e) => handleChange("qtdAlunos", e.target.value)}
              label="QUANTIDADE MATRICULADOS"
            />
          </div>

          <div className="form-right">
            <div className="radio-container">
              <RadioGroup
                label="Ativo"
                options={["SIM", "NÃO"]}
                value={formData.ativo}
                onChange={(value) => handleChange("ativo", value)}
              />
            </div>

            <div className="form-actions">
              <ButtonSalvar onClick={handleSalvar} />
              <ButtonExcluir onClick={handleExcluir} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroAula;
