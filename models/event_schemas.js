const mongoose = require('mongoose');

//User schema
const EventSchema = mongoose.Schema({
  event_name:{
    type:String
  },
  event_room:{
    type:String
  },
  event_room_id:{
    type:String
  },
  event_place:{
    type:String
  },
  event_start_time:{
    type:Date
  },
  event_end_time:{
    type:Date
  },
  event_logo:{
    type:String
  },
  event_logo_path:{
    type:String
  },
  using_default_logo:{
    type:String
  },
  event_host_name:{
    type:String
  },
  account_ID:{
    type:String
  },
  event_attendants:[{
    name: {type: String},
    email: {type: String}
  }]
});


module.exports = mongoose.model('Event', EventSchema);
