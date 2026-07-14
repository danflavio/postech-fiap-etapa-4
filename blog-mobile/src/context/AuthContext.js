import React, { createContext, useContext, useState } from 'react';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [professor, setProfessor] = useState(null);

  async function login(email, senha) {
    const response = await api.post('/auth/login', { email, senha });
    const { token, professor: prof } = response.data;
    setAuthToken(token);
    setProfessor(prof);
    setIsAuthenticated(true);
    return prof;
  }

  function logout() {
    setAuthToken(null);
    setProfessor(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, professor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
