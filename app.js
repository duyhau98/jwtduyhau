var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');


var user = require('./routes/user');
var auth = require('./routes/auth');

const passport    = require('passport');

require('./passport');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  
  // allow options method work, ask experts for more
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
}



app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/me', passport.authenticate('jwt', {session: false}), user);
app.use('/user', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server = app.listen(process.env.PORT || 5000,()=>console.log("Start in 5000"));
io = socket(server);

io.on('connection', (socket) => {
    console.log("Da Ket noi Socket");
    socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);

  })

  socket.on('FIND_ANOTHER', function(data){
    io.emit('RECEIVE_FIND_ANOTHER', data);

})
socket.on('PLAY_WITH_ANOTHER', function(data){
  io.emit('RECEIVE_PLAY_WITH_ANOTHER', data);

})

  socket.on('XIN_DAU_HANG', function(data){
  io.emit('RECEIVE_XIN_DAU_HANG', data);

})

socket.on('REQUEST_START_AGAIN', function(data){
  io.emit('RECEIVE_REQUEST_START_AGAIN', data);

})

socket.on('REPLY_START_AGAIN', function(data){
  io.emit('RECEIVE_REPLY_START_AGAIN', data);

})

socket.on('REQUEST_UNDO', function(data){
  io.emit('RECEIVE_REQUEST_UNDO', data);

})

socket.on('REPLY_UNDO', function(data){
  io.emit('RECEIVE_REPLY_UNDO', data);

})

socket.on('REQUEST_HOA', function(data){
  io.emit('RECEIVE_REQUEST_HOA', data);

})

socket.on('REPLY_HOA', function(data){
  io.emit('RECEIVE_REPLY_HOA', data);
  
});

module.exports = app;
