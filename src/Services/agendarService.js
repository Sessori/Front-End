import { supabase } from "./supabaseClient";

// ✅ Buscar espaços disponíveis respeitando horário e espaço já reservado
export const buscarEspacosDisponiveis = async (dataReserva, horarios, filtros = {}) => {
  const horariosFormatados = horarios.map(h =>
    `${h.split(":")[0].padStart(2, "0")}:${h.split(":")[1].padStart(2, "0")}:00`
  );

  // 🔍 Buscar reservas já feitas para os horários e data
  const { data: reservas, error: erroReservas } = await supabase
    .from("reserva")
    .select("espaco_codigo, horario")
    .eq("data", dataReserva)
    .in("horario", horariosFormatados);

  if (erroReservas) {
    console.error("Erro ao buscar reservas:", erroReservas);
    return [];
  }

  // 🔒 Montar lista de reservas conflitantes por espaço+horário
  const reservasConflitantes = new Set(
    reservas.map(r => `${r.espaco_codigo}-${r.horario}`)
  );

  // 🔍 Buscar todos os espaços ativos
  const { data: espacos, error: erroEspacos } = await supabase
    .from("espaco")
    .select("*")
    .eq("ativo", true);

  if (erroEspacos) {
    console.error("Erro ao buscar espaços:", erroEspacos);
    return [];
  }

  // ✅ Filtrar apenas os espaços que não estão reservados em nenhum dos horários selecionados
  let espacosFiltrados = espacos.filter(espaco =>
    !horariosFormatados.some(horario =>
      reservasConflitantes.has(`${espaco.codigo}-${horario}`)
    )
  );

  // 🎯 Aplicar filtros extras

  if (filtros.tipo) {
    espacosFiltrados = espacosFiltrados.filter(e => e.tipo === filtros.tipo);
  }

  if (filtros.andar) {
    espacosFiltrados = espacosFiltrados.filter(
      e => String(e.andar) === filtros.andar
    );
  }

  if (filtros.capacidade) {
    espacosFiltrados = espacosFiltrados.filter(
      e => e.capacidade >= parseInt(filtros.capacidade)
    );
  }

  if (filtros.ferramentas && filtros.ferramentas.length > 0) {
    const { data: recursosData, error: erroRecurso } = await supabase
      .from("espaco_recurso")
      .select("espaco_codigo, recurso!inner(nome)");

    if (erroRecurso) {
      console.error("Erro ao buscar recursos:", erroRecurso);
      return [];
    }

    // Mapear ferramentas por espaço
    const ferramentasPorEspaco = {};

    recursosData.forEach(({ espaco_codigo, recurso }) => {
      if (!ferramentasPorEspaco[espaco_codigo]) {
        ferramentasPorEspaco[espaco_codigo] = new Set();
      }
      ferramentasPorEspaco[espaco_codigo].add(recurso.nome);
    });

    // Verificar se o espaço possui todas as ferramentas desejadas
    const espacosQueAtendem = Object.entries(ferramentasPorEspaco)
      .filter(([_, ferramentasDisponiveis]) =>
        filtros.ferramentas.every(f =>
          ferramentasDisponiveis.has(f)
        )
      )
      .map(([codigo]) => parseInt(codigo));

    espacosFiltrados = espacosFiltrados.filter(e =>
      espacosQueAtendem.includes(e.codigo)
    );
  }

  // ✅ Retornar os espaços filtrados
  return espacosFiltrados;
};

// ✅ Criar uma reserva
export const criarReserva = async ({ data, horario, espaco_codigo, usuario_codigo }) => {
  const { error } = await supabase.from("reserva").insert([{
    data,
    horario,
    espaco_codigo,
    usuario_codigo,
  }]);

  if (error) {
    console.error("❌ Erro ao criar reserva:", error);
    throw error;
  }
};

// ✅ Excluir uma reserva pelo código
export const excluirReserva = async (codigoReserva) => {
  const { error } = await supabase
    .from("reserva")
    .delete()
    .eq("codigo", codigoReserva);

  if (error) {
    console.error("❌ Erro ao excluir reserva:", error);
    return false;
  }

  return true;
};
