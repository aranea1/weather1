export const removeFromList = async (cityId, token) => {
   
   const url = `/api?token=${token}&cityId=${cityId}`;
   const method = 'DELETE';
   const headers = {
      'Content-Type': 'application/json',
   };

   try {
      const response = await fetch(url, { method, headers });
      const data = await response.json();
      return data;
   } catch (e) {
      console.log(e.message);
   }
}

export const addToList = async (cityId, token) => {

   const method = 'PATCH';
   const body = JSON.stringify({
      cityId,
      token: token,
   });
   const headers = {
      'Content-Type': 'application/json',
   };

   try {
      const response = await fetch('/api', { method, body, headers });
      const data = await response.json();
      return data;
   } catch (e) {
      console.log(e.message);
   }
}