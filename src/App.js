import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Paginas/Login/Login";
import LandingPage from "./Paginas/Home/Home";
import MenuProf from "./componentes/Menus/MenuProf/MenuProf";
import MenuAdm from "./componentes/Menus/MenuAdm/MenuAdm";
import "./Paginas/Global/Global.css"

// Páginas do Administrador
import Usuarios from "./Paginas/Usuarios/Usuarios";
import Espacos from "./Paginas/Espacos/Espacos";
import Solicitacoes from "./Paginas/Solicitacoes/Solicitacoes";
import Configuracoes from "./Paginas/Configuracoes/Configuracoes";
import Suporte from "./Paginas/Suporte/Suporte";

// Páginas do Professor
import Agendar from "./Paginas/Agendar/Agendar";

const Layout = ({ children, userType, setUserType }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      {/* Menu escondido na lateral */}
      {!isLoginPage && (
        <div
          className="user-switch-container"
          onMouseEnter={() => setIsMenuVisible(true)}
          onMouseLeave={() => setIsMenuVisible(false)}
        >
          <button className="user-switch-button">👤</button>
          <div className={`user-switch-menu ${isMenuVisible ? "visible" : ""}`}>
            <button onClick={() => setUserType("admin")}>👨‍💼 Administrador</button>
            <button onClick={() => setUserType("professor")}>👨‍🏫 Professor</button>
          </div>
        </div>
      )}

      {/* Renderiza o menu correspondente ao tipo de usuário */}
      {!isLoginPage && userType === "admin" && <MenuAdm />}
      {!isLoginPage && userType === "professor" && <MenuProf />}

      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

const App = () => {
  const [userType, setUserType] = useState("professor");

  return (
    <Router>
      <Layout userType={userType} setUserType={setUserType}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {userType === "admin" && (
            <>
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/espacos" element={<Espacos />} />
              <Route path="/solicitacoes" element={<Solicitacoes />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/suporte" element={<Suporte />} />
            </>
          )}

          {userType === "professor" && <Route path="/Agendar" element={<Agendar />} />}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
