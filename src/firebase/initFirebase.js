const firebase = require("firebase-admin");
const serviceAccount = require("./google-service.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

module.exports = firebase;
