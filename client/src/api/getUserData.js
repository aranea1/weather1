export const getUserData = async (token, headers = {}) => {

   headers['Content-Type'] = 'application/json';
   try {
      const response = await fetch(`/api/auth?token=${token}`, { headers });
      const data = await response.json();
      return data;
   } catch (e) {
      console.log(e.message);
   }
}
