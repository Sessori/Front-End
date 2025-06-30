import { supabase } from "./supabaseClient";

export const buscarEspacosDisponiveis = async (dataReserva, horarios, filtros = {}) => {
  const horariosFormatados = horarios.map(h =>
    `${h.split(":")[0].padStart(2, "0")}:${h.split(":")[1].padStart(2, "0")}:00`
  );

  const { data: reservas, error: erroReservas } = await supabase
    .from("reserva")
    .select("espaco_codigo")
    .eq("data", dataReserva)
    .in("horario", horariosFormatados);

    if (erroReservas) {
      console.error("Erro ao buscar reservas:", erroReservas);
      return [];
    }

  const ocupados = reservas.map(r => r.espaco_codigo);
  let query = supabase
    .from("espaco")
    .select("*")
    .eq("ativo", true);

    if (ocupados.length > 0) {
      query = query.not("codigo", "in", ocupados);
    }

  if (filtros.tipo) query = query.eq("tipo", filtros.tipo);
  
  if (filtros.capacidade) query = query.lte("capacidade", parseInt(filtros.capacidade));

  if (filtros.ferramenta) {
    query = query
      .select("*, espaco_recurso!inner(recurso!inner(nome))")
      .ilike("recurso.nome", `%${filtros.ferramenta}%`);
  }

  const { data, error } = await query;
  return error ? [] : data;
};
