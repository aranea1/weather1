import { createContext } from 'react';

export const AuthContext = createContext({
   userData: {
      username: null,
      token: null,
      isAuthenticated: false,
      role: 0,
      userCityId: [],
   },
   showControl: false,
   login: function(){},
   logout: function(){}
});
