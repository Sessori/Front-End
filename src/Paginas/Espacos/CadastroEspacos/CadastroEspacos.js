import React, { useState } from 'react';
import './CadastroEspacos.css';
import InputCadastro from "../../../componentes/Inputs/InputCadastro/InputCadastro";
import NumeroCompacto from "../../../componentes/Inputs/NumeroCompacto/NumeroCompacto";
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
    ativo: "SIM",
    tv: 0,
    quadro: 1,
    computador: 20
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
            <NumeroCompacto
              value={formData.andar}
              onChange={(e) => handleChange("andar", e.target.value)}
              label="ANDAR"
            />
            <NumeroCompacto
              value={formData.comporta}
              onChange={(e) => handleChange("comporta", e.target.value)}
              label="COMPORTA"
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
                <NumeroCompacto
                  value={formData.tv}
                  onChange={(e) => handleChange("tv", e.target.value)}
                />
                <span>Televisores</span>
              </div>
              <div className="recurso">
                <img src="/icones/Icon-Espacos/QuadroNegro.svg" alt="Quadro" className="icone" />
                <NumeroCompacto
                  value={formData.quadro}
                  onChange={(e) => handleChange("quadro", e.target.value)}
                />
                <span>Quadros</span>
              </div>
              <div className="recurso">
                <img src="/icones/Icon-Espacos/Computador.svg" alt="Computador" className="icone" />
                <NumeroCompacto
                  value={formData.computador}
                  onChange={(e) => handleChange("computador", e.target.value)}
                />
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
