// frontend/src/components/NoteList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    axios.get('http://localhost:5000/api/notes')
      .then(response => setNotes(response.data.data))
      .catch(err => console.error("Erro ao buscar notas:", err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h3>Lista de Notas</h3>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}</strong> - {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
