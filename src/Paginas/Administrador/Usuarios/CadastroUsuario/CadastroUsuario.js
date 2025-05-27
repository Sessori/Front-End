import React, { useState, useEffect } from "react";
import InputCadastro from "../../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import "./CadastroUsuario.css";

import { supabase } from '../../../../Services/supabaseClient';
import { criarUsuario, atualizarUsuario, excluirUsuario } from '../../../../Services/usuarioService';

const CadastroUsuario = ({ onClose, usuarioSelecionado }) => {
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
    fotoPath: null
  });

  const [previewFoto, setPreviewFoto] = useState(null);
  const [loadingFoto, setLoadingFoto] = useState(false);
  const [fotoFile, setFotoFile] = useState(null);

  useEffect(() => {
    if (usuarioSelecionado) {
      setFormData({
        codigo: usuarioSelecionado.codigo,
        nome: usuarioSelecionado.nome,
        sobrenome: usuarioSelecionado.sobrenome,
        email: usuarioSelecionado.email,
        senha: "",
        administrador: usuarioSelecionado.administrador ? "SIM" : "NÃO",
        reservasFixas: usuarioSelecionado.realizar_reservas_fixas ? "SIM" : "NÃO",
        ativo: usuarioSelecionado.ativo ? "SIM" : "NÃO",
        foto: usuarioSelecionado.foto,
        fotoPath: usuarioSelecionado.fotoPath || null
      });
    }
  }, [usuarioSelecionado]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);

      setFotoFile(file);
    }
  };

  const handleRemoverFoto = async () => {
    if (!formData.fotoPath) {
      setFormData(prev => ({ ...prev, foto: null, fotoPath: null }));
      setPreviewFoto(null);
      setFotoFile(null);
      return;
    }

    const { error } = await supabase.storage
      .from('fotos-perfil')
      .remove([formData.fotoPath]);

    if (error) {
      console.error("Erro ao remover foto:", error);
      alert("Erro ao remover foto.");
      return;
    }

    setFormData(prev => ({ ...prev, foto: null, fotoPath: null }));
    setPreviewFoto(null);
    setFotoFile(null);
    alert("Foto removida com sucesso.");
  };

  const handleSalvar = async () => {
    const dados = {
      ...formData,
      fotoFile
    };

    let res;
    if (usuarioSelecionado) {
      res = await atualizarUsuario(formData.codigo, dados);
    } else {
      res = await criarUsuario(dados);
    }

    if (res.success) {
      alert("Usuário salvo com sucesso!");
      onClose();
    } else {
      alert("Erro: " + res.error);
    }
  };

  const handleExcluir = async () => {
    if (!usuarioSelecionado) return;

    const confirm = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirm) return;

    const res = await excluirUsuario(formData.codigo);

    if (res.success) {
      alert("Usuário excluído com sucesso!");
      onClose();
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("cadastro-modal")) {
      onClose();
    }
  };

  return (
    <div className="cadastro-modal" onClick={handleOutsideClick}>
      <div className="cadastro-card" onClick={(e) => e.stopPropagation()}>
        <h2>{usuarioSelecionado ? "Editar Usuário" : "Cadastro de Usuário"}</h2>

        <div className="cadastro-form">
          <div className="form-left">
            <div className="foto-container">
              <label htmlFor="fotoUpload">
                {previewFoto || formData.foto ? (
                  <img
                    src={previewFoto || formData.foto}
                    alt="Foto do usuário"
                    className="foto-preview"
                  />
                ) : (
                  <div className="foto-placeholder">
                    <span>+</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="fotoUpload"
                accept="image/*"
                onChange={handleFotoChange}
              />

              {loadingFoto && <p>Enviando foto...</p>}

              {(previewFoto || formData.foto) && (
                <button
                  type="button"
                  className="botao-remover-foto"
                  onClick={handleRemoverFoto}
                >
                  Remover Foto
                </button>
              )}
            </div>

            <InputCadastro
              label="Código"
              value={formData.codigo}
              disabled
            />
            <InputCadastro
              label="Nome"
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
            <InputCadastro
              label="Sobrenome"
              value={formData.sobrenome}
              onChange={(e) => handleChange("sobrenome", e.target.value)}
            />
            <InputCadastro
              label="E-mail"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {!usuarioSelecionado && (
              <InputCadastro
                label="Senha"
                type="password"
                value={formData.senha}
                onChange={(e) => handleChange("senha", e.target.value)}
              />
            )}
          </div>

          <div className="form-right">
            <div className="radio-container">
              <RadioGroup
                label="Administrador"
                options={["SIM", "NÃO"]}
                value={formData.administrador}
                onChange={(value) => handleChange("administrador", value)}
              />
              <RadioGroup
                label="Pode realizar reservas fixas?"
                options={["SIM", "NÃO"]}
                value={formData.reservasFixas}
                onChange={(value) => handleChange("reservasFixas", value)}
              />
              <RadioGroup
                label="Ativo"
                options={["SIM", "NÃO"]}
                value={formData.ativo}
                onChange={(value) => handleChange("ativo", value)}
              />
            </div>

            <div className="form-actions">
              <ButtonSalvar onClick={handleSalvar} />
              {usuarioSelecionado && <ButtonExcluir onClick={handleExcluir} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;
