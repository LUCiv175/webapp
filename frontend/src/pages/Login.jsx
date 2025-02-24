// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.status === 200) {
      navigate('/dashboard'); // Reindirizza alla dashboard dopo il login
    } else {
      alert(result.message); // Mostra un messaggio di errore
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>Email</h3>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h3>Password</h3>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Accedi</button>
    </div>
  );
};

export default Login;