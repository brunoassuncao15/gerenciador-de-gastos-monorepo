import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contexts/usuario-context";
import "./styles.css";

type Transacao = {
  id: number;
  usuarioId: number;
  tipo: "entrada" | "saida";
  descricao: string;
  valor: number;
  data: string;
};

const ITENS_POR_PAGINA = 10;

const ListaTransacoes = () => {
  const { nome, fetchTransacoes, deleteTransacao, updateTransacao } = useUsuario() as  {
    nome: string;
    fetchTransacoes: {
      isLoading: boolean;
      data?: Transacao[];
    };
    deleteTransacao: (id: number) => void;
    updateTransacao: (id: number, dadosAtualizados: Partial<Transacao>) => void;
  };
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [transacaoExcluindo, setTransacaoExcluindo] = useState<Transacao | null>(null);


  const transacoes = fetchTransacoes.data || [];
  const totalPaginas = Math.ceil(transacoes.length / ITENS_POR_PAGINA);

  const transacoesPaginadas = transacoes.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA
  );

  const handleAnterior = () => setPagina((p) => Math.max(1, p - 1));
  const handleProxima = () => setPagina((p) => Math.min(totalPaginas, p + 1));

  const handleEditar = (transacao: Transacao) => {
    const dataFormatada = transacao.data.slice(0, 10);
    setTransacaoEditando({ ...transacao, data: dataFormatada });
    setModalAberto(true);
  };

  const handleSalvarEdicao = (e: React.FormEvent) => {
    e.preventDefault();
    if (transacaoEditando) {
      updateTransacao(transacaoEditando.id, transacaoEditando);
    }
    setModalAberto(false);
  };

  const handleAbrirModalExclusao = (transacao: Transacao) => {
    setTransacaoExcluindo(transacao);
    setModalExclusaoAberto(true);
  };

  const handleConfirmarExclusao = () => {
    if (transacaoExcluindo) {
      deleteTransacao(transacaoExcluindo.id);
    }
    setModalExclusaoAberto(false);
    setTransacaoExcluindo(null);
  };

  const handleCancelarExclusao = () => {
    setModalExclusaoAberto(false);
    setTransacaoExcluindo(null);
  };

  return (
    <div className="home-container">
      <h2>{nome}! Sua lista de transações</h2>
      {fetchTransacoes.isLoading ? (
        <p>Carregando...</p>
      ) : transacoes.length === 0 ? (
        <p>Nenhuma transação encontrada.</p>
      ) : (
        <>
          <table className="transacoes-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th style={{ display: "flex", width: "100px", justifyContent: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoesPaginadas.map((t) => (
                <tr key={t.id + t.data + t.descricao}>
                  <td data-label="Tipo">{t.tipo === "entrada" ? "Entrada" : "Saída"}</td>
                  <td data-label="Descrição">{t.descricao}</td>
                  <td data-label="Valor">
                    R$ {t.tipo === "saida" ? "-" : ""}
                    {Number(t.valor).toFixed(2)}
                  </td>
                  <td data-label="Data">{new Date(t.data).toLocaleDateString()}</td>
                  <td data-label="Ações" style={{ display: "flex", width: "100px",  }}>
                    <button
                      type="button"
                      title="Editar"
                      style={{ background: "none", border: "none", cursor: "pointer", }}
                      onClick={() => handleEditar(t)}
                    >
                      <span role="img" aria-label="Editar">✏️</span>
                    </button>
                    <button
                      type="button"
                      title="Excluir"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                      onClick={() => handleAbrirModalExclusao(t)}
                    >
                      <span role="img" aria-label="Excluir">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalAberto && transacaoEditando && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Editar transação</h3>
                <form onSubmit={handleSalvarEdicao} className="transaction-form">
                  <div className="field">
                    <label htmlFor="tipo">Tipo</label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={transacaoEditando.tipo}
                      onChange={(e) =>
                        setTransacaoEditando({ ...transacaoEditando, tipo: e.target.value as "entrada" | "saida" })
                      }
                      required
                    >
                      <option value="entrada">Entrada</option>
                      <option value="saida">Saída</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                      id="descricao"
                      name="descricao"
                      type="text"
                      value={transacaoEditando.descricao}
                      onChange={(e) =>
                        setTransacaoEditando({ ...transacaoEditando, descricao: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="valor">Valor</label>
                    <input
                      id="valor"
                      name="valor"
                      type="number"
                      step="0.01"
                      min="0"
                      value={transacaoEditando.valor}
                      onChange={(e) =>
                        setTransacaoEditando({ ...transacaoEditando, valor: parseFloat(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="data">Data</label>
                    <input
                      id="data"
                      name="data"
                      type="date"
                      value={transacaoEditando.data}
                      onChange={(e) =>
                        setTransacaoEditando({ ...transacaoEditando, data: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={() => setModalAberto(false)}>
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          )}
          {modalExclusaoAberto && transacaoExcluindo && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Confirmar exclusão</h3>
                <p>Tem certeza que deseja excluir a transação <b>{transacaoExcluindo.descricao}</b>?</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" onClick={handleCancelarExclusao}>Cancelar</button>
                  <button type="button" onClick={handleConfirmarExclusao}>Confirmar</button>
                </div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
            <button
              onClick={handleAnterior}
              disabled={pagina === 1}
              aria-label="Anterior"
              style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              padding: "2px 6px",
              cursor: pagina === 1 ? "not-allowed" : "pointer",
              color: pagina === 1 ? "#ccc" : "#007bff",
              }}
            >
              &#8592;
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={handleProxima}
              disabled={pagina === totalPaginas}
              aria-label="Próxima"
              style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              padding: "2px 6px",
              cursor: pagina === totalPaginas ? "not-allowed" : "pointer",
              color: pagina === totalPaginas ? "#ccc" : "#007bff",
              }}
            >
              &#8594;
            </button>
          </div>
        </>
      )}
      <br />
      <button type="button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default ListaTransacoes;