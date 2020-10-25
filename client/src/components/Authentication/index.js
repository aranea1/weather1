import React, { useState, useContext } from 'react';
import { Button, Typography } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import Login from './Login';
import Registration from './Registration';

const Authentication = ({ setShowControl }) => {

  const [component, setComponent] = useState('');
  const { isAuthenticated, logout, username, role } = useContext(AuthContext);
  const isAdmin = role === 'admin';
  const authComponent = {
    login: <Login />,
    registration: <Registration />
  };

  if (isAuthenticated) return (
    <div>
      Signed as
      <Typography.Text style={{ color: '#1890ff', marginRight: '1rem' }} strong>
        {` ${username}`}
      </Typography.Text>
      <Button onClick={logout}>Log Out</Button>
      {
        isAdmin &&
        <Button
          style={{
            position: "absolute",
            marginLeft: "0.5rem"
          }}
          onClick={() => setShowControl(true)}
        >
          Control
        </Button>
      }
    </div>
  );

  return (
    <div>
      <Button
        style={{ marginRight: "0.5rem" }}
        onClick={() => setComponent('login')}
      >
        Login
        </Button>
      <Button
        style={{ marginRight: "0.5rem" }}
        onClick={() => setComponent('registration')}
      >
        Registration
        </Button>
      {
        component &&
        <Button onClick={() => { setComponent('') }}>
          {'\u00D7'}
        </Button>
      }
      {
        authComponent[component]
      }
    </div>
  );
};

export default Authentication;
