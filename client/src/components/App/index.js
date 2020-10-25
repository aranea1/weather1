import React, { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../auth/useAuth';
import Authentication from '../Authentication';
import Cities from '../Cities';
import Control from '../Control';
import './App.scss';

const App = () => {

  const [showControl, setShowControl] = useState(false);
  const { userData, login, logout } = useAuth();
  const { username, token, isAuthenticated, role, userCityId } = userData;
  const isAdmin = role === 'admin';

  if (showControl && isAdmin) {
    return (
      <AuthContext.Provider value={{ token, role }}>
        <Control 
          setShowControl={setShowControl}
        />
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider
      value={{ username, token, isAuthenticated, role, userCityId, login, logout }}>
      <div className="App">
        <div className="Cities-Weather">
          <Cities />
        </div>
        <div className="Authentication">
          <Authentication
            setShowControl={setShowControl}
          />
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
