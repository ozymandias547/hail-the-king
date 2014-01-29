var express = require('express')
  , http = require('http')
  , passport = require('passport')
  , path = require('path')
  , fs = require('fs')
  , mongoStore = require('connect-mongo')(express)
  , config = require('./lib/config/config');

var app = express();

// Setup a mongo database object and connect to the server
var db = require('./lib/db/mongo').db;

// Bootstrap models 
var modelsPath = path.join(__dirname + "/lib/models")
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file)
})

// Set up passport with a Local Strategy
require('./lib/config/pass')

// configure conditional Express calls
app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app/views');
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));

// cookieParse require for session, so should be before session
app.use(express.cookieParser());

// bodyParser should be above methodOverride
app.use(express.bodyParser());  
app.use(express.methodOverride());  //simulates put and delete methods

app.use(express.session({
  secret: 'MEAN',
  store: new mongoStore({
    url : config.db,
    collection: 'sessions'
  })
}))

// use passport session
app.use(passport.initialize());
app.use(passport.session());

//routes handled last
app.use(app.router);

//bootstrap all the routes
require('./lib/config/routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'))
});







