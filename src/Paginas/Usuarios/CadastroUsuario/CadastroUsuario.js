import React, { useState } from "react";
import Input from "../../../componentes/Input/Input";
import Button from "../../../componentes/Button/Button";
import RadioGroup from "../../../componentes/RadioGroup/RadioGroup";
import "./CadastroUsuario.css";

const CadastroUsuario = ({ onClose }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    reservasFixas: "SIM",
    ativo: "SIM",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados cadastrados:", formData);
    onClose(); // Fecha o modal após o cadastro
  };

  return (
    <div className="cadastro-modal">
      <div className="cadastro-card">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Código" value={formData.codigo} onChange={(e) => handleChange("codigo", e.target.value)} />
          <Input label="Nome" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
          <Input label="Sobrenome" value={formData.sobrenome} onChange={(e) => handleChange("sobrenome", e.target.value)} />
          <Input label="E-mail" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
          <Input label="Senha" type="password" value={formData.senha} onChange={(e) => handleChange("senha", e.target.value)} />

          <RadioGroup label="Pode realizar reservas fixas?" options={["SIM", "NÃO"]} value={formData.reservasFixas} onChange={(value) => handleChange("reservasFixas", value)} />
          <RadioGroup label="Ativo" options={["SIM", "NÃO"]} value={formData.ativo} onChange={(value) => handleChange("ativo", value)} />

          <div className="form-actions">
            <Button label="SALVAR" color="success" type="submit" />
            <Button label="CANCELAR" color="secondary" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
