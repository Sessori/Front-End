import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Paginas/Login/Login";
import LandingPage from "./Paginas/Home/Home";
import MenuLateral from "./componentes/MenuLateral/MenuLateral";
import Usuarios from "./Paginas/Usuarios/Usuarios";
import Espacos from "./Paginas/Espacos/Espacos";
import Solicitacoes from "./Paginas/Solicitacoes/Solicitacoes";
import Configuracoes from "./Paginas/Configuracoes/Configuracoes";
import Suporte from "./Paginas/Suporte/Suporte";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Simula autenticação

  return (
    <Router>
      {isAuthenticated ? (
        <div style={{ display: "flex" }}>
          {/* Menu lateral aparece em todas as páginas autenticadas */}
          <MenuLateral />
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<LandingPage />} /> {/* Página inicial */}
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/espacos" element={<Espacos />} />
              <Route path="/solicitacoes" element={<Solicitacoes />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/suporte" element={<Suporte />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;

