import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/registerUser';
import { FaUserPlus } from "react-icons/fa6";
import './register.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(email, password);
      setMessage('Usuário cadastrado com sucesso!');
      setTimeout(() => navigate('/login'), 4500);
    } catch (error: any) {
      setMessage(error.message || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="register-container">
      <h2> <FaUserPlus /> Cadastro</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ display: "flex", justifyContent: "center" }}> 
            <button style={{ width: "60%" }} type="submit">Cadastrar</button>
        </div>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
