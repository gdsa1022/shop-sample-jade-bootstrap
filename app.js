/**
 * Created by boyander on 11/10/16.
 */

var express = require('express');

var app = express();

// Configure jade to be our rendering engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Enable boostrap from npm as a served static directory
app.use("/libs",express.static('node_modules/bootstrap/dist'));

// Our CSS and JS files
app.use("/public",express.static('public'));

// Get random price in range min, max
function getRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}


// Use 500px API to get random pictures for our products
var API500px = require('500px');
var api500px = new API500px("YecP85RjzG08DN0MqvgFa0N780dNaDmJX6iTPbYp");
var pics = [];
api500px.photos.getPopular({'sort': 'created_at', 'rpp': '10','image_size':200},  function(error, results) {
    // Do something
    pics = results.photos.map(function(a){
        // Compose object to be used in show items template
        return {
            preu: getRandomPrice(100,1000),
            imatge: a.image_url
        };
    });
});

// Render frontpage
app.get('/', function (req, res) {
    res.render('portada',{
        message: "Welcome CM!",
        pics: pics
    });
});


// Server start
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});