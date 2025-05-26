import React from "react";
import "./Suporte.css";

const Suporte = () => {
  const contacts = [
    { name: "Atendimento Geral", phone: "0800-123-4567" },
    { name: "Suporte Técnico", phone: "0800-987-6543" },
    { name: "Ajuda Financeira", phone: "0800-456-7890" },
  ];

  return (
    <div className="suporte-container">
      <h1>Central de Suporte</h1>
      <p>Entre em contato com um de nossos canais de suporte abaixo:</p>
      <ul className="contact-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <img src="/icones/phone.svg" alt="Ícone de Telefone" className="phone-icon" />
            <div>
              <h2>{contact.name}</h2>
              <p>{contact.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suporte;
