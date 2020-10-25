const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const schema = new Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: String,
   cities: [{
      type: String
   }],
   refCities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
   }]
},
   {
      timestamps: true
   }
);

module.exports = model('User', schema);
