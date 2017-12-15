var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var apiKey = "";

var d = { distance: "", duration: "" };

app.get("/", function (req, res) {

    res.render("landing");
});

app.get("/landing", function (req, res) {
    
    res.render("landing", {d: d });
});

app.post("/results", function (req, res) {
    var starting = "origin=" + req.body.starting;
    var ending = "destination=" + req.body.destination;
    var googleMaps = "https://maps.googleapis.com/maps/api/directions/json?";
    var key = "key=" + apiKey;
    var query =  googleMaps + starting + "&" + ending + "&" + key;
    console.log("Query :" + query);
    request(query, function (error, response, body) {
        if (error) {
            console.log("something went wrong!");
            console.log(error);
        }
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body);
            d.distance  = results.routes[0].legs[0].distance.text;
            d.duration = results.routes[0].legs[0].duration.text;
            var dateDistance = {distance: dis, duration: dur};
            res.render("landing" , {d: d });
        }
    });

});


app.listen(3000, function () {
    console.log("GridKey Server has started");
});