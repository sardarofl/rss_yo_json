const express   = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require("body-parser");
const session  = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
var cors=require('cors');
const config = require("./config/database")
const passport = require('passport');
var flash    = require('connect-flash');

//outlook addon
require('dotenv').config();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');




//express
const app = express();
// app.use(express.static(path.join(__dirname, 'meetingroom/root')));

//app.use(express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// console.log(path.join(__dirname, 'uploads'));
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, 'angular/backMMeeting/src/assets/uploads')));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport);
//require('./app/routes.js')(app);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

//port
const port = process.env.PORT || 3000;

//cors
app.use(cors());

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//index route
app.get('/',(req,res) =>{
  res.send('Invalid Endpoint');
})


//routers
const fetch = require('./routes/fetchs');
const add = require('./routes/adds');
const d_delete = require('./routes/deletes');
const s_set = require('./routes/sets');
const users = require('./routes/users');

//use routers
app.use('/fetchs',fetch);
app.use('/additems',add);
app.use('/deletes',d_delete);
app.use('/sets',s_set);
app.use('/users',users);

///outlook routers
app.use(logger('dev'));
app.use(cookieParser());
// app.use('/calendar', calendar);
// app.use('/authorizeoutlook', authorize);
// app.use('/outlookrouter', OutlookRouter);



// app.get('/admin/events', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });
// app.get('/admin/rooms', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });
// app.get('/admin/login', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });
// app.get('/admin/createaccount', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });
// app.get('/admin/workgroup', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });
/////////front end links////////////

// app.get('/meetingroom/:id', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });

// app.get('/25774419157095099081/:id', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });

// app.get('/dualmeeting/:id1/:id2', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });

// app.get('/trafalgar', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });

// app.get('/generallayoutfront/:id', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });

// app.get('/generallayoutfronthd/:id', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });

// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'admin/root/index.html'));
// });
// app.get('/meetingcollection', (req,res) =>{
//   res.sendFile(path.join(__dirname, 'meetingcollection/index.html'));
// });



app.listen(port,  () => {
  console.log('Server started on port'+port);
});
