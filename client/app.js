var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var json = require('express-json');
var firebase = require("firebase");
var path = require('path');
var port = 5000;

var app = express();

var firelib = require("./firelib").firelib();


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
app.use(express.static(__dirname + '/views/firebase'));
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());
app.use(session({
  secret: 'example',
  resave: true,
  saveUninitialized: true
}));
app.use(checkAuth);


var router = express.Router();
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

router.get('/events', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'events.html'));
});

router.post('/login', function(req, res, next) {
  firelib.signIn(req.body.email, req.body.password);
  res.sendStatus(200);
});

router.post('/register', function(req, res, next) {
  firelib.register(req.body.email, req.body.password, () => {
    console.log("passed in callback");
    res.sendStatus(200);
  });
});

router.get('/currentUser', function(req, res, next) {
  console.log(firelib.currentUser());
  res.sendStatus(200);
});

router.post('/logout', function(req, res, next) {
  firelib.signOut();
  console.log(firelib.currUser);
  res.sendStatus(200);
});

app.use('/', router);

const server  = http.createServer(app);
server.listen(port);
console.log('Client serving on port %s', port);