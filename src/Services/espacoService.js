// Services/espacoService.js
import { supabase } from './supabaseClient';

// Buscar espaços
export const buscarEspacos = async (filtro = "") => {
  const { data, error } = await supabase
    .from("espaco")
    .select("*")
    .or(`nome.ilike.%${filtro}%,tipo.ilike.%${filtro}%`);

  if (error) {
    console.error("Erro ao buscar espaços:", error);
    return [];
  }
  return data;
};

// Inserir espaço e vincular recursos
export const inserirEspaco = async (espaco, recursos = []) => {
  const { data, error } = await supabase
    .from("espaco")
    .insert([espaco])
    .select();

  if (error || !data?.length) {
    console.error("Erro ao inserir espaço:", error);
    return { success: false, error: error?.message };
  }

  const novoCodigo = data[0].codigo;

  if (recursos.length > 0) {
    const vinculos = recursos.map((recurso) => ({
      espaco_codigo: novoCodigo,
      recurso_codigo: recurso.codigo,
      qtd_recurso: recurso.qtd || 1,
    }));

    const { error: errorVinculo } = await supabase.from("espaco_recurso").insert(vinculos);
    if (errorVinculo) {
      console.error("Erro ao vincular recursos:", errorVinculo);
      return { success: false, error: errorVinculo.message };
    }
  }

  return { success: true };
};

// Atualizar espaço
export const atualizarEspaco = async (codigo, espaco, recursos = []) => {
  const { error } = await supabase.from("espaco").update(espaco).eq("codigo", codigo);
  if (error) {
    console.error("Erro ao atualizar espaço:", error);
    return { success: false, error: error.message };
  }

  await supabase.from("espaco_recurso").delete().eq("espaco_codigo", codigo);
  if (recursos.length > 0) {
    const vinculos = recursos.map((recurso) => ({
      espaco_codigo: codigo,
      recurso_codigo: recurso.codigo,
      qtd_recurso: recurso.qtd || 1,
    }));
    const { error: errorInsert } = await supabase.from("espaco_recurso").insert(vinculos);
    if (errorInsert) {
      console.error("Erro ao atualizar recursos:", errorInsert);
      return { success: false, error: errorInsert.message };
    }
  }

  return { success: true };
};

// Excluir espaço
export const excluirEspaco = async (codigo) => {
  const { error } = await supabase.from("espaco").delete().eq("codigo", codigo);
  if (error) {
    console.error("Erro ao excluir espaço:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
};
