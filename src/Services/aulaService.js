import { supabase } from './supabaseClient';

// Buscar todas as aulas (com filtro opcional)
export const buscarAulas = async (filtro = "") => {
  const { data, error } = await supabase
    .from("aula")
    .select("*")
    .or(`nome.ilike.%${filtro}%,periodo.ilike.%${filtro}%`);

  if (error) {
    console.error("Erro ao buscar aulas:", error);
    return [];
  }
  return data;
};

// Inserir nova aula
export const inserirAula = async (aula) => {
  const { error } = await supabase.from('aula').insert([aula]);

  if (error) {
    console.error("Erro ao inserir aula:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
};

// Atualizar aula existente
export const atualizarAula = async (codigo, aula) => {
  const { error } = await supabase.from('aula').update(aula).eq('codigo', codigo);

  if (error) {
    console.error("Erro ao atualizar aula:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
};

// Excluir aula
export const excluirAula = async (codigo) => {
  const { error } = await supabase.from('aula').delete().eq('codigo', codigo);

  if (error) {
    console.error("Erro ao excluir aula:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
};
