import { supabase } from "./supabaseClient";

export const buscarEspacosDisponiveis = async (dataReserva, horarios, filtros = {}) => {
  const horariosFormatados = horarios.map(h =>
    `${h.split(":")[0].padStart(2, "0")}:${h.split(":")[1].padStart(2, "0")}:00`
  );

  const { data: reservas } = await supabase
    .from("reserva")
    .select("espaco_codigo")
    .eq("data", dataReserva)
    .in("horario", horariosFormatados);

  const ocupados = reservas.map(r => r.espaco_codigo);
  let query = supabase.from("espaco").select("*").not("codigo","in", ocupados.length ? `(${ocupados})` : "(0)").eq("ativo", true);

  if (filtros.tipo) query = query.eq("tipo", filtros.tipo);
  if (filtros.capacidade) query = query.lte("capacidade", parseInt(filtros.capacidade));
  if (filtros.ferramenta) {
    query = query
      .select(`*, espaco_recurso!inner(recurso!inner(nome))`)
      .ilike("recurso.nome", `%${filtros.ferramenta}%`);
  }

  const { data, error } = await query;
  return error ? [] : data;
};
