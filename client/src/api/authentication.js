import { openNotification } from '../components/Notification';

export const request = async (action = null, body = null, headers = {}) => {

   const method = 'POST';
   if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
   }
   const url = `/api/auth/${action}`;
   try {
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (data) {
         if (data.message)
            openNotification(data.message);
         if (data.errors)
            data.errors.forEach(error => openNotification(error.msg));
      }
      return data;
   } catch (e) {
      console.log(e.message);
      return;
   }
}
