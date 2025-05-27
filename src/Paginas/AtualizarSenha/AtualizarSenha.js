import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../Services/supabaseClient";

import "./AtualizarSenha.css";

const AtualizarSenha = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [isRecovery, setIsRecovery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const type = hashParams.get('type');
    if (type === 'recovery') {
      setIsRecovery(true);
    }
  }, [location]);

  const handleAtualizarSenha = async () => {
    if (!novaSenha) {
      setMensagem("Por favor, preencha a nova senha.");
      return;
    }

    setLoading(true);
    setMensagem('');

    const { error } = await supabase.auth.updateUser({ password: novaSenha });

    if (error) {
      console.error('Erro ao atualizar senha:', error);
      setMensagem("Erro ao atualizar senha: " + error.message);
    } else {
      setMensagem("Senha atualizada com sucesso! Redirecionando para login...");
      setTimeout(() => navigate("/login"), 2000);
    }

    setLoading(false);
  };

  if (!isRecovery) {
    return <div className="atualizar-senha-container"><p>Link inválido ou expirado. Solicite uma nova redefinição de senha.</p></div>;
  }

  return (
    <div className="atualizar-senha-container">
      <h2>Atualizar Senha</h2>
      <input
        type="password"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
        placeholder="Nova senha"
        className="input-senha"
      />
      <button onClick={handleAtualizarSenha} disabled={loading}>
        {loading ? "Atualizando..." : "Atualizar"}
      </button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default AtualizarSenha;
