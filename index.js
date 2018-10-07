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


// intialize headset 1 upd server for osc messages
var udp_server_headset_1 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
       "message": osc_msg,
       "headset":"1"
    });
});

// intialize headset 2 upd server for osc messages
var udp_server_headset_2 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
       "message": osc_msg,
       "headset":"2"
    });
});

// intialize headset 3 upd server for osc messages
var udp_server_headset_3 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
       "message": osc_msg,
       "headset":"3"
    });
});


// have the http server listen on port 3000
http.listen(3000, function(){
   console.log("http listening on :3000");
});

// have the udp servers for each room listen on their dedicated ports
udp_server_headset_1.bind(4501);
udp_server_headset_2.bind(4502);
udp_server_headset_3.bind(4503);

console.log("room 1 listening on :4501");
console.log("room 2 listening on :4502");
console.log("room 2 listening on :4503");
