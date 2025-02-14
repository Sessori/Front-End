import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div style={{ display: "flex" }}>
          <MenuLateral setIsAuthenticated={setIsAuthenticated} />
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
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
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;

