const { Schema, model, Model } = require('mongoose');
const { searchById } = require('../utils/searchCity');

const schema = new Schema({
   cityId: {
      type: Number,
      required: true,
      unique: true
   },
   name: String,
   country: String,
   searchedTimes: {
      type: Number,
      default: 0
   },
});

schema.statics.findByCityIdOrCreate = function (condition, cb) {
   const self = this;
   self.findOneAndUpdate(
      condition,
      { $inc: { searchedTimes: 1 } },
      (err, res) => {
         if (err) {
            return cb(err);
         }
         if (res) {
            return cb(null, res._id);
         } else {
            const id = condition.cityId;
            searchById(id, city => {
               if (!city) {
                  return cb({ message: 'Requested id was not found' });
               }
               self.create({
                  cityId: city.id,
                  name: city.name,
                  country: city.country,
                  searchedTimes: 1
               }, (err, result) => {
                  if (err) {
                     return cb({ message: 'Error while adding city' })
                  }
                  if (result) {
                     return cb(null, result._id);
                  }
               })
            })
         }
      }
   );
}

module.exports = model('City', schema);
