var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var json = require('express-json');
var path = require('path');
var port = 8999;

var app = express();


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

function checkAuth(req, res, next) {
  console.log('checkAuth ' + req.url);

  // replace with firebase logic check.
  if (req.url === '/events' && (!req.session || !req.session.authenticated)) {
    res.sendFile(path.join(__dirname, '/views', 'faq.html'));
    return;
  }

  next();
}
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());
app.use(session({
  secret: 'example',
  resave: true,
  saveUninitialized: true
}));
app.use(checkAuth);


var router = express.Router();
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

router.get('/welcome', function (req, res, next) {
  res.render('welcome');
});

router.get('/events', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'events.html'));
});

router.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'login.html'));
});

router.post('/login', function (req, res, next) {

  // you might like to do a database look-up or something more scalable here
  if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    req.flash('error', 'Username and password are incorrect');
    res.redirect('/login');
  }

});

router.get('/logout', function (req, res, next) {
  delete req.session.authenticated;
  res.redirect('/');
});

app.use('/', router);

const server  = http.createServer(app);
server.listen(port);
console.log('Node listening on port %s', port);
