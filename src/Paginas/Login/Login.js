import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import ButtonEntrar from "../../componentes/Buttons/ButtonEntrar/ButtonEntrar";
import ButtonGW from "../../componentes/Buttons/ButtonGW/ButtonsGW";
import InputLogin from "../../componentes/Inputs/InputLogin/InputLogin";

import { supabase } from "../../Services/supabaseClient";
import { useAuth } from "../../auth/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setPerfil } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("Erro ao fazer login: " + error.message);
      return;
    }

    setUser(user);

    const { data: userData, error: dbError } = await supabase
      .from('usuario')
      .select('administrador')
      .eq('email', email)
      .single();

    if (dbError) {
      alert("Erro ao buscar perfil: " + dbError.message);
      return;
    }

    const perfil = userData.administrador ? 'administrador' : 'professor';
    setPerfil(perfil);

    if (perfil === 'administrador') {
      navigate("/usuarios"); 
    } else {
      navigate("/agendar"); 
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Informe seu e-mail para redefinir a senha.");
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/AtualizarSenha'
    });

    if (error) {
      console.error('Erro ao enviar e-mail de redefinição:', error);
      alert("Erro ao enviar e-mail de redefinição: " + error.message);
    } else {
      alert("E-mail de redefinição enviado com sucesso! Verifique sua caixa de entrada.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Login com Google em desenvolvimento!");
  };

  const handleMicrosoftLogin = () => {
    alert("Login com Microsoft em desenvolvimento!");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-logo">
          <img src="/imagens/sessoriLogo.svg" alt="Sessori Logo" className="logo" />
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
          <ButtonEntrar />
          <p className="forgot-password" onClick={handleForgotPassword}>Esqueceu a senha?</p>
        </form>

        <div className="social-login">
          <p>Ou entrar através</p>
          <ButtonGW
            icon="/icones/Icon-login/googleLogo.svg"
            text="Entrar com o Google"
            onClick={handleGoogleLogin}
          />
          <ButtonGW
            icon="/icones/Icon-login/microsoftLogo.svg"
            text="Entrar com Microsoft"
            onClick={handleMicrosoftLogin}
          />
        </div>
      </div>

      <div className="login-illustration">
        <img src="/imagens/fundoprincipal.svg" alt="Ilustração" />
      </div>
    </div>
  );
};

export default Login;
