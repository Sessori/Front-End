import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ButtonEntrar from "../../componentes/Buttons/ButtonEntrar/ButtonEntrar";
import ButtonGW from "../../componentes/Buttons/ButtonGW/ButtonsGW";
import InputLogin from "../../componentes/Inputs/InputLogin/InputLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email digitado:", email);
    console.log("Senha digitada:", password);
  };

  const handleGoogleLogin = () => {
    alert("Login com Google em desenvolvimento!");
  };

  const handleMicrosoftLogin = () => {
    alert("Login com Microsoft em desenvolvimento!");
  };

  return (
    <div className="login-container">
      {/* Coluna da esquerda: Formulário */}
      <div className="login-form">
        <div className="login-logo">
          <img src="/icones/logo.svg" alt="Sessori Logo" className="logo" />
        </div>
        <h2>Bem-vindo ao Sessori!</h2>
        <form onSubmit={handleLogin}>
          <InputLogin
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLogin
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonEntrar></ButtonEntrar>
          <p className="forgot-password">Esqueceu a senha?</p>
        </form>

        {/* Seção de login social */}
        <div className="social-login">
          <p>ou entrar através</p>
          <ButtonGW
            icon="/icones/Icon-login/Googlelogo.svg"
            text="Entrar com o Google"
            onClick={handleGoogleLogin}
          />
          <ButtonGW
            icon="/icones/Icon-login/MicrosoftLogo.svg"
            text="Entrar com Microsoft"
            onClick={handleMicrosoftLogin}
          />
        </div>
      </div>

      {/* Coluna da direita: Ilustração */}
      <div className="login-illustration"></div>
    </div>
  );
};

export default Login;
