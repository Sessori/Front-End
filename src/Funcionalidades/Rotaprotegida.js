import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function RotaProtegida({ children, adminRequired = false }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    setAutenticado(usuario ? true : false);
  }, []);

  if (autenticado === null) return <p>Carregando...</p>;

  if (!autenticado) return <Navigate to="/login" />;

  if (adminRequired && !usuario?.administrador) return <Navigate to="/" />;

  return children;
}

export default RotaProtegida;
