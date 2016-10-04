'use strict';

(function() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log('I say no no no.');
  }

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAA8_rAyxClFs4NLqPD22_qcyGeEdmhzAY",
    authDomain: "beer-plan.firebaseapp.com",
    databaseURL: "https://beer-plan.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "644077528816"
  };
  firebase.initializeApp(config);

  const preObject = document.getElementById('object');
  const list = document.getElementById('list');

  const dbRef = firebase.database().ref().child('object');
  const dbRefList = dbRef.child('hobbies');

  dbRef.on('value', snap => console.log(snap.val()));

  dbRefList.on('child_added', snap => console.log(snap.val()));

  console.log(preObject);
  console.log(dbRef);
})();
