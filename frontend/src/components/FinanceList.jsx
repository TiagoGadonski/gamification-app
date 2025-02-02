// frontend/src/components/FinanceList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinanceList = () => {
  const [finances, setFinances] = useState([]);

  const fetchFinances = () => {
    axios.get('http://localhost:5000/api/finances')
      .then(response => setFinances(response.data.data))
      .catch(err => console.error("Erro ao buscar finanças:", err));
  };

  useEffect(() => {
    fetchFinances();
  }, []);

  return (
    <div>
      <h3>Lista de Finanças</h3>
      <ul>
        {finances.map(fin => (
          <li key={fin.id}>
            <strong>{fin.type}</strong> de {fin.value} - {fin.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceList;
