import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../Services/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);

  // Detecta se está no fluxo de recuperação de senha
  const isRecoveryFlow = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    return hashParams.get('type') === 'recovery';
  };

  useEffect(() => {
    const checkUser = async () => {
      if (isRecoveryFlow()) {
        console.log("Fluxo de recuperação detectado: não buscar perfil ainda.");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // Buscar o perfil no banco de dados
        const { data: userData, error: dbError } = await supabase
          .from('usuario')
          .select('administrador')
          .eq('email', user.email)
          .single();

        if (!dbError && userData) {
          const perfil = userData.administrador ? 'administrador' : 'professor';
          setPerfil(perfil);
        } else {
          console.error("Erro ao buscar perfil no AuthProvider:", dbError);
        }
      }
    };

    checkUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPerfil(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, perfil, setPerfil, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
