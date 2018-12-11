const config = require('../config/database');
const mysql = require('mysql');
const mongoose = require('mongoose');
const Room_schema = require('./room_schemas');
const Event_schema = require('./event_schemas');
const Place_schema = require('./place_schemas');
const Group_schema = require('./group_schemas');
const AccountsSchema = require('./accounts_schemas');
const SessionsSchema = require('./session_schemas');
const Fetch = require('../models/fetch');

let Parser = require('rss-parser');
let parser = new Parser();

const Fetch_Items={

  getAllRooms : function( callback){
    Room_schema.find(callback);
  },
  getSession : function( callback){
    SessionsSchema.find(callback);
  },
  getAllAccounts : function( callback){
    console.log('getting accounts');
    AccountsSchema.find(callback);
  },
  getRoomByID : function( roomid, callback){
    Room_schema.find({_id:roomid},callback);
  },
  getRSS : async function( roomid,callback){

 

  // console.log(feed.title);
 
  // feed.items.forEach(item => {
  //   console.log(item.title + ':' + item.link)
  // });
    // console.log(feed)
    // res.send(feed) 
  },
  getRoomByIDArray : function( roomid_array, callback){
//    console.log("id array")
    // var roomid_array_parsedJSON = JSON.parse(roomid_array);
    // var roomIDArray = [];
    // var roomNamesArray= [];
    // for(var i=0; i<roomid_array_parsedJSON.length; i++)
    // {
    //     roomIDArray.push(roomid_array_parsedJSON[i].roomID);
    //     console.log(roomid_array_parsedJSON[i].roomID);
    // }
      //.find({_id:roomid_array_parsedJSON[i].roomID}));
      // console.log(roomid_array_parsedJSON[0].roomID);
      // Room_schema.find({_id:roomid_array_parsedJSON[0].roomID},function(err, roomNames) {
      //     console.log(roomNames[0].room_name);
      //     callback = roomNames[0].room_name;
      // });
      //

    //   Room_schema.find({$in:roomIDArray}, function(err, roomNames) {
    //     for (var i = 0; i < roomNames.length; i++)
    //     {
    //         roomNamesArray.push(roomNames[i]);
    //     }
    //     console.log('roomnamearray');
    //     console.log(roomNamesArray);
    //       // res.json({
    //       //     userId: userId,
    //       //     car: totalCar
    //       // });
    // });

    console.log("done one");
  },
  getRoomByAccountID : function( account_ID, callback){
    //console.log(account_ID);
    Room_schema.find({room_account_ID:account_ID},callback);
  },
  getRoomDatabyID : function( room_id, callback){
    //console.log(account_ID);
    Room_schema.find({_id:room_id},callback);
  },
  getRoomCountByAccountID : function( account_ID, callback){
    //console.log(account_ID);
    console.log(account_ID)
    AccountsSchema.find({_id:account_ID},callback);
  },
  getAccountNameByAccountID : function( account_ID, callback){
    console.log(account_ID)
    AccountsSchema.find({_id:account_ID},callback);
  },
  getmeetingByID : function( meeting_ID, callback){
    //console.log(account_ID);
    Event_schema.find({_id:meeting_ID},callback);
  },

  getWorkgroupByAccountID: function( account_ID, callback){
    //console.log(account_ID);
    Group_schema.find({account_ID:account_ID},callback);
  },

  getWorkgroupByWorkgroupID: function( workgroup_ID, callback){
    //console.log(account_ID);
    Group_schema.find({_id:workgroup_ID},callback);
  },


  getAllEvents : function( callback){
    Event_schema.find(callback);
  },
  getEventDatesForCurrentRoom : function(roomid, callback){
    //console.log(roomid);
    Event_schema.find({event_room_id:roomid},callback);
  },
  getEventsForCurrentRoom : function(roomid, callback){
    //console.log(roomid);
    Event_schema.find({event_room_id:roomid},callback);
  },
  getEventsForAccountID : function(accountid, callback){
    //console.log(roomid);
    Event_schema.find({account_ID:accountid},callback);
  },
  getAllPlaces : function( callback){
    Place_schema.find(callback);
  },
  getPlace_byadmin : function(admin, callback){
    Place_schema.find({place_admin:admin},callback);
  },
  getRoom_byplace:function(place,callback){
    Room_schema.find({room_place:place},callback);
  },
  getEvent_byplace:function(place,callback){
    Event_schema.find({event_place:place},callback);
  },
  getEvent_byroomname:function(roomname,callback){
    Event_schema.find({room_name:roomname},callback);
  }
};


module.exports=Fetch_Items;
