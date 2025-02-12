import React, { useState } from "react";
import Button from "../../componentes/Button/Button";
import CadastroUsuario from "./CadastroUsuario/CadastroUsuario"; // Certifique-se que o caminho está correto
import "./Usuarios.css";

const Usuarios = () => {
  const [showCadastro, setShowCadastro] = useState(false); // Estado para abrir/fechar modal
  const [activeMenu, setActiveMenu] = useState(null); // Novo estado para controlar qual menu está aberto

  const handleMenuClick = (userId, event) => {
    event.stopPropagation(); // Previne que o clique propague
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  // Fecha o menu quando clicar fora
  React.useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const usuarios = [
    { id: 1, nome: "Scarlett Johansson", email: "scarlett@gmail.com", dataCadastro: "17/06/2024", tipo: "Administrador", ativo: "SIM" },
    { id: 2, nome: "Leonardo DiCaprio", email: "leonardo@gmail.com", dataCadastro: "24/11/2024", tipo: "Professor (a)", ativo: "SIM" },
    { id: 3, nome: "Christian Bale", email: "christian@gmail.com", dataCadastro: "28/03/2024", tipo: "Professor (a)", ativo: "SIM" },
  ];

  return (
    <div className="usuarios-container">
      {/* Barra de Pesquisa e Botões */}
      <div className="usuarios-header">
        <input type="text" placeholder="Pesquisar" className="search-bar" />
        <div className="usuarios-actions">
          <Button 
            label="INCLUIR" 
            onClick={() => {
              console.log('Botão clicado');
              console.log('Estado anterior:', showCadastro);
              setShowCadastro(true);
              console.log('Novo estado:', true);
            }} 
            color="primary" 
          />
          <Button label="EXCLUIR" onClick={() => alert("Excluir selecionados")} color="danger" />
        </div>
      </div>

      {/* Tabela de Usuários */}
      <table className="usuarios-table">
        <thead>
          <tr>
            <th></th>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>DATA DE CADASTRO</th>
            <th>TIPO</th>
            <th>ATIVO</th>
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td><input type="checkbox" /></td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.dataCadastro}</td>
              <td>{user.tipo}</td>
              <td>{user.ativo}</td>
              <td className="menu-cell">
                <div className="menu-container">
                  <button className="menu-button" onClick={(e) => handleMenuClick(user.id, e)}>⋮</button>
                  {activeMenu === user.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => alert('Editar')}>Editar</button>
                      <button onClick={() => alert('Excluir')}>Excluir</button>
                      <button onClick={() => alert('Desativar')}>Desativar</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Cadastro de Usuário */}
      {showCadastro && (
        <div className="modal-overlay">
          <CadastroUsuario 
            onClose={() => setShowCadastro(false)}
            onSave={(userData) => {
              // Aqui você pode adicionar a lógica para salvar o usuário
              console.log('Novo usuário:', userData);
              setShowCadastro(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Usuarios;
