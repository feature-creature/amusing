// initialize http server and socket.io instance
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var osc = require("osc-min");
var dgram = require("dgram");


// create route handler for home
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// listen for incoming sockets on the http server
io.on("connection", function(socket){
    console.log("a user connected");

    // client-side - socket disconnect
    socket.on("disconnect",function(){
        console.log("user disconnected");
    });
});


// intialize upd server for osc messages
var udp_server = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",osc_msg);

});


// have the http server listen on port 3000
http.listen(3000, function(){
   console.log("http listening on :3000");
});

// have the udp server listen on port 4500
udp_server.bind(4500);
console.log("udp listening on :4500");
