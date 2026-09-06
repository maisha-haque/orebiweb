import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('orebi_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('orebi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('orebi_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Simple authentication validation demo
    const userData = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      loggedInAt: new Date().toISOString()
    };
    setUser(userData);
    return userData;
  };

  const register = (name, email, password) => {
    const userData = {
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      loggedInAt: new Date().toISOString()
    };
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
