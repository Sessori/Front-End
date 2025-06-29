import { supabase } from "./supabaseClient";

export const buscarTipos = async () => {
  const { data, error } = await supabase.from("espaco").select("tipo");
  if (error) {
    console.error("Erro ao buscar tipos:", error);
    return [];
  }
  return [...new Set(data.map(d => d.tipo).filter(Boolean))];
};

export const buscarCapacidades = async () => {
  const { data, error } = await supabase.from("espaco").select("capacidade");
  if (error) {
    console.error("Erro ao buscar capacidades:", error);
    return [];
  }
  return [...new Set(data.map(d => `${d.capacidade} PESSOAS`).filter(Boolean))];
};

export const buscarAulas = async () => {
  return ["1 AULA", "2 AULAS", "4 AULAS"];
};

export const buscarFerramentas = async () => {
  const { data, error } = await supabase.from("recurso").select("nome");
  if (error) {
    console.error("Erro ao buscar ferramentas:", error);
    return [];
  }
  return [...new Set(data.map(d => d.nome).filter(Boolean))];
};
