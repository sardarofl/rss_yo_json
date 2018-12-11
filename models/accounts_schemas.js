const mongoose = require('mongoose');

//User schema
const AccountsSchema = mongoose.Schema({
  account_name:{
    type:String
  },
  licensed_rooms:{
    type:Number
  }
});


module.exports = mongoose.model('Accounts', AccountsSchema);
