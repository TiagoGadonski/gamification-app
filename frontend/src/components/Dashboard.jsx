// frontend/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Exemplo: busca o usuário 1
    axios.get('http://localhost:5000/api/users/1')
      .then(response => setUser(response.data.data))
      .catch(err => console.error("Erro ao buscar usuário:", err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
          <p>Nível: {user.level}</p>
          <p>Pontos: {user.points}</p>
        </div>
      ) : (
        <p>Carregando usuário...</p>
      )}
    </div>
  );
};

export default Dashboard;
