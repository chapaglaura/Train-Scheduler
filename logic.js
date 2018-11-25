$(document).ready(function () {

     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_mbOcnR7En0OjAphC0sx6LGPxy4kT25k",
    authDomain: "trainexample-c395c.firebaseapp.com",
    databaseURL: "https://trainexample-c395c.firebaseio.com",
    projectId: "trainexample-c395c",
    storageBucket: "trainexample-c395c.appspot.com",
    messagingSenderId: "750732479806"
  };
  firebase.initializeApp(config);

    var database = firebase.database();


    database.ref().on("child_added", function (snapshot) {
        createTable(snapshot);
    })

    $('.time').text(moment().format('hh:mm:ss a'));

    setInterval(() => {
        $('.time').text(moment().format('hh:mm a'));
        $("#trains-table > tbody").empty();
        database.ref().once('value', function (snap) {
            snap.forEach(function (childSnap) {
             createTable(childSnap);
            });
           });
    }, 60000);

   

    

    $("#submitBtn").click(function (e) {

        e.preventDefault();

        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var first = $("#first-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        $("#name-input").val('');
        $("#destination-input").val('');
        $("#first-input").val('');
        $("#frequency-input").val('');

        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            first: first
        })
    });

function createTable(snapshot) {
    var row = $("<tr>");
        var namedata = $("<td>");
        var destinationdata = $("<td>");
        var frequencydata = $("<td>");
        var arrivaldata = $("<td class='next'>");
        var minutesdata = $("<td class='minutes'>");

        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var first = snapshot.val().first;

        var first_converted = moment(first, "HH:mm").subtract(1, "years");

        var diff = moment().diff(moment(first_converted), 'minutes');

        var minutes_remainder = diff % frequency;

        var minutes_away = frequency - minutes_remainder;

        var next = moment().add(minutes_away, 'minutes');

        var arrival = moment(next).format('hh:mm a');
        
        namedata.text(name);
        destinationdata.text(destination);
        frequencydata.text(frequency);
        arrivaldata.text(arrival);
        minutesdata.text(minutes_away);

        row.append(namedata, destinationdata, frequencydata, arrivaldata, minutesdata);

        $("#trains-table > tbody").append(row);
}



})



