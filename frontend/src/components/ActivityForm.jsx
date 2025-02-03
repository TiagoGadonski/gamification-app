// frontend/src/components/ActivityForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FormContainer } from '../theme';

const ActivityForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/activities', {
      title,
      description,
      points: parseInt(points, 10),
      user_id: localStorage.getItem('userId') // Use o ID do usuário logado
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      setTitle('');
      setDescription('');
      setPoints(0);
      onSuccess(); // Chame a função de atualização
    })
    .catch(err => console.error("Erro ao criar atividade:", err));
  };

  return (
    <FormContainer>
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
    </FormContainer>
  );
};

export default ActivityForm;
