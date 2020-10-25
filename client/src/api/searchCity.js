import { formatWeather } from "../utils/formatWeather";
import { getUrl } from '../config';

export const findByName = async (requestedCity) => {

   const getCities = async () => {
      try {
         const response = await fetch(`/api/search/city?q=${requestedCity}`);
         return response.json();
      } catch (e) {
         console.log(e.message);
         return '';
      }
   }

   return await getCities();
};

export const findById = async (id) => {
   const url = getUrl(id);
   try {
      const response = await (await fetch(url)).json();
      if (response.cod === '404') {
         return null;
      }
      return formatWeather(response);
   } catch (e) {
      console.log(e.message);
      return null;
   }
}
