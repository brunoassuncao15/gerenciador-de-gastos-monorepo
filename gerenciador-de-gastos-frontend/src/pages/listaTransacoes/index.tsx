import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contexts/usuario-context";
import "./styles.css";

type Transacao = {
  usuarioId: string;
  tipo: "entrada" | "saida";
  descricao: string;
  valor: number;
  data: string;
};

const ITENS_POR_PAGINA = 10;

const ListaTransacoes = () => {
  const { nome, fetchTransacoes } = useUsuario() as {
    nome: string;
    fetchTransacoes: {
      isLoading: boolean;
      data?: Transacao[];
    };
  };
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(1);

  const transacoes = fetchTransacoes.data || [];
  const totalPaginas = Math.ceil(transacoes.length / ITENS_POR_PAGINA);

  const transacoesPaginadas = transacoes.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA
  );

  const handleAnterior = () => setPagina((p) => Math.max(1, p - 1));
  const handleProxima = () => setPagina((p) => Math.min(totalPaginas, p + 1));

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
              </tr>
            </thead>
            <tbody>
              {transacoesPaginadas.map((t) => (
                <tr key={t.usuarioId + t.data + t.descricao}>
                  <td data-label="Tipo">{t.tipo === "entrada" ? "Entrada" : "Saída"}</td>
                  <td data-label="Descrição">{t.descricao}</td>
                  <td data-label="Valor">
                    R$ {t.tipo === "saida" ? "-" : ""}
                    {Number(t.valor).toFixed(2)}
                  </td>
                  <td data-label="Data">{new Date(t.data).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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