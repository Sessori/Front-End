import React, { useState } from "react";
import "./Suporte.css";

const Suporte = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode integrar com um backend ou serviço de e-mail (como EmailJS, API, etc.)
    alert("Mensagem de suporte enviada com sucesso!");
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
  };

  return (
    <div className="suporte-page-container">
      <div className="suporte-wrapper">
        <h1>Suporte Técnico</h1>
        <p>Envie sua dúvida ou problema através do formulário abaixo:</p>
        <form onSubmit={handleSubmit} className="suporte-form">
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Assunto:
            <input
              type="text"
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mensagem:
            <textarea
              name="mensagem"
              rows="5"
              value={formData.mensagem}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Suporte;
