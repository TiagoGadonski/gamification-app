// frontend/src/components/EditUser.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditUser() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [msg, setMsg] = useState('');

  // Podemos ler o userId e token salvos no localStorage após o login
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId) return;
    // Buscar dados do usuário no backend
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then((response) => {
        const user = response.data.data;
        if (user) {
          setName(user.name);
          setAvatar(user.avatar || '');
        }
      })
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, [userId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setMsg('');

    axios.put(`http://localhost:5000/api/users/${userId}`, {
      name,
      avatar
    }, {
      headers: {
        // Envia o token no header "Authorization"
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setMsg('Perfil atualizado com sucesso!');
    })
    .catch(err => {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setMsg(`Erro: ${err.response.data.error}`);
      } else {
        setMsg('Erro ao atualizar perfil.');
      }
    });
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar (URL): </label>
          <input
            type="text"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditUser;
