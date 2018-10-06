// initialize http server and socket.io instance
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

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

// port
http.listen(3000, function(){
   console.log("listening on :3000");
});
