export const getUsers = async (token, userId, dateFrom='', dateTo='') => {

   const headers = {
      'Content-Type': 'application/json',
   };

   const url = userId ?
      `/api/users/id?userId=${userId}&token=${token}` :
      `/api/users/all?token=${token}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
   try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      return data;
   } catch (e) {
      console.log(e.message);
   }
}
