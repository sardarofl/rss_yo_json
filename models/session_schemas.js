const mongoose = require('mongoose');

//Room schema
const SessionSchema = mongoose.Schema({

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


module.exports = mongoose.model('Session', SessionSchema);
