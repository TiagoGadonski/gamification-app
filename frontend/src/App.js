// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importamos nossos componentes
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import FinanceList from './components/FinanceList';
import FinanceForm from './components/FinanceForm';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Login from './components/Login';
import Register from './components/Register';
import EditUser from './components/EditUser';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        {/* Menu de navegação */}
        <nav style={{ marginBottom: '20px' }}>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/activities">Atividades</Link></li>
            <li><Link to="/finances">Finanças</Link></li>
            <li><Link to="/notes">Notas</Link></li>
            <li><Link to="/edit-user">Editar Perfil</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrar</Link></li>
          </ul>
        </nav>

        <Routes>
          {/* Rota de Login (público) */}
          <Route path="/login" element={<Login />} />
          {/* Rota de Registro (público) */}
          <Route path="/register" element={<Register />} />

          {/* As demais rotas ficam protegidas pelo PrivateRoute */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <PrivateRoute>
                <div>
                  <ActivityForm />
                  <ActivityList />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/finances"
            element={
              <PrivateRoute>
                <div>
                  <FinanceForm />
                  <FinanceList />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <div>
                  <NoteForm />
                  <NoteList />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-user"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          />

          {/* Caso queira redirecionar para /login caso a rota não exista */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
