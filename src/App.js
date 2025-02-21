import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Paginas/Login/Login";
import LandingPage from "./Paginas/Home/Home";
import MenuProf from "./componentes/Menus/MenuProf/MenuProf";
import Usuarios from "./Paginas/Usuarios/Usuarios";
import Espacos from "./Paginas/Espacos/Espacos";
import Solicitacoes from "./Paginas/Solicitacoes/Solicitacoes";
import Configuracoes from "./Paginas/Configuracoes/Configuracoes";
import Suporte from "./Paginas/Suporte/Suporte";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Verifica se está na página de login

  return (
    <div style={{ display: "flex" }}>
      {/* Renderiza o menu apenas se NÃO estiver na página de login */}
      {!isLoginPage && <MenuProf />}
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/espacos" element={<Espacos />} />
          <Route path="/solicitacoes" element={<Solicitacoes />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
