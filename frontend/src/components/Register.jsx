// frontend/src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/users/register', {
      name, email, password, avatar
    })
    .then((response) => {
      setMessage(`Usuário registrado! ID: ${response.data.data.id}`);
    })
    .catch((error) => {
      setMessage(error.response?.data?.error || 'Erro ao registrar usuário');
    });
  };

  return (
    <div>
      <h2>Registrar Usuário</h2>
      <p>{message}</p>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar (URL):</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
