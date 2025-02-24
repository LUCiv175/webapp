import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica lo stato di autenticazione all'avvio
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verifica la validità del token (es. scadenza)
      const decodedToken = decodeToken(token); // Implementa una funzione per decodificare il token
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
  }, []);

  const register = async (name, surname, phone, birth, email, password) => {
    try {
      const response = await fetch(`http://localhost:5200/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, phone, birth, email, password })
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      return { message: "User registered", status: 200 };
    } catch (error) {
      console.error("Error:", error);
      return { message: "Error registering user", status: 400 };
  }};

  const login = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5200/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Memorizza il token
      setUser(data.user);
      setIsAuthenticated(true);
      return { message: "Logged in", status: 200 };
    } catch (error) {
      console.error("Error:", error);
      return { message: "Wrong username or password", status: 401 };
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Rimuovi il token
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Funzione per decodificare il token JWT
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

