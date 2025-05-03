import React, { useState } from 'react';
import './CadastroEspacos.css';
import InputCadastro from "../../../componentes/Inputs/InputCadastro/InputCadastro";
import RadioGroup from "../../../componentes/RadioGroup/RadioGroup";
import ButtonSalvar from "../../../componentes/Buttons/ButtonSalvar/ButtonSalvar";
import ButtonExcluir from "../../../componentes/Buttons/ButtonExcluir/ButtonExcluir";

const CadastroEspacoModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    andar: 1,
    comporta: "",
    reservasFixas: "SIM",
    ativo: "SIM"
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          <h2>Cadastro de Espaço</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-grid">
          <div className="form-left">
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
              label="Andar"
              type="number"
              value={formData.andar}
              onChange={(e) => handleChange("andar", e.target.value)}
            />
            <InputCadastro
              label="Comporta"
              type="number"
              value={formData.comporta}
              onChange={(e) => handleChange("comporta", e.target.value)}
            />
          </div>

          <div className="form-right">
            <div className="radio-container">
              <RadioGroup
                label="Disponível para reservas fixas"
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
              <ButtonSalvar onClick={() => console.log("Salvar espaço", formData)} />
              <ButtonExcluir onClick={() => console.log("Excluir espaço")} />
            </div>
          </div>
        </div>

        <div className="recursos">
          <h3>Recursos Disponíveis</h3>
          <div className="recursos-columns">
            <div className="recursos-fisicos">
              <h4>Físicos</h4>
              <div className="recurso">
                <img src="/icones/Icon-Espacos/TV.svg" alt="TV" className="icone" />
                <input type="number" placeholder="Qtd" />
                <span>Televisores</span>
              </div>
              <div className="recurso">
                <img src="/icones/Icon-Espacos/QuadroNegro.svg" alt="Quadro" className="icone" />
                <input type="number" defaultValue={1} />
                <span>Quadros</span>
              </div>
              <div className="recurso">
                <img src="/icones/Icon-Espacos/Computador.svg" alt="Computador" className="icone" />
                <input type="number" defaultValue={20} />
                <span>Computadores</span>
              </div>
            </div>

            <div className="recursos-softwares">
              <h4>Softwares</h4>
              <div className="software-search">
                <img src="/icones/Icon-Espacos/Software.svg" alt="Buscar" className="icone" />
                <input type="text" placeholder="Buscar Recurso" />
              </div>
              <ul>
                <li>+ ASTAH</li>
                <li>+ MICROSOFT WORD</li>
                <li>+ MICROSOFT EXCEL</li>
                <li>+ CURSOR</li>
                <li>+ TEAMS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroEspacoModal;
