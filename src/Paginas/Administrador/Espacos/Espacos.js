// Página de gerenciamento de espaços educacionais
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../Services/supabaseClient";

// Componentes reutilizáveis
import ButtonIncluir from "../../../componentes/Buttons/ButtonInserir/ButtonIncluir";
import CampoBusca from "../../../componentes/Inputs/CampoBusca/CampoBusca";
import EspacoRow from "../../../componentes/Rows/EspacoRow/EspacoRow";
import CadastroEspacoModal from "./CadastroEspacos/CadastroEspacos";

// Serviços
import { excluirEspaco } from "../../../Services/espacoService";

// Utilitário para otimizar pesquisa
import debounce from "lodash.debounce";

// Estilos
import "./Espacos.css";

const Espacos = () => {
  // Estado para armazenar os espaços carregados
  const [espacos, setEspacos] = useState([]);

  // Modal de cadastro/edição
  const [modalAberto, setModalAberto] = useState(false);
  const [espacoParaEditar, setEspacoParaEditar] = useState(null);

  // Estado da barra de busca
  const [busca, setBusca] = useState("");

  // Carrega os espaços do Supabase com ou sem filtro
  const fetchEspacos = async (filtro = "") => {
    let query = supabase.from("espaco").select("*");

    if (filtro) {
      // Filtro por nome ou tipo (mesmo que tipo seja ENUM)
      query = query.or(`nome.ilike.%${filtro}%,tipo.ilike.%${filtro}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Erro:", error);
    } else {
      setEspacos(data);
    }
  };

  // Carrega todos os espaços ao iniciar
  useEffect(() => {
    fetchEspacos();
  }, []);

  // Função de busca com debounce para evitar múltiplas requisições
  const debouncedSearch = useCallback(
    debounce((valor) => {
      fetchEspacos(valor);
    }, 500),
    []
  );

  const handleBuscaChange = (valor) => {
    setBusca(valor);
    debouncedSearch(valor);
  };

  // Ao clicar em incluir, abre o modal sem item selecionado
  const handleIncluir = () => {
    setEspacoParaEditar(null);
    setModalAberto(true);
  };

  // Ao clicar em editar, define qual espaço será editado
  const handleEditar = (espaco) => {
    setEspacoParaEditar(espaco);
    setModalAberto(true);
  };

  // Confirmação e exclusão de um espaço
  const handleExcluir = async (espaco) => {
    const confirm = window.confirm(`Deseja excluir o espaço ${espaco.nome}?`);
    if (!confirm) return;

    const res = await excluirEspaco(espaco.codigo);
    if (res.success) {
      alert("Espaço excluído com sucesso!");
      fetchEspacos();
    } else {
      alert("Erro ao excluir: " + res.error);
    }
  };

  // Após salvar ou editar um espaço, atualiza a lista
  const handleSave = () => {
    fetchEspacos();
    setModalAberto(false);
    setEspacoParaEditar(null);
  };

  return (
    <div className="espacos-container">
      {/* Cabeçalho com busca e botão de inclusão */}
      <div className="espacos-header">
        <CampoBusca
          valor={busca}
          onChange={handleBuscaChange}
          placeholder="Pesquisar por nome ou tipo"
        />
        <div className="espacos-actions">
          <ButtonIncluir label="INCLUIR" onClick={handleIncluir} />
        </div>
      </div>

      {/* Tabela de espaços */}
      <table className="espacos-table">
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>NOME</th>
            <th>TIPO</th>
            <th>ANDAR</th>
            <th>COMPORTA</th>
            <th>ATIVO</th>
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
          {espacos.map((espaco) => (
            <EspacoRow
              key={espaco.codigo}
              espaco={espaco}
              onEdit={() => handleEditar(espaco)}
              onDelete={() => handleExcluir(espaco)}
            />
          ))}
        </tbody>
      </table>

      {/* Modal de cadastro/edição */}
      {modalAberto && (
        <CadastroEspacoModal
          espacoSelecionado={espacoParaEditar}
          onClose={() => {
            setModalAberto(false);
            setEspacoParaEditar(null);
            fetchEspacos();
          }}
        />
      )}
    </div>
  );
};

export default Espacos;
