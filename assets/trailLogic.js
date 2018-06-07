$(document).ready(function () {

});

var longtitude;
var latitude;
var inputRadius;
var inputResults;


function zipCode() {
    event.preventDefault();
    var inputZip = $(".zip-input").val().trim();

    // console.log(inputZip);
    // console.log(inputRadius);

    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + inputZip + "&key=" + APIKeys.google



    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        latitude = response.results[0].geometry.location.lat;
        longitude = response.results[0].geometry.location.lng;
        console.log("lattitude: " + response.results[0].geometry.location.lat);
        console.log("longitude: " + response.results[0].geometry.location.lng);
        console.log("location: " + response.results[0].formatted_address);
        trailTest();
    })
};

function trailTest() {
    //clear div
    //event.preventDefault();
    inputRadius = $(".radius-input").val().trim();
    if (inputRadius === "") {
        inpurRadius = 10;
    }
    inputResults = $(".results-input").val().trim();
    if (inputResults === "") {
        inputResults = 10;
    }

    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=" + inputRadius + "&maxResults=" + inputResults + "&key=" + APIKeys.hiking

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.trails.length);
        console.log("longitude: " + longitude);
        console.log("latitude: " + latitude);

        var trailName = "";
        var trailLocation = "";
        var trailAscent = "";
        var trailStars = "";
        var trailDifficulty = "";
        $(".trail-results").empty();
        for (i = 0; i < response.trails.length; i++) {
            trailName = response.trails[i].name;
            trailLocation = response.trails[i].location;
            trailAscent = response.trails[i].length;
            trailStars = response.trails[i].stars;
            trailDifficulty = response.trails[i].difficulty;
            $(".trail-results").append("<tr><td>" + trailName + "</td><td>" + trailLocation + "</td><td>" + trailAscent + "</td><td>" + trailAscent + "</td><td>" + trailStars + "</td><td>" + trailDifficulty + "</td><td>" + "</td></tr>");
        };

    })
};

//display giphy for existing buttons
$(document).on("click", ".search", zipCode);

