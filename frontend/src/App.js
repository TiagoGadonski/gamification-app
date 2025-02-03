import React from 'react';
import { BrowserRouter as Router, Route, Routes,  Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { cyberpunkTheme } from './theme';
import { useEffect, useState } from 'react';
import axios from 'axios';


import Dashboard from './components/Dashboard';
import ActivityList from './components/ActivityList';
import AvatarCustomizer from './components/AvatarCustomizer';
import Login from './components/Login';
import GlobalStyle from './GlobalStyle';
import Register from './components/Register';
import Profile from './components/Profile';
import EditUser from './components/EditUser';
import Navbar from './components/Navbar';



const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.data);
        } catch (err) {
          localStorage.removeItem('token');
        }
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <GlobalStyle />
      <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/activities" element={user ? <ActivityList /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={user ? <EditUser user={user} /> : <Navigate to="/login" />} />
        <Route path="/customize" element={user ? <AvatarCustomizer /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;