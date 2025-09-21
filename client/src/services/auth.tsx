//const API_URL = process.env.API_URL;

export async function login(email: string, password: string) {
  const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao fazer login');
  }

  const data = await response.json();
  //console.log('Login bem-sucedido, token recebido:', data.token);
  return data.token;
}
