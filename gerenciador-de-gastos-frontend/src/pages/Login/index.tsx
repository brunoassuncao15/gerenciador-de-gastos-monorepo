import { useUsuario } from "../../contexts/usuario-context";


const LoginForm = () => {
  const { loginFormData, handleInputChange, handleLogin } = useUsuario();

  return (
    <div className="cadastro-container">
      <h2>Conectar</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginFormData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={loginFormData.senha}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <br />
      <a href="/cadastro">Não tem uma conta? Cadastre-se</a>
    </div>
  );
};

export default LoginForm;
