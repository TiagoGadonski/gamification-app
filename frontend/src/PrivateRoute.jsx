// frontend/src/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Vamos checar se existe o token no localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    // Se não existe token, redireciona para /login
    return <Navigate to="/login" replace />;
  }
  // Se existe, rende o componente-filho
  return children;
}

export default PrivateRoute;
