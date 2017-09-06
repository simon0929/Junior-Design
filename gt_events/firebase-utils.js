/**
 * @author William Ma
 * @version 1
 */

var firebase = require("firebase")
var config = {
    apiKey: "AIzaSyBDd6f89s9qxu5yCpu4ISdf3tTDVsvJlvM",
    authDomain: "planbyme-5c048.firebaseapp.com",
    databaseURL: "https://planbyme-5c048.firebaseio.com",
    projectId: "planbyme-5c048",
    storageBucket: "planbyme-5c048.appspot.com",
    messagingSenderId: "580258903641"
};
firebase.initializeApp(config);

function registerUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle exception
    });
}

function signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle exception
    });
}
