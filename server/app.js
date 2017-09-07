var express = require('express');
var http = require('http');
var firebase = require("firebase");
var path = require('path');
var port = 5001;

var app = express();

var config = {
  apiKey: "AIzaSyBDd6f89s9qxu5yCpu4ISdf3tTDVsvJlvM",
  authDomain: "planbyme-5c048.firebaseapp.com",
  databaseURL: "https://planbyme-5c048.firebaseio.com",
  projectId: "planbyme-5c048",
  storageBucket: "planbyme-5c048.appspot.com",
  messagingSenderId: "580258903641"
};
firebase.initializeApp(config);

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var router = express.Router();
router.get('/', function(req, res, next) {
  res.json({
    data: "Hello World"
  });
});
app.use('/', router);

const server  = http.createServer(app);
server.listen(port);
console.log('Server listening on port %s', port);
