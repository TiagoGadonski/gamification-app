// frontend/src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/1')
      .then(response => setUser(response.data.data))
      .catch(err => console.error("Erro ao buscar usuário:", err));
  }, []);

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      {user ? (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Nível: {user.level}</p>
          <p>Pontos: {user.points}</p>
          {user.avatar && (
            <div>
              <img src={user.avatar} alt="Avatar" width="100" />
            </div>
          )}
        </div>
      ) : (
        <p>Carregando perfil...</p>
      )}
    </div>
  );
};

export default Profile;
