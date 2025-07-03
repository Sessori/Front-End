import { supabase } from "./supabaseClient";

/**
 * Cria uma solicitação de recurso.
 * @param {Object} solicitacao - Objeto com os dados da solicitação.
 * @param {number} solicitacao.recurso_codigo - Código do recurso solicitado.
 * @param {number} solicitacao.usuario_codigo - Código do usuário que solicitou.
 * @param {number} solicitacao.espaco_codigo - Código do espaço da reserva.
 * @returns {Object} - Retorna sucesso ou erro.
 */
export const criarSolicitacaoRecurso = async ({ recurso_codigo, usuario_codigo, espaco_codigo }) => {
  const { data, error } = await supabase.from("solicitacao_recurso").insert([
    {
      recurso_codigo,
      usuario_codigo,
      espaco_codigo,
    },
  ]);

  if (error) {
    console.error("Erro ao criar solicitação de recurso:", error);
    return { success: false, error };
  }

  return { success: true, data };
};

/**
 * Lista solicitações pendentes por espaço (uso do Admin futuramente)
 */
export const listarSolicitacoesPendentes = async () => {
  const { data, error } = await supabase
    .from("solicitacao_recurso")
    .select(`
      codigo,
      status,
      recurso:recurso_codigo (nome),
      usuario:usuario_codigo (nome, sobrenome),
      espaco:espaco_codigo (nome, andar)
    `)
    .eq("status", "Pendente");

  if (error) {
    console.error("Erro ao buscar solicitações pendentes:", error);
    return [];
  }

  return data;
};

/**
 * Atualiza o status de uma solicitação (Aprovada, Rejeitada etc.)
 * @param {number} codigo - Código da solicitação
 * @param {string} novoStatus - 'Aprovada' | 'Rejeitada' | etc.
 */
export const atualizarStatusSolicitacao = async (codigo, novoStatus) => {
  const { error } = await supabase
    .from("solicitacao_recurso")
    .update({ status: novoStatus })
    .eq("codigo", codigo);

  if (error) {
    console.error("Erro ao atualizar status:", error);
    return false;
  }

  return true;
};

