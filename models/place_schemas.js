const mongoose = require('mongoose');

//User schema
const PlaceSchema = mongoose.Schema({
  place_name:{
    type:String
  },
  place_admin:{
    type:String
  },
  place_number_of_rooms:{
    type:Number
  },
  place_number_of_floors:{
    type:Number
  }
});


module.exports = mongoose.model('Place', PlaceSchema);
