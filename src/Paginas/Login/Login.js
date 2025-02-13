import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Input from "../../componentes/Input/Input";
import ButtonEntrar from "../../componentes/Buttons/ButtonEntrar/ButtonEntrar"; // Importando o novo botão

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email digitado:", email);
    console.log("Senha digitada:", password);

    if (email === "admin@sessori.com" && password === "Admin123!") {
      localStorage.setItem("token", "userToken");
      navigate("/");
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="login-container">
      {/* Coluna da esquerda: Formulário */}
      <div className="login-form">
        <div className="login-logo">
          <img src="/icones/logo.svg" alt="Sessori Logo" className="logo" />
        </div>
        <h2>Bem vindo ao Sessori !</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Substituindo ButtonGeneric por ButtonEntrar */}
          <ButtonEntrar onClick={handleLogin} />
        </form>
        <p className="forgot-password">Esqueceu a senha?</p>
        <div className="social-login">
          <p>Ou entrar através</p>
          <ButtonEntrar onClick={() => alert("Login com Google em desenvolvimento!")} label="Entrar com o Google" />
          <ButtonEntrar onClick={() => alert("Login com Microsoft em desenvolvimento!")} label="Entrar com Microsoft" />
        </div>
      </div>

      {/* Coluna da direita: Ilustração */}
      <div className="login-illustration"></div>
    </div>
  );
};

export default Login;
