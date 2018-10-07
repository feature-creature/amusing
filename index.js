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


// intialize a udp server for each headset's osc messages
var numOfHeadsets = 16;
var headsetUDPServers = [];

for(var i = 0; i < numOfHeadsets; i++){
    headsetUDPServers[i] = dgram.createSocket("udp4", function(msg,rinfo){
        var osc_msg;
        var headsetNum = i;
        try{
            osc_msg = osc.fromBuffer(msg);
        } catch(err){
            return console.log("could not decode OSC message");
        }

        // emit osc message to websocket clients
        io.emit("osc",{
            "message": osc_msg,
            "headset": headsetNum
        });
    });

}

// have the http server listen on port 3000
http.listen(3000, function(){
   console.log("http listening on port 3000");
});

// have the udp servers for each room listen on their dedicated ports
for(var i = 0; i < numOfHeadsets; i++){
    var portNum = 4500+i;
    headsetUDPServers[i].bind(portNum);
    console.log("headset " + i + " listening on port "+ portNum);
}
