module.exports.firelib = (function() {
  var firebase = require("firebase");
  var config = {
    apiKey: "AIzaSyBDd6f89s9qxu5yCpu4ISdf3tTDVsvJlvM",
    authDomain: "planbyme-5c048.firebaseapp.com",
    databaseURL: "https://planbyme-5c048.firebaseio.com",
    projectId: "planbyme-5c048",
    storageBucket: "planbyme-5c048.appspot.com",
    messagingSenderId: "580258903641"
  };
  firebase.initializeApp(config);

  var currentUser = function() {
    return firebase.auth().currentUser;
  }

  var register = function(email, password, callback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle errors
      console.log(error);
    }).then(function() {
      console.log("within callback");
      callback();
    });
  }

  var signIn = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle errors
      console.log(error);
    });
  }

  var signOut = function() {
    firebase.auth().signOut();
  }

  var onAuthStateChanged = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log("SIGNED IN");
    } else {
      // User is signed out.
      console.log("SIGNED OUT");
      // ...
    }
    // ...
  });

  return {
    config: config,
    register: register,
    signIn: signIn,
    signOut: signOut,
    currentUser: currentUser
  }
});
