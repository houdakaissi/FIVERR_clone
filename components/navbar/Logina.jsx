import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const Logina = () => {
  const [user1, setUser] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.logina(user1);
    navigate('/',{replace:true});
  };

  return (
    <div>
      <label>
        Username: <input type="text" name="username" onChange={(e) => setUser(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Logina;