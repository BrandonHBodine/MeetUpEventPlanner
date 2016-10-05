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


  const auth = firebase.auth();
  const preObject = document.getElementById('object');
  const list = document.getElementById('list');

  const dbRef = firebase.database().ref().child('object');
  const dbRefList = dbRef.child('hobbies');

  dbRef.on('value', snap => console.log(snap.val()));

  dbRefList.on('child_added', snap => console.log(snap.val()));

  $('#create').submit(function(event) {
    event.preventDefault();
    console.log('Submitted');
    const email = $('#email').val();
    const password = $('#password').val();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch( e => console.log(e.message) );
  });

  $('#sign-in').click( () => {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const promise = auth.signInWithEmailAndPassword(email, password);
  });

  $('#sign-out').click( () => {
    event.preventDefault();
    auth.signOut();
  });

  auth.onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      console.log('Signed in!')
    } else {
      console.log('Not logged in');
    }
  });

  console.log(preObject);
  console.log(dbRef);
})();
