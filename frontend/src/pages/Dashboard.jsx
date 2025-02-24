import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Benvenuto nella tua area personale!</p>
      <button onClick={logout}>Esci</button>
    </div>
  );
};

export default Dashboard;