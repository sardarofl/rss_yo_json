const config = require('../config/database');
//const mysql = require('mysql');
var path = require('path');
const mongoose = require('mongoose');
const Room_schema = require('./room_schemas');
const Event_schema = require('./event_schemas');
const Place_schema = require('./place_schemas');
const fs = require('fs');
//delete items

const Delete_Items={

  DeleteFromRooms:function(item,roomdefaultlogo,res, callback){
  var data = {
    "Data":""
  };
  //console.log(item+" "+roomdefaultlogo);
  Room_schema.remove({_id:item},callback);
  var eventquery = Event_schema.find().remove({event_room_id:item});
  eventquery.exec();
  fs.unlink('uploads/'+roomdefaultlogo, function() {

   });

  },

  DeleteFromAttendants:function(eventid,attendantid, res, callback){

    var data = {
      "Data":""
    };
    //Event_schema.find({_id:eventid}).remove({_id:attendantid},callback);
    //console.log(eventid+" "+attendantid);
    Event_schema.update(
   {
         "_id": eventid
     },
     { "$pull": { "event_attendants": { "_id": attendantid } }}
  ,callback);

  },
  DeleteFromEvents:function(item,eventlogopath, res, callback){
    var data = {
      "Data":""
    };
    Event_schema.remove({_id:item},callback);
    //console.log(eventlogopath);
    fs.unlink('uploads/'+eventlogopath, function() {

     });

  },

  DeleteFromPlaces:function(item, res, callback){
    var data = {
      "Data":""
    };
    Place_schema.remove({_id:item},callback);


  },
  DeleteFromEventsWithoutLogo:function(item, res, callback){
    var data = {
      "Data":""
    };
    Event_schema.remove({_id:item},callback);
  

  }

};


module.exports=Delete_Items;
