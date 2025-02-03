import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { cyberpunkTheme, cyberButton } from '../theme';

const Nav = styled.nav`
  background: ${cyberpunkTheme.colors.background};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${cyberpunkTheme.colors.glow && `box-shadow: ${cyberpunkTheme.colors.glow};`}
`;

const NavLink = styled(Link)`
  color: ${cyberpunkTheme.colors.text};
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${cyberpunkTheme.colors.accent};
  transition: all 0.3s;

  &:hover {
    background: ${cyberpunkTheme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  ${cyberButton};
  margin-left: auto;
`;

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Nav>
      <div>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/activities">Missões</NavLink>
        <NavLink to="/profile">Perfil</NavLink>
        <NavLink to="/customize">Customizar</NavLink>
      </div>
      
      {user ? (
        <div>
          <span>Bem-vindo, {user.name}</span>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </Nav>
  );
};

export default Navbar;