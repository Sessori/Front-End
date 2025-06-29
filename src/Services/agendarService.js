// agendarService.js
import { supabase } from "./supabaseClient";

/**
 * Busca os códigos dos espaços que já estão reservados para determinada data e horários.
 */
export const buscarReservasPorDataHorario = async (data, horarios) => {
  const { data: reservas, error } = await supabase
    .from("reserva")
    .select("espaco_codigo")
    .eq("data_reserva", data)
    .in("horario", horarios);

  if (error) {
    console.error("Erro ao buscar reservas:", error);
    return [];
  }

  return reservas.map(r => r.espaco_codigo);
};

/**
 * Retorna os espaços que não estão reservados nos horários selecionados da data informada.
 */
export const buscarEspacosDisponiveis = async (data, horarios) => {
  const ocupados = await buscarReservasPorDataHorario(data, horarios);

  const { data: espacos, error } = await supabase
    .from("espaco")
    .select("*")
    .not("codigo", "in", `(${ocupados.join(",") || 0})`)
    .eq("ativo", true);

  if (error) {
    console.error("Erro ao buscar espaços disponíveis:", error);
    return [];
  }

  return espacos;
};

/**
 * Cria uma nova reserva no banco.
 */
export async function criarReserva(data, horarios, espacoCodigo, usuarioCodigo) {
  const reservas = horarios.map(horario => ({
    data_reserva: data,
    horario: horario,
    espaco_codigo: espacoCodigo,
    usuario_codigo: usuarioCodigo,
    status: "Ativa",
  }));

  const { error } = await supabase.from("reserva").insert(reservas);
  if (error) {
    console.error("Erro ao criar reserva:", error);
    return { success: false, error };
  }

  return { success: true };
}


