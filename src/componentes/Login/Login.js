import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    console.log("Email digitado:", email);
    console.log("Senha digitada:", password);
  
    if (email === "admin@sessori.com" && password === "Admin123!") {
      localStorage.setItem("token", "userToken"); // Salva o token no localStorage
      navigate("/"); // Redireciona para a landing page
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>BEM VINDO!</h2>
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
          <Button label="ENTRAR" />
        </form>
      </div>
    </div>
  );
};

export default Login;
