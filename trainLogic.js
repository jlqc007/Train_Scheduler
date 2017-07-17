
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCSs10cyjTA1e9Eqw-ptEas7vgNKaaEw-Q",
    authDomain: "train-scheduler-fa8f4.firebaseapp.com",
    databaseURL: "https://train-scheduler-fa8f4.firebaseio.com",
    projectId: "train-scheduler-fa8f4",
    storageBucket: "",
    messagingSenderId: "215162649344"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-button").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#Train-name-input").val().trim();
  var trainDestination = $("#Destination-input").val().trim();
  var trainFrequency = $("#Frequency-input").val().trim();
  
  var firstTime = $("#Train-input").val().trim();
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(
    firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    

  var train = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    time: firstTime
   };

  database.ref().push(train);

  console.log(train.name);
  console.log(train.destination);
  console.log(train.frequency);
  console.log(firstTimeConverted);
  console.log("CURRENT TIME: " + moment(currentTime).
      format("hh:mm"));
  console.log("DIFFERENCE IN TIME: " + diffTime);
  console.log(tRemainder);
  console.log("MINUTES TILL TRAIN: " +
    tMinutesTillTrain)
  console.log("ARRIVAL TIME: " + moment(nextTrain).
      format("hh:mm"));

  $("#Train-name-input").val("");
  $("#Destination-input").val("");
  $("#Train-input").val("");
  $("#Frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainFrequency = childSnapshot.val().frequency;
var firstTime = childSnapshot.val().time;
 
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(
    firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});


