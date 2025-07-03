import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { criarReserva } from "../../../../Services/agendarService";
import { supabase } from "../../../../Services/supabaseClient";
import ModalSolicitarRecurso from "../SolicitarRec/ModalSolicitarRecurso";
import "./ResumoReserva.css";

const ResumoReserva = ({
  espaco,
  selectedDate,
  horariosSelecionados,
  usuarioCodigo,
  onClose,
}) => {
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [confirmando, setConfirmando] = useState(false);
  const [buscaRecurso, setBuscaRecurso] = useState("");
  const [resultadosRecursos, setResultadosRecursos] = useState([]);
  const [focado, setFocado] = useState(false);
  const [recursosFisicos, setRecursosFisicos] = useState([]);
  const [abrirModalSolicitar, setAbrirModalSolicitar] = useState(false);

  // 🔍 Buscar recursos FÍSICOS com quantidade
  useEffect(() => {
    const buscarRecursosFisicos = async () => {
      if (!espaco?.codigo) return;

      const { data, error } = await supabase
        .from("espaco_recurso")
        .select(`
          qtd_recurso,
          recurso (
            nome
          )
        `)
        .eq("espaco_codigo", espaco.codigo);

      if (error) {
        console.error("Erro ao buscar recursos físicos:", error);
        setRecursosFisicos([]);
        return;
      }

      console.log("Recursos físicos:", data); // 👈 Verificação útil

      setRecursosFisicos(data || []);
    };

    buscarRecursosFisicos();
  }, [espaco]);


  // 🔍 Buscar SOFTWARES com filtro
  useEffect(() => {
    const buscarRecursosDoEspaco = async () => {
      if (!espaco?.codigo) {
        setResultadosRecursos([]);
        return;
      }

      const query = supabase
        .from("espaco_recurso")
        .select("recurso:recurso_codigo (codigo, nome)")
        .eq("espaco_codigo", espaco.codigo);

      if (buscaRecurso) {
        query.ilike("recurso.nome", `%${buscaRecurso}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erro ao buscar recursos:", error);
        setResultadosRecursos([]);
        return;
      }

      const recursos = data
        .filter((item) => item.recurso !== null)
        .map((item) => item.recurso);

      setResultadosRecursos(recursos);
    };

    buscarRecursosDoEspaco();
  }, [buscaRecurso, espaco]);

  // 👉 Pega a quantidade de um recurso físico pelo nome
  const getQuantidadeRecurso = (nomeAlvo) => {
    const recursoEncontrado = recursosFisicos.find((item) =>
      item.recurso?.nome.toLowerCase().includes(nomeAlvo.toLowerCase())
    );
    return recursoEncontrado?.qtd_recurso || 0;
  };

  // 🚫 Dados obrigatórios ausentes
  if (!espaco || !selectedDate || !horariosSelecionados) {
    return <p>Informações da reserva não encontradas.</p>;
  }

  const dataFormatada = format(new Date(selectedDate), "dd/MM/yyyy", {
    locale: ptBR,
  });
  const horarios = horariosSelecionados.join(" - ");
  const quantidadePeriodos = horariosSelecionados.length;


  // ✅ Confirma a reserva
  const handleConfirmar = async () => {
    if (!usuarioCodigo) {
      alert("Usuário não identificado. Faça login novamente.");
      return;
    }

    try {
      setConfirmando(true);

      const promises = horariosSelecionados.map(async (horario) => {
        const horaInicio = horario.split(" - ")[0];
        const horaFormatada = `${horaInicio}:00`;

        return await criarReserva({
          data: selectedDate,
          horario: horaFormatada,
          espaco_codigo: espaco.codigo,
          usuario_codigo: usuarioCodigo,
        });
      });

      await Promise.all(promises);
      alert("Reserva realizada com sucesso!");
      navigate("/professor/minhas-reservas");
    } catch (error) {
      alert("Erro ao confirmar reserva.");
      console.error(error);
    } finally {
      setConfirmando(false);
    }
  };

  return (
    <div className="resumo-container">
      <h2>RESUMO DA RESERVA</h2>
      <div className="resumo-status">LIVRE PARA FIXAR</div>
      <h3>{espaco.nome}</h3>

      <div className="resumo-detalhes">
        <div><strong>COMPORTA</strong><p>ATÉ {espaco.capacidade} PESSOAS</p></div>
        <div><strong>LOCALIZAÇÃO</strong><p>{espaco.andar}° ANDAR</p></div>
        <div><strong>DATA DA RESERVA</strong><p>{dataFormatada}</p></div>
        <div><strong>HORÁRIO</strong><p>{horarios}</p></div>
        <div><strong>PERÍODOS</strong><p>{quantidadePeriodos}</p></div>
      </div>

      <hr />

      <div className="recursos">
        <div className="recursos-fisicos">
          <h4>RECURSOS DISPONÍVEIS</h4>
          <h5 className="verde">FÍSICOS</h5>
          <ul>
            <li>
              <img src="/icones/Icon-Espacos/TV.svg" alt="TV" />
              Televisor ({getQuantidadeRecurso("Televisor")})
            </li>
            <li>
              <img src="/icones/Icon-Espacos/QuadroNegro.svg" alt="Quadro" />
              Quadro ({getQuantidadeRecurso("Quadro")})
            </li>
            <li>
              <img src="/icones/Icon-Espacos/Computador.svg" alt="Computadores" />
              Computadores ({getQuantidadeRecurso("Computador")})
            </li>
          </ul>
        </div>

        <div className="recursos-software">
          <h5 className="verde">SOFTWARES</h5>
          <div className="software-search">
            <img src="/icones/Icon-Espacos/Software.svg" alt="Software" />
            <input
              type="text"
              placeholder="Buscar Recurso"
              value={buscaRecurso}
              onChange={(e) => setBuscaRecurso(e.target.value)}
              onFocus={() => setFocado(true)}
              onBlur={() => setTimeout(() => setFocado(false), 150)}
            />
            <img src="/icones/pesquisar.svg" alt="Buscar" className="icone-pesquisar" />
          </div>

          {focado && resultadosRecursos.length > 0 && (
            <ul className="resultados-recursos">
              {resultadosRecursos.map((recurso) => (
                <li key={recurso.codigo}>{recurso.nome}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <hr />

      <div className="notificarConfirmar">
        <div className="notificacao">
          <h4>NOTIFICAR ALUNOS</h4>
          <textarea
            placeholder="Digite a mensagem para os alunos..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          ></textarea>
        </div>

        <div className="botoes">
          <button
            className="btn-solicitar"
            onClick={() => setAbrirModalSolicitar(true)}
          >
            SOLICITAR RECURSO
          </button>

          <button
            className="btn-confirmar"
            onClick={handleConfirmar}
            disabled={confirmando}
          >
            {confirmando ? "SALVANDO..." : "CONFIRMAR"}
          </button>
        </div>
      </div>

      {abrirModalSolicitar && (
        <ModalSolicitarRecurso
          espacoCodigo={espaco.codigo}
          usuarioCodigo={usuarioCodigo}
          onClose={() => setAbrirModalSolicitar(false)}
        />
      )}
    </div>
  );
};

export default ResumoReserva;
