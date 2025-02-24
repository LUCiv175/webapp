// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");


  const handleRegister = async () => {
    const result = await register(name, surname, phone, birth, email, password);
    if (result.status === 200) {
      navigate('/login'); // Reindirizza alla dashboard dopo il login
    } else {
      alert(result.message); // Mostra un messaggio di errore
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <h3>Nome</h3>
        <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <h3>Cognome</h3>
        <input 
            type="text" 
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
        />
        <h3>Telefono</h3>
        <input 
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        />
        <h3>Data di Nascita</h3>
        <input 
            type="date" 
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
        />
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
      <button onClick={handleRegister}>Registrati</button>
    </div>
  );
};

export default Register;