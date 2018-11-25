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
        var row = $("<tr>");
        var namedata = $("<td>");
        var destinationdata = $("<td>");
        var frequencydata = $("<td>");
        var arrivaldata = $("<td>");
        var minutesdata = $("<td>");

        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var arrival = snapshot.val().arrival;
        var minutes = snapshot.val().minutes;

        namedata.text(name);
        destinationdata.text(destination);
        frequencydata.text(frequency);
        arrivaldata.text(arrival);
        minutesdata.text(minutes);

        row.append(namedata, destinationdata, frequencydata, arrivaldata, minutesdata);

        $("#trains-table > tbody").append(row);

    })
    
    setInterval(() => {
        
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


        var first_converted = moment(first, "HH:mm").subtract(1, "years");

        var diff = moment().diff(first_converted, 'minutes');
        
        var minutes_away = diff % frequency;

        var next = moment().add(minutes_away, 'minutes');

        var arrival = moment(next).format('hh:mm a');


        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            arrival: arrival,
            minutes: minutes_away

        })

    });

/*
    var randomDate = "02/23/1999";
    var randomFormat = "MM/DD/YYYY";
    console.log(randomDate);
    var convertedDate = moment(randomDate, randomFormat);

    randomDate = moment(randomDate, "MM/DD/YYYY");
    console.log(convertedDate.format("YYYY/DD/MM"));
    console.log(convertedDate.format("YYYY/MM/DD"));
    console.log(convertedDate.format("DD/MM/YYYY"));
    console.log(convertedDate.format("X"));

    console.log(convertedDate.toNow());
    console.log(moment().diff(convertedDate, "years"));
    console.log(moment().diff(convertedDate, "months"));
    console.log(moment().diff(convertedDate, "days"));

    var newDate = moment("02/14/2001", randomFormat);

    console.log(newDate.diff(convertedDate, "days"));
*/





})



