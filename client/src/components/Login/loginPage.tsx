import React, { useState } from 'react';
import './login.css'; 
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className='login-input-group'>
          <label className='login-label'>
            Usuário:
          </label>
          <input
            className='login-input'
            title='Digite seu nome de usuário'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className='login-input-group'>
          <label className='login-label'>
            Senha:
          </label>
          <input
            className='login-input'
            title='Digite sua senha' color='red'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      
        <button type="submit">Logar</button>
      </form>
    </div>
  );
}

export default LoginPage;
