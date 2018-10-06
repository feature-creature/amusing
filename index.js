// initialize http server
var app = require("express")();
var http = require("http").Server(app);

// create route handler for home
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// port
http.listen(3000, function(){
   console.log("listening on :3000");
});
