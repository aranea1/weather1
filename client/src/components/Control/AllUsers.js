import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, DatePicker } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { getUsers } from '../../api/getAdminData';

export const AllUsers = ({ setSelectedUser }) => {

   const { token } = useContext(AuthContext);
   const [users, setUsers] = useState([]);
   const [dateFrom, setDateFrom] = useState('');
   const [dateTo, setDateTo] = useState('');

   useEffect(() => {
      const getData = async () => {
         const data = await getUsers(token);
         if (data && data.users) {
            setUsers(data.users);
         }
      }
      getData();
   }, [token]);

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formatted = ''.concat(date.getDate(), '-', date.getMonth() + 1, '-', date.getFullYear());
      return formatted;
   }

   const handleSelect = async id => {
      const user = await getUsers(token, id);
      setSelectedUser(user);
   }

   const handleSort = async () => {
      const from = dateFrom ? dateFrom.toISOString() : '';
      const to = dateTo ? dateTo.toISOString() : '';
      const data = await getUsers(token, null, from, to);
      if (data && data.users) {
         setUsers(data.users);
      }
   }

   return (
      <div style={{ margin: "1.5rem" }}>
         <div style={{ marginBottom: "1rem" }}>
            <DatePicker
               style={{
                  marginRight: "1rem"
               }}
               placeholder="From"
               onChange={value => setDateFrom(value ? value._d : '')}
            />
            <DatePicker
               style={{
                  marginRight: "1rem"
               }}
               placeholder="To"
               onChange={value => setDateTo(value ? value._d : '')}
            />
            <Button
               onClick={handleSort}
            >
               Filter
            </Button>
         </div>
         <Card
            title="Users"
         >
            {
               users.map(user => (
                  <Card.Grid
                     key={user._id}
                     onClick={() => handleSelect(user._id)}
                  >
                     <div>{user.username}</div>
                     <div>{formatDate(user.createdAt)}</div>
                  </Card.Grid>
               ))
            }
         </Card>
      </div>
   );
};

export default AllUsers;
