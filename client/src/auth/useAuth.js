import { useState, useEffect } from 'react';
import { getUserData } from '../api/getUserData';

const storage = 'weatherUserData';

export const useAuth = () => {

   const [userData, setUserData] = useState({
      username: null,
      token: null,
      isAuthenticated: false,
      role: 0,
      userCityId: [],
   });

   const getData = async token => {
      try {
         const newUserData = JSON.parse(await getUserData(token));
         if (newUserData && newUserData.username) {
            const { username, cities, role } = newUserData;
            setUserData({
               username,
               token,
               isAuthenticated: true,
               role,
               userCityId: cities
            });
         }
         else logout();
      } catch (e) {
         console.log(e.message);
      }
   }

   useEffect(() => {
      const userStorage = JSON.parse(localStorage.getItem(storage));
      if (userStorage && userStorage.token) {
         getData(userStorage.token);
      }
      // eslint-disable-next-line
   }, []);

   const login = newUserData => {
      if (newUserData) {
         const { token, username, cities, role } = newUserData;
         setUserData({
            username,
            token,
            isAuthenticated: true,
            role,
            userCityId: cities
         });
         localStorage.setItem(storage, JSON.stringify({ token }));
      }
   }
   const logout = () => {
      setUserData({
         username: null,
         token: null,
         isAuthenticated: false,
         role: 0,
         userCityId: []
      });
      localStorage.removeItem(storage);
   }

   return { userData, login, logout };
}
