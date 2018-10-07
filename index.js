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


// intialize a udp server for headset 1
var headsetUDPServer1 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 1
    });
});

// intialize a udp server for headset 2
var headsetUDPServer2 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 2
    });
});

// intialize a udp server for headset 3
var headsetUDPServer3 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 3
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer4 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 4
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer5 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 5
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer6 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 6
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer7 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 7
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer8 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 8
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer9 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 9
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer10 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 10
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer11 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 11
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer12 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 12
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer13 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 13
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer14 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 14
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer15 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 15
    });
});

// intialize a udp server for each headset's osc messages
var headsetUDPServer16 = dgram.createSocket("udp4", function(msg,rinfo){
    var osc_msg;
    try{
        osc_msg = osc.fromBuffer(msg);
    } catch(err){
        return console.log("could not decode OSC message");
    }

    // emit osc message to websocket clients
    io.emit("osc",{
        "message": osc_msg,
        "headset": 16
    });
});

// have the http server listen on port 3000
http.listen(3000, function(){
   console.log("http listening on port 3000");
});

// have the udp servers for each room listen on their dedicated ports
    headsetUDPServer1.bind(4501);
    console.log("headset 1 listening on port 4501");
    headsetUDPServer2.bind(4502);
    console.log("headset 2 listening on port 4502");
    headsetUDPServer3.bind(4503);
    console.log("headset 3 listening on port 4503");
    headsetUDPServer4.bind(4504);
    console.log("headset 4 listening on port 4504");
    headsetUDPServer5.bind(4505);
    console.log("headset 5 listening on port 4505");
    headsetUDPServer6.bind(4506);
    console.log("headset 6 listening on port 4506");
    headsetUDPServer7.bind(4507);
    console.log("headset 7 listening on port 4507");
    headsetUDPServer8.bind(4508);
    console.log("headset 8 listening on port 4508");
    headsetUDPServer9.bind(4509);
    console.log("headset 9 listening on port 4509");
    headsetUDPServer10.bind(4510);
    console.log("headset 10 listening on port 4510");
    headsetUDPServer11.bind(4511);
    console.log("headset 11 listening on port 4511");
    headsetUDPServer12.bind(4512);
    console.log("headset 12 listening on port 4512");
    headsetUDPServer13.bind(4513);
    console.log("headset 13 listening on port 4513");
    headsetUDPServer14.bind(4514);
    console.log("headset 14 listening on port 4514");
    headsetUDPServer15.bind(4515);
    console.log("headset 15 listening on port 4515");
    headsetUDPServer16.bind(4516);
    console.log("headset 16 listening on port 4516");
