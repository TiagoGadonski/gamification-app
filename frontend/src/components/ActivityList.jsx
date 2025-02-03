import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { cyberpunkTheme, cyberButton } from '../theme';
import ActivityForm from './ActivityForm';

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ActivityCard = styled.div`
  ${cyberButton};
  padding: 1.5rem;
  margin: 1rem 0;
  animation: ${slideIn} 0.5s ease;
  background: rgba(0, 0, 0, 0.7);
  text-align: left;
`;

const DifficultyTag = styled.span`
  background: ${props => {
    switch(props.difficulty) {
      case 'hard': return '#FF6B6B';
      case 'medium': return '#FFE66D';
      default: return '#4ECDC4';
    }
  }};
  padding: 0.3rem 0.8rem;
  margin-left: 1rem;
  border-radius: 3px;
  color: #000;
`;

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const refreshActivities = () => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => setActivities(res.data.data));
  };

  const completeActivity = async (id) => {
    await axios.post(`http://localhost:5000/api/activities/${id}/complete`);
    // Adicionar efeitos visuais aqui
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => setActivities(res.data.data));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>Missões Disponíveis</h2>
      <button 
          onClick={() => setShowForm(!showForm)}
          style={{ 
            background: cyberpunkTheme.colors.primary,
            color: cyberpunkTheme.colors.text,
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Fechar Formulário' : 'Nova Missão'}
        </button>
      </div>

      {showForm && <ActivityForm onSuccess={refreshActivities} />}
      
      {activities.map(activity => (
        <ActivityCard key={activity.id}>
          <h3>{activity.title}
            <DifficultyTag difficulty={activity.difficulty}>
              {activity.difficulty}
            </DifficultyTag>
          </h3>
          <p>{activity.description}</p>
          <p>Recompensa: ⚡{activity.points} XP</p>
          <button 
            onClick={() => completeActivity(activity.id)}
            style={{ marginTop: '1rem' }}
          >
            Concluir Missão
          </button>
        </ActivityCard>
      ))}


    </div>
  );
};

export default ActivityList;