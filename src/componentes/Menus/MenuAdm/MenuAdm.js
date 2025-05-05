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
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", icon: "/icones/Icon-menu/home.svg", route: "/" },
    { name: "Usuários", icon: "/icones/Icon-menu/user.svg", route: "/usuarios" },
    { name: "Espaços", icon: "/icones/Icon-menu/espacos.svg", route: "/espacos" },
    { name: "Aulas", icon: "/icones/Icon-menu/aulas.svg", route: "/aulas" },
    { name: "Solicitações", icon: "/icones/Icon-menu/solicitacoes.svg", route: "/solicitacoes" },
  ];

  const rodapeItems = [
    { name: "Configurações", icon: "/icones/Icon-menu/config.svg", route: "/configuracoes" },
    { name: "Suporte", icon: "/icones/Icon-menu/suporte.svg", route: "/suporte" },
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
          <img src="/icones/Icon-menu/sair.svg" alt="Sair" className="menu-icon" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default MenuAdm;
