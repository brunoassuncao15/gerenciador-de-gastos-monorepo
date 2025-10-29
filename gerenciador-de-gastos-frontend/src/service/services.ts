export const loginUsuario = async (loginFormData: { email: string; senha: string }) => {
  const response = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFormData),
  });
  return response.json();
};

export const salvarTransacao = async (transacao: any) => {
  const response = await fetch("http://localhost:3001/api/transacao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transacao),
  });
  return response.json();
};

export const buscarTransacoes = async (usuarioId: number) => {
  const response = await fetch(`http://localhost:3001/api/transacoes/${usuarioId}`);
  if (!response.ok) throw new Error("Erro ao carregar transações.");
  return response.json();
};
