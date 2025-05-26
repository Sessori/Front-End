import React, { useState } from "react";
import InputCadastro from "../../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import "./CadastroUsuario.css";

import { supabase } from '../../../../Services/supabaseClient';
import { criarUsuario } from '../../../../Services/usuarioService';

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
    fotoPath: null
  });

  const [previewFoto, setPreviewFoto] = useState(null);
  const [loadingFoto, setLoadingFoto] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadUserPhoto = async (file, userId) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `fotos-perfil/${userId}.${fileExt}`;

    const { error } = await supabase.storage
      .from('fotos-perfil')
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
      .from('fotos-perfil')
      .getPublicUrl(filePath);

    return { publicUrl: data.publicUrl, filePath };
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);

      setLoadingFoto(true);
      try {
        const identificador = formData.codigo || formData.email || Date.now();
        const { publicUrl, filePath } = await uploadUserPhoto(file, identificador);
        setFormData((prev) => ({
          ...prev,
          foto: publicUrl,
          fotoPath: filePath
        }));
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
      }
      setLoadingFoto(false);
    }
  };

  const handleRemoverFoto = async () => {
    if (formData.fotoPath) {
      try {
        await supabase.storage
          .from('fotos-perfil')
          .remove([formData.fotoPath]);
        console.log("Foto removida com sucesso.");
      } catch (error) {
        console.error("Erro ao remover a foto:", error);
      }
    }
    setPreviewFoto(null);
    setFormData((prev) => ({ ...prev, foto: null, fotoPath: null }));
  };

  const handleSalvar = async () => {
    const res = await criarUsuario(formData);

    if (res.success) {
      alert("Usuário criado com sucesso!");
      onClose();  // Fecha o modal
    } else {
      alert("Erro: " + res.error);
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
        <h2>Cadastro de Usuário</h2>

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
              onChange={(e) => handleChange("codigo", e.target.value)}
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
            <InputCadastro
              label="Senha"
              type="password"
              value={formData.senha}
              onChange={(e) => handleChange("senha", e.target.value)}
            />
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
              <ButtonExcluir onClick={() => console.log("Excluir")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;
