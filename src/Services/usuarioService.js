import { supabase } from "./supabaseClient";

export const criarUsuario = async (nome, sobrenome, email, senha, administrador) => {
  // 1. Cria no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (authError) {
    console.error("Erro ao criar usuário no Auth:", authError.message);
    return { success: false, error: authError.message };
  }

  // 2. Insere na tabela Usuario
  const { data: userData, error: dbError } = await supabase
    .from('Usuario')
    .insert([
      {
        nome,
        sobrenome,
        email,
        administrador,
        ativo: true,
        realizar_reservas_fixas: false
      }
    ]);

  if (dbError) {
    console.error("Erro ao criar usuário na tabela Usuario:", dbError.message);
    return { success: false, error: dbError.message };
  }

  return { success: true };
};
