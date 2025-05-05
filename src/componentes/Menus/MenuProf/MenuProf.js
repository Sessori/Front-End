import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuProf.css";

const MenuProf = () => {
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
    { name: "Home", icon: "/icones/Icon-menu/home.svg", route: "/" },
    { name: "Agendar", icon: "/icones/Icon-menu/agendar.svg", route: "/agendar" },
    { name: "Solicitar Recurso", icon: "/icones/Icon-menu/recurso.svg", route: "/recurso" },
    { name: "Notificar Alunos", icon: "/icones/Icon-menu/notificar.svg", route: "/notificar" },
  ];

  const rodapeItems = [
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
        {isOpen && <span>Sair</span>}
        </button>
      </div>
    </div>
  );
};

export default MenuProf;
