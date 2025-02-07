import React, { useState } from "react";
import "./MenuLateral.css";

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false); // Controle de abrir/fechar
  const [ativo, setAtivo] = useState(null); // Estado para armazenar o item ativo

  const handleItemClick = (index) => {
    setAtivo(index); // Define o item clicado como ativo
  };

  const menuItems = [
    { name: "Home", icon: "/icones/home.svg" },
    { name: "Usuários", icon: "/icones/user.svg" },
    { name: "Espaços", icon: "/icones/espacos.svg" },
    { name: "Solicitações", icon: "/icones/solicitacoes.svg" },
  ];

  const rodapeItems = [
    { name: "Configurações", icon: "/icones/config.svg" },
    { name: "Suporte", icon: "/icones/suporte.svg" },
  ];

  return (
    <div
      className={`menu-lateral ${isOpen ? "aberto" : "fechado"}`}
      onMouseEnter={() => setIsOpen(true)} // Abrir menu ao passar o mouse
      onMouseLeave={() => setIsOpen(false)} // Fechar menu ao sair do mouse
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
            onClick={() => handleItemClick(index)}
          >
            <img src={item.icon} alt={item.name} className="menu-icon" />
            {isOpen && <span>{item.name}</span>}
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
              onClick={() => handleItemClick(index + menuItems.length)}
            >
              <img src={item.icon} alt={item.name} className="menu-icon" />
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default MenuLateral;
