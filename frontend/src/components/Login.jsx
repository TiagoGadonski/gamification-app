import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) { // Recebe setUser via props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/users/login', { email, password })
      .then((response) => {
        const { user, token } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        setUser(user); // Agora está definido
        setSuccessMsg('Login realizado com sucesso!');
        setError('');
      })
      .catch((err) => {
        setSuccessMsg('');
        setError(err.response?.data?.error || 'Erro ao fazer login');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;