import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuLateral.css";

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ativo, setAtivo] = useState(null); // Estado para armazenar o item ativo
  const navigate = useNavigate(); // React Router para navegação

  const handleMouseEnter = () => {
    setIsOpen(true); // Abre o menu ao passar o mouse
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Fecha o menu ao sair com o mouse
  };

  const handleItemClick = (index, route) => {
    setAtivo(index); // Define o item clicado como ativo
    navigate(route); // Navega para a rota correspondente
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
      onMouseEnter={handleMouseEnter} // Abre o menu ao passar o mouse
      onMouseLeave={handleMouseLeave} // Fecha o menu ao sair o mouse
    >
      {/* Logo */}
      <div className="logo">
        <img src="/icones/logo.svg" alt="Logo" className="logo-img" />
      </div>

      {/* Itens do Menu */}
      <ul className="menu-itens">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={ativo === index ? "ativo" : ""}
            onClick={() => handleItemClick(index, item.route)} // Navega ao clicar
          >
            <img src={item.icon} alt={item.name} className="menu-icon" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Rodapé */}
      <div className="menu-rodape">
        <ul>
          {rodapeItems.map((item, index) => (
            <li
              key={index + menuItems.length} // Evita conflito de keys
              className={ativo === index + menuItems.length ? "ativo" : ""}
              onClick={() => handleItemClick(index + menuItems.length, item.route)}
            >
              <img src={item.icon} alt={item.name} className="menu-icon" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuLateral;
