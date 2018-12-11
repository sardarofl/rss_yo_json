const mongoose = require('mongoose');

//User schema
const GroupSchema = mongoose.Schema({
  account_ID:String,
  workgroup_name:String,
  roomID_Array:[{
    roomID: {type: String},
    room_Name: {type: String}
  }]

});


module.exports = mongoose.model('Group', GroupSchema);
