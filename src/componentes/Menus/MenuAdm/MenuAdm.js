import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuAdm.css";

const MenuAdm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ativo, setAtivo] = useState(null); 
  const navigate = useNavigate(); 

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleItemClick = (index, route) => {
    setAtivo(index);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token da autenticação
    navigate("/login"); // Redireciona para a página de login
  };

  const menuItems = [
    { name: "Home", icon: "/icones/home.svg", route: "/" },
    { name: "Usuários", icon: "/icones/user.svg", route: "/usuarios" },
    { name: "Espaços", icon: "/icones/espacos.svg", route: "/espacos" },
    { name: "Solicitações", icon: "/icones/solicitacoes.svg", route: "/solicitacoes" },
  ];

  const rodapeItems = [
    { name: "Configurações", icon: "/icones/config.svg", route: "/configuracoes" },
    { name: "Suporte", icon: "/icones/suporte.svg", route: "/suporte" },
  ];

  return (
    <div
      className={`menu-lateral ${isOpen ? "aberto" : "fechado"}`}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
      <div className="logo">
        <img src="/icones/logo.svg" alt="Logo" className="logo-img" />
      </div>

      <ul className="menu-itens">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={ativo === index ? "ativo" : ""}
            onClick={() => handleItemClick(index, item.route)}
          >
            <img src={item.icon} alt={item.name} className="menu-icon" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="menu-rodape">
        <ul>
          {rodapeItems.map((item, index) => (
            <li
              key={index + menuItems.length} 
              className={ativo === index + menuItems.length ? "ativo" : ""}
              onClick={() => handleItemClick(index + menuItems.length, item.route)}
            >
              <img src={item.icon} alt={item.name} className="menu-icon" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Botão de Logout no Rodapé */}
        <button className="logout-btn" onClick={handleLogout}>
          <img src="/icones/logout.svg" alt="Sair" className="menu-icon" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default MenuAdm;
