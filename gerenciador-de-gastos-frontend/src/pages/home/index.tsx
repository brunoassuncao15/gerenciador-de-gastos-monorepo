
import { useUsuario } from "../../contexts/usuario-context";
import "./styles.css";


const Home = () => {
const { nome, transacao, setTransacao, handleSaveTransacao } = useUsuario();

  return (
    <div className="home-container">
      <h2>Bem-vindo(a), {nome}!</h2>
      <h4>Adicione um novo registro</h4>
      <form
        className="transaction-form"
        onSubmit={handleSaveTransacao}
      >
        <div className="field">
          <label htmlFor="tipo">Tipo</label>
          <select id="tipo" name="tipo" defaultValue="entrada" value={transacao.tipo} onChange={(e) => setTransacao({ ...transacao, tipo: e.target.value })} required>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="descricao">Descrição</label>
          <input id="descricao" name="descricao" type="text" placeholder="Ex: Salário, Mercado" value={transacao.descricao} onChange={(e) => setTransacao({ ...transacao, descricao: e.target.value })} required />
        </div>

        <div className="field">
          <label htmlFor="valor">Valor</label>
          <input id="valor" name="valor" type="number" step="0.01" min="0" placeholder="0,00" value={transacao.valor} onChange={(e) => setTransacao({ ...transacao, valor: parseFloat(e.target.value) })} required />
        </div>

        <div className="field">
          <label htmlFor="data">Data</label>
          <input id="data" name="data" type="date" value={transacao.data} onChange={(e) => setTransacao({ ...transacao, data: e.target.value })} required />
        </div>

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default Home;
