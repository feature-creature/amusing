// initialize http server and socket.io instance
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var osc = require("osc-min");
var dgram = require("dgram");


// have the http server listen on port 3000
http.listen(3000, function(){
   console.log("http listening on port 3000");
});

// create route handler for home
app.use("/", express.static(__dirname + "/public"));
