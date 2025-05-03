import React from 'react';
import './CadastroEspacos.css';

const CadastroEspacoModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="header">
          <h2>Cadastro de Espaço</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-grid">
          <input type="text" placeholder="Código" />
          <input type="text" placeholder="Nome" />
          
          <div className="form-group">
            <label>Disponível para reservas fixas</label>
            <div>
              <label><input type="radio" name="fixa" defaultChecked /> Sim</label>
              <label><input type="radio" name="fixa" /> Não</label>
            </div>
          </div>

          <div className="form-group">
            <label>Ativo</label>
            <div>
              <label><input type="radio" name="ativo" defaultChecked /> Sim</label>
              <label><input type="radio" name="ativo" /> Não</label>
            </div>
          </div>

          <div>
            <label>Andar</label>
            <input type="number" defaultValue={1} />
          </div>

          <div>
            <label>Comporta</label>
            <input type="number" placeholder="Qtd" />
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

        <div className="footer">
          <button className="btn-salvar">Salvar</button>
          <button className="btn-excluir">Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroEspacoModal;
