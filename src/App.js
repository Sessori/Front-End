import React, { useEffect } from "react";
import { AuthProvider, useAuth } from './auth/authContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Login from "./Paginas/Login/Login";
import LandingPage from "./Paginas/Home/Home";

import MenuProf from "./componentes/Menus/MenuProf/MenuProf";
import MenuAdm from "./componentes/Menus/MenuAdm/MenuAdm";

import "./Paginas/Global/Global.css";

// Páginas do Administrador
import Usuarios from "./Paginas/Administrador/Usuarios/Usuarios";
import Espacos from "./Paginas/Administrador/Espacos/Espacos";
import Solicitacoes from "./Paginas/Administrador/Solicitacoes/Solicitacoes";
import Configuracoes from "./Paginas/Administrador/Configuracoes/Configuracoes";
import Suporte from "./Paginas/Administrador/Suporte/Suporte";
import Aulas from "./Paginas/Administrador/Aulas/Aulas";

// Páginas do Professor
import Agendar from "./Paginas/Professor/Agendar/Agendar";

// Página de atualização de senha
import AtualizarSenha from "./Paginas/AtualizarSenha/AtualizarSenha";

import PrivateRoute from "./auth/privateRoute";

const Layout = ({ children }) => {
  const location = useLocation();
  const { perfil } = useAuth();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/atualizar-senha";

  return (
    <div style={{ display: "flex" }}>
      {/* Renderiza o menu correspondente ao tipo de usuário */}
      {!isLoginPage && perfil === "administrador" && <MenuAdm />}
      {!isLoginPage && perfil === "professor" && <MenuProf />}

      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/atualizar-senha" element={<AtualizarSenha />} />

      {/* Rotas protegidas para administrador */}
      <Route
        path="/usuarios"
        element={
          <PrivateRoute requiredPerfil="administrador">
            <Usuarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/espacos"
        element={
          <PrivateRoute requiredPerfil="administrador">
            <Espacos />
          </PrivateRoute>
        }
      />
      <Route
        path="/aulas"
        element={
          <PrivateRoute requiredPerfil="administrador">
            <Aulas />
          </PrivateRoute>
        }
      />
      <Route
        path="/solicitacoes"
        element={
          <PrivateRoute requiredPerfil="administrador">
            <Solicitacoes />
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <PrivateRoute requiredPerfil="administrador">
            <Configuracoes />
          </PrivateRoute>
        }
      />
      <Route
        path="/suporte"
        element={
          <PrivateRoute requiredPerfil="administrador">
            <Suporte />
          </PrivateRoute>
        }
      />

      {/* Rotas protegidas para professor */}
      <Route
        path="/agendar"
        element={
          <PrivateRoute requiredPerfil="professor">
            <Agendar />
          </PrivateRoute>
        }
      />

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');

    if (type === 'recovery' && location.pathname !== '/atualizar-senha') {
      navigate('/atualizar-senha' + window.location.hash);
    }
  }, [location, navigate]);

  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
