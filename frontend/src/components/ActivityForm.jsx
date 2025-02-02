// frontend/src/components/ActivityForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ActivityForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/activities', {
      title,
      description,
      points: parseInt(points, 10),
      user_id: 1 // Exemplo: usuário fixo com ID 1
    })
    .then(() => {
      setTitle('');
      setDescription('');
      setPoints(0);
      window.location.reload();
    })
    .catch(err => console.error("Erro ao criar atividade:", err));
  };

  return (
    <div>
      <h3>Criar Nova Atividade</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Pontos:</label>
          <input
            type="number"
            value={points}
            onChange={e => setPoints(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default ActivityForm;
