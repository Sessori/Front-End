import { supabase } from '../Services/supabaseClient';

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/atualizar-senha'
  });

  if (error) {
    console.error('Erro ao enviar e-mail de redefinição:', error);
    return { success: false, message: error.message };
  }

  return { success: true, message: "E-mail enviado com sucesso!" };
};
