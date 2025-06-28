// Importações principais
import React, { useState, useEffect } from "react";
import InputCadastro from "../../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";
import "./CadastroUsuario.css";

// Integrações com Supabase e serviços de usuário
import { supabase } from '../../../../Services/supabaseClient';
import { criarUsuario, atualizarUsuario, excluirUsuario } from '../../../../Services/usuarioService';

// Componente de formulário para cadastrar ou editar usuários
const CadastroUsuario = ({ onClose, onSave, usuarioSelecionado }) => {
  // Estado do formulário
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

  // Estados auxiliares para manipulação de imagem
  const [previewFoto, setPreviewFoto] = useState(null); // preview exibido no formulário
  const [loadingFoto, setLoadingFoto] = useState(false); // indicador de upload
  const [fotoFile, setFotoFile] = useState(null); // arquivo da foto selecionada

  // Preenche o formulário com os dados do usuário selecionado (em caso de edição)
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

  // Atualiza os campos do formulário dinamicamente
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Manipula seleção de nova foto
  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingFoto(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setLoadingFoto(false);
      };
      reader.readAsDataURL(file);

      setFotoFile(file);
    }
  };

  // Remove a foto atual do perfil
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

  // Salva as alterações ou cria novo usuário
  const handleSalvar = async () => {
    const dados = {
      ...formData,
      fotoFile
    };

    let res;
    if (usuarioSelecionado) {
      console.log("🔄 Atualizando usuário:");
      res = await atualizarUsuario(formData.codigo, dados);
    } else {
      console.log("🆕 Criando novo usuário:");
      res = await criarUsuario(dados);
    }

    if (res.success) {
      alert("Usuário salvo com sucesso!");
      if (typeof onSave === 'function') onSave();
      onClose();
    } else {
      alert("Erro: " + res.error);
      console.error("❌ Erro ao salvar:", res.error);
    }
  };

  // Exclui o usuário atual
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

  // Fecha o modal se clicar fora do cartão
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
          {/* Lado esquerdo: campos e foto */}
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

            {/* Campos de entrada de dados */}
            <InputCadastro label="Código" value={formData.codigo} visualOnly />
            <InputCadastro label="Nome" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
            <InputCadastro label="Sobrenome" value={formData.sobrenome} onChange={(e) => handleChange("sobrenome", e.target.value)} />
            <InputCadastro label="E-mail" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
            {!usuarioSelecionado && (
              <InputCadastro label="Senha" type="password" value={formData.senha} onChange={(e) => handleChange("senha", e.target.value)} />
            )}
          </div>

          {/* Lado direito: opções e botões */}
          <div className="form-right">
            <div className="radio-container">
              <RadioGroup label="Administrador" options={["SIM", "NÃO"]} value={formData.administrador} onChange={(value) => handleChange("administrador", value)} />
              <RadioGroup label="Pode realizar reservas fixas?" options={["SIM", "NÃO"]} value={formData.reservasFixas} onChange={(value) => handleChange("reservasFixas", value)} />
              <RadioGroup label="Ativo" options={["SIM", "NÃO"]} value={formData.ativo} onChange={(value) => handleChange("ativo", value)} />
            </div>

            <div className="form-actions">
              <ButtonSalvar onClick={handleSalvar} disabled={loadingFoto} />
              {usuarioSelecionado && <ButtonExcluir onClick={handleExcluir} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;