// frontend/src/components/ActivityList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = () => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => setActivities(response.data.data))
      .catch(err => console.error("Erro ao buscar atividades:", err));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      <h3>Lista de Atividades</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <strong>{activity.title}</strong> - {activity.points} pontos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
