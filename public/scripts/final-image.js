var userName;
var userEmail;
var userID;
var url = new URL(window.location.href);
var noName;
var yesName;
var viz;

var room1;
var room2;
var room3;
var room4;
var room5;
var room6;

var imageData = 0;
var room1Data;
var room2Data;
var room3Data;
var room4Data;
var room5Data;
var room6Data;

var tesco;

// room number
userID = url.searchParams.get("userID");
userID == null ? userID = "000" : userID = userID;
console.log(userID)

function preload() {
  tesco = loadFont('./fonts/TESCO/TESCOSerif-Semibold.otf');
    $.ajax({
        type:"GET",
        url:"http://10.0.0.1:6001/api/devour/getUserByID?key=" + userID,
        data:{},
        success:function(body){

            userName = body.rows[0].value.userName;
            userEmail = body.rows[0].value.userEmail;
            console.log(userName);
            console.log(userEmail);
            
            if("room1" in body.rows[0].value.data){
                console.log("room1");
                room1Data = body.rows[0].value.data.room1;
            }else{
                room1Data = "";
            }
            if("room2" in body.rows[0].value.data){
                console.log("room2");
                room2Data = body.rows[0].value.data.room2;
            }else{
                room2Data = "";
            }
            if("room3" in body.rows[0].value.data){
                console.log("room3");
                room3Data = body.rows[0].value.data.room3;
            }else{
                room3Data = "";
            }
            if("room4" in body.rows[0].value.data){
                console.log("room4");
                room4Data = body.rows[0].value.data.room4;
            }else{
                room4Data = "";
            }
            if("room5" in body.rows[0].value.data){
                console.log("room5");
                room5Data = body.rows[0].value.data.room5;
            }else{
                room5Data = "";
            }
            if("room6" in body.rows[0].value.data){
                console.log("room6");
                room6Data = body.rows[0].value.data.room6;
            }else{
                room6Data = "";
            }
            
            imageData = 1;
        },
        error: function(){
            userName = "no name";
            console.log("error error");
        },
        dataType:""
    })
}





function setup() {
    viz = createCanvas(1181, 1748);
    // viz = createCanvas(400, 592);
    viz.parent('canvas-container');
    textFont(tesco);

    noName = loadImage("./assets/test-print-big-no-joe.png");    
    room1 = loadImage("")
    room2 = loadImage("")
    room3 = loadImage("")
    room4 = loadImage("")
    room5 = loadImage("")
    room6 = loadImage("")

}

function draw() {
    image(noName,0,0);
    image(room1,150,200,900,900);
    image(room2,150,200,900,900);
    image(room3,150,200,900,900);
    image(room5,150,200,900,900);
    image(room6,150,200,900,900);
    image(room4,150,200,900,900);

    // image(yesName,0,0);
    textSize(60);
    text(userName, 40, 1590);

    if(imageData == 1){
        imageData = 2;

        room1 = loadImage(room1Data);
        room2 = loadImage(room2Data);
        room3 = loadImage(room3Data);
        room4 = loadImage(room4Data);
        room5 = loadImage(room5Data);
        room6 = loadImage(room6Data);
        
    }
}



function keyPressed() {
  if (keyCode === 13) {
    console.log("save image");
    saveCanvas(userID+"-"+userName,"jpg");
  }
}

