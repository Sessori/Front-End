import React, { useState } from "react";
import InputCadastro from "../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import "./CadastroUsuario.css";

const CadastroUsuario = ({ onClose }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    administrador: "SIM",
    reservasFixas: "SIM",
    ativo: "SIM",
    foto: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para fechar o modal ao clicar fora
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("cadastro-modal")) {
      onClose();
    }
  };

  return (
    <div className="cadastro-modal" onClick={handleOutsideClick}>
      <div className="cadastro-card" onClick={(e) => e.stopPropagation()}>
        <h2>Cadastro de Usuário</h2>

        <div className="cadastro-form"> {/* 🔹 Alterado de <form> para <div> */}

          {/* Esquerda: Foto + Inputs */}
          <div className="form-left">
            <div className="foto-container">
              <label htmlFor="fotoUpload">
                {formData.foto ? (
                  <img src={formData.foto} alt="Foto do usuário" className="foto-preview" />
                ) : (
                  <div className="foto-placeholder">
                    <span>+</span>
                  </div>
                )}
              </label>
              <input type="file" id="fotoUpload" accept="image/*" onChange={handleFotoChange} />
            </div>

            <InputCadastro label="Código" value={formData.codigo} onChange={(e) => handleChange("codigo", e.target.value)} />
            <InputCadastro label="Nome" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
            <InputCadastro label="Sobrenome" value={formData.sobrenome} onChange={(e) => handleChange("sobrenome", e.target.value)} />
            <InputCadastro label="E-mail" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
            <InputCadastro label="Senha" type="password" value={formData.senha} onChange={(e) => handleChange("senha", e.target.value)} />
          </div>

          {/* Direita: RadioGroup + Botões */}
          <div className="form-right">
            <div className="radio-container">
            <RadioGroup label="Administrador" options={["SIM", "NÃO"]} value={formData.administrador} onChange={(value) => handleChange("administrador", value)} />
            <RadioGroup label="Pode realizar reservas fixas?" options={["SIM", "NÃO"]} value={formData.reservasFixas} onChange={(value) => handleChange("reservasFixas", value)} />
            <RadioGroup label="Ativo" options={["SIM", "NÃO"]} value={formData.ativo} onChange={(value) => handleChange("ativo", value)} />
            </div>

            {/* Botões abaixo dos RadioGroups */}
            <div className="form-actions">
              <ButtonSalvar />
              <ButtonExcluir />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;
