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
    storageBucket: "beer-plan.appspot.com",
    messagingSenderId: "644077528816"
  };

  firebase.initializeApp(config);


  const auth = firebase.auth();
  const preObject = document.getElementById('object');

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

      // hide sign-out button
      $('#sign-out').removeAttr('hidden');

      //Hide sign-in / sign-up card
      $('#auth-card').attr('hidden', 'true');

      // Show event-card
      $('#event-card').removeAttr('hidden');

      console.log('Signed in!');

    } else {

      // Show sign-out button
      $('#sign-out').attr('hidden', 'true');

      // Show sign-in / sign-up card
      $('#auth-card').removeAttr('hidden');

      // Hide event card
      $('#event-card').attr('hidden', 'true');

      console.log('Not logged in');

    }
  });

  // Click events
  $('#signUpShow').click(  () => {
    //Change button classes
    $('#signUpShow').toggleClass('active');
    $('#signInShow').toggleClass('active');

    // Show sign up group
    $('.sign-up-group').removeAttr('hidden');
    $('#reset').removeAttr('hidden');

    // Re-enable sign up input
    $('.sign-up-control').removeAttr('disabled');

    // hide sign in
    $('#sign-in').attr('hidden', 'true');
  });

  $('#signInShow').click( () => {
    //Change button classes
    $('#signUpShow').toggleClass('active');
    $('#signInShow').toggleClass('active');

    // Show sign in button
    $('#sign-in').removeAttr('hidden');

    // Hide sign up
    $('.sign-up-group').attr('hidden', true);

    // Disable Inputs
    $('.sign-up-control').attr('disabled', true);

  });

  console.log(preObject);
  console.log(dbRef);

  function insertDate() {
    let dateString = (new Date()).toJSON().replace(/\.\d\d\dZ/,'');
    $('#event-end').attr('value', dateString);
    $('#event-start').attr('value', dateString);
  }

  insertDate();

  // Map
  Let key = 'AIzaSyAA8_rAyxClFs4NLqPD22_qcyGeEdmhzAY';

})();
