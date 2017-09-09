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
  if (req.url === '/events' && firelib.currentUser() === null) {
    res.redirect('/login');
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

router.get('/forgot', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'password_recovery.html'));
});

router.post('/forgotpwd', function(req, res, next) {
  firelib.forgot(req.body.email).then(() => {
    res.sendStatus(200);
  });
});

router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'userLogin.html'));
});
router.get('/settings', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'accountSettings.html'));
});

router.post('/loginUser', function(req, res, next) {
  var err = null;
  firelib.signIn(req.body.email, req.body.password).catch(function(error) {
    err = error;
  }).then(() => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/views', 'register.html'));
});

router.post('/registerUser', function(req, res, next) {
  var err = null;
  firelib.register(req.body.email, req.body.password).catch(function(error) {
    err = error;
  }).then(() => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/currentUser', function(req, res, next) {
  res.json(firelib.currentUser());
});

router.post('/resetPassword', function(req, res, next) {
  var err = null;
  firelib.resetPassword(req.body.password).catch(function(error) {
    err = error;
  }).then(() => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/logout', function(req, res, next) {
  firelib.signOut();
  res.redirect("/");
});

app.use('/', router);

const server  = http.createServer(app);
server.listen(port);
console.log('Client serving on port %s', port);
