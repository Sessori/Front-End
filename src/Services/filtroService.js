import { supabase } from "./supabaseClient";

export const buscarTipos = async () => {
  const { data, error } = await supabase.from("espaco").select("tipo");
  if (error) {
    console.error("Erro ao buscar tipos:", error);
    return [];
  }

  return [...new Set(data.map(d => d.tipo).filter(Boolean))].map(tipo => ({
    label: tipo,
    value: tipo
  }));
};

export const buscarCapacidades = async () => {
  const { data, error } = await supabase.from("espaco").select("capacidade");
  if (error) {
    console.error("Erro ao buscar capacidades:", error);
    return [];
  }

  const unicos = [...new Set(data.map(d => d.capacidade).filter(Boolean))].sort((a, b) => a - b);

  return unicos.map(cap => ({
    label: `${cap} PESSOAS`,
    value: String(cap)
  }));
};

export const buscarAndares = async () => {
  const { data, error } = await supabase.from("espaco").select("andar");
  if (error) {
    console.error("Erro ao buscar andares:", error);
    return [];
  }

  return [...new Set(data.map(d => d.andar).filter(Boolean))].map(andar => ({
    label: `${andar}º ANDAR`,
    value: `${andar}º ANDAR`
  }));
};

export const buscarFerramentas = async () => {
  const { data, error } = await supabase.from("recurso").select("nome");
  if (error) {
    console.error("Erro ao buscar ferramentas:", error);
    return [];
  }

  return [...new Set(data.map(d => d.nome).filter(Boolean))];
};

export const buscarEspacosDisponiveis = async (data, horarios, filtros) => {
  const { data: espacos, error } = await supabase.from("espaco").select("*");

  if (error) {
    console.error("Erro ao buscar espaços:", error);
    return [];
  }

  const espacosFiltrados = espacos.filter((espaco) => {
    const tipoOk = !filtros.tipo || espaco.tipo === filtros.tipo;
    const capacidadeOk =
      !filtros.capacidade || espaco.capacidade >= parseInt(filtros.capacidade);

    const andarOk =
      !filtros.andar ||
      Number(espaco.andar) === Number(filtros.andar.replace("º ANDAR", "").trim());

    return tipoOk && capacidadeOk && andarOk;
  });

  return espacosFiltrados;
};