var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var apiKey = 


app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
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
            console.log("You reading this?");
            console.log(results);

            res.send(results);

        }
        else{
            console.log("nothing happening");
        }
    });

});


app.listen(3000, function () {
    console.log("Yelp Camp Server has started");
});