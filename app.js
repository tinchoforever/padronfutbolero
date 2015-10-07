var express       = require('express'),
    bodyParser    = require('body-parser'),
    path          = require('path'),
    favicon       = require('static-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    http          = require('http'),
    api        = require('./routes/main.js');
    
var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//TODO: MOVE TO ROUTER.
app.enable('trust proxy');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//add this so the browser can GET the bower files
app.use('/js/bower_components', express.static(__dirname + '/js/bower_components'));

app.use('/', api);
/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { });
});




/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var server =http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//io sockets would address to all the web-clients talking to this nodejs server
var io = require('socket.io')(server);

var socket;

var devices =[];
var sockets = [];
io.sockets.on('connection', function (socket) {
  console.log("connnect"); 

  sockets.push(socket);

  //some web-client disconnects
  socket.on('disconnect', function (socket) {
    console.log("disconnect");
  });
  //some web-client disconnects
  socket.on('connect', function (socket) {
   io.sockets.emit('newClubs', clubs);
   console.log('clubs');
   console.log('connect',clubs);
  });
  
  //some web-client sents in a msg
  socket.on('client', function (data) {
    console.log(data);
  });
   //we expect to get a ping from 
  //them saying what room they want to join
  socket.on('club', function(data) {
    console.log('club',data);
    addClub(data);
    io.emit('newClubs', clubs);
    console.log('newClubs',clubs);
  });
  //we expect to get a ping from 
  //them saying what room they want to join
  socket.on('room', function(data) {
      if(socket.room){
          socket.leave(socket.room);
      }
      socket.room = data;
      console.log('new connection to: ' + data);
      socket.join(data);
    });
});


var clubs = [];
var addClub = function(c){

  var found = false;
  for (var i = 0; i < clubs.length; i++) {
    if (clubs[i].key === c){
      clubs[i].count++;
      found= true;
      break;
    }
  };
  if (!found){
    clubs.push({
      id: clubs.length,
      key: c,
      count:1
    });
  }
}