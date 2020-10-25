const fs = require('fs');

searchByName = (name, cb) => {
   fs.readFile('./resources/city.list.json', 'utf8', (error, data) => {
      if (error) {
         return cb(error);
      }
      const matchedCities = JSON.parse(data)
         .filter(function (item) {
            if (this.count > 15) {
               return false;
            }
            if (item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
               this.count++;
               return true;
            }
            return false;
         }, { count: 0 });
      matchedCities.sort((a,b) => (a.name.length - b.name.length));
      cb(null, matchedCities);
   })
};

searchById = (id, cb) => {
   fs.readFile('./resources/city.list.json', 'utf8', (error, data) => {
      if (error) {
         console.log(error);
      }
      city = JSON.parse(data).find(item => {
         return (item.id === parseInt(id));
      });
      cb(city);
   });
}

module.exports = {
   searchByName,
   searchById,
}
