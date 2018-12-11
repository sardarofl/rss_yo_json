const mongoose = require('mongoose');

//Room schema
const RoomSchema = mongoose.Schema({
  room_name:{
    type:String
  },
  room_place:{
    type:String
  },
  room_default_logo:{
    type:String
  },
  room_default_logo_path:{
    type:String
  },
  room_type:{
    type:String
  },
  room_floor_number:{
    type:String
  },
  room_account_ID:{
    type:String
  },
  room_slider_ID:{
    type:String
  },
  graph_access_token:{
    type:String
  },
  graph_refresh_token:{
    type:String
  },
  graph_token_expires:{
    type:String
  },
  graph_user_name:{
    type:String
  }
});


module.exports = mongoose.model('Room', RoomSchema);
