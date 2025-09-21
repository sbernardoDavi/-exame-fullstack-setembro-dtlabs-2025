import React, { useState } from 'react';
import './login.css'; 
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { FcMultipleSmartphones } from "react-icons/fc";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await login(username, password);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro ao fazer login, Usuário ou senha inválidos.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div className="login-container">
      <h2> <FcMultipleSmartphones /> Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-input-group">
          {/* <label className="login-label">Usuário:</label> */}
          <input
            className="login-input"
             placeholder="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="login-input-group">
          {/* <label className="login-label">Senha:</label> */}
          <input
            className="login-input"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <a className='remember' href='/login'>
            Esqueceu a senha?
          </a>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className='button-group'>
          <button className='button-login' type="submit">Logar</button>
          <button className='button-register' onClick={handleRegister}>Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
