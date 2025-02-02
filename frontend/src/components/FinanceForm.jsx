// frontend/src/components/FinanceForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FinanceForm = () => {
  const [type, setType] = useState('entrada');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/finances', {
      user_id: 1,  // Exemplo: usuário 1
      type,
      value: parseFloat(value),
      description
    })
    .then(() => {
      setType('entrada');
      setValue('');
      setDescription('');
      window.location.reload();
    })
    .catch(err => console.error("Erro ao criar finança:", err));
  };

  return (
    <div>
      <h3>Criar Nova Finança</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="entrada">Entrada</option>
            <option value="saída">Saída</option>
          </select>
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={e => setValue(e.target.value)}
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
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default FinanceForm;
