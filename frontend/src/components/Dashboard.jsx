import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { cyberpunkTheme, cyberButton, pixelBorder } from '../theme';

const glow = keyframes`
  0% { box-shadow: 0 0 5px ${cyberpunkTheme.colors.primary}; }
  50% { box-shadow: 0 0 20px ${cyberpunkTheme.colors.secondary}; }
  100% { box-shadow: 0 0 5px ${cyberpunkTheme.colors.primary}; }
`;

const DashboardContainer = styled.div`
  background: ${cyberpunkTheme.colors.background};
  color: ${cyberpunkTheme.colors.text};
  padding: 2rem;
  font-family: ${cyberpunkTheme.fonts.main};
`;

const LevelProgress = styled.div`
  ${pixelBorder};
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
  animation: ${glow} 2s infinite;
`;

const ProgressBar = styled.div`
  height: 20px;
  background: ${cyberpunkTheme.colors.secondary};
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  ${pixelBorder};
  padding: 1.5rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
`;

const CyberButton = styled.button`
  ${cyberButton};
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get('http://localhost:5000/api/users/1');
      const activitiesRes = await axios.get('http://localhost:5000/api/activities');
      setUser(userRes.data.data);
      setActivities(activitiesRes.data.data);
    };
    fetchData();
  }, []);

  const calculateProgress = () => {
    if (!user) return 0;
    const currentLevelPoints = user.points % 100;
    return (currentLevelPoints / 100) * 100;
  };

  return (
    <DashboardContainer>
      {user ? (
        <>
          <h2>Welcome Back, {user.name}!</h2>
          
          <LevelProgress>
            <h3>Level {user.level}</h3>
            <ProgressBar progress={calculateProgress()} />
            <p>{user.points} XP</p>
          </LevelProgress>

          <StatsGrid>
            <StatCard>
              <h3>Atividades Hoje</h3>
              <p>{activities.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString()).length}</p>
            </StatCard>

            <StatCard>
              <h3>Badges Conquistados</h3>
              <p>{user.badges?.length || 0}</p>
            </StatCard>

            <StatCard>
              <h3>Streak Atual</h3>
              <p>🔥 5 dias</p>
            </StatCard>
          </StatsGrid>

          <CyberButton onClick={() => window.location.hash = '#activities'}>
            Ver Missões
          </CyberButton>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;