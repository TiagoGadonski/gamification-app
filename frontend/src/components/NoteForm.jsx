// frontend/src/components/NoteForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/notes', {
      user_id: 1,  // Exemplo: usuário 1
      title,
      content
    })
    .then(() => {
      setTitle('');
      setContent('');
      window.location.reload();
    })
    .catch(err => console.error("Erro ao criar nota:", err));
  };

  return (
    <div>
      <h3>Criar Nova Nota</h3>
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
          <label>Conteúdo:</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default NoteForm;
