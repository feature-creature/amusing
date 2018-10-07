// ----------------------------------------
// ----------------------------------------
// VARIABLES
// ----------------------------------------
// ----------------------------------------

// ----------------------------------------
// initialize state variables
// ----------------------------------------

var wearing = 0;
var recording = 0;
var baselining = 0;
var start = 0;
var go = 0;

// ----------------------------------------
// initialize MUSE EEG data variables
// ----------------------------------------
var data;
var raw1= 0;
var raw2 = 0;
var raw3 = 0;
var raw4 = 0;
var raw5 = 0;
var rawTotal = 0;

var raw1Max = 0;
var raw2Max = 0;
var raw3Max = 0;
var raw4Max = 0;
var raw5Max = 0;
var rawTotalMax = 0;

var raw1Min = 0;
var raw2Min = 0;
var raw3Min = 0;
var raw4Min = 0;
var raw5Min = 0;

var normalizedRaw1 = 0;
var normalizedRaw2 = 0;
var normalizedRaw3 = 0;
var normalizedRaw4 = 0;
var normalizedRaw5 = 0;

var absolute1= 0;
var absolute2 = 0;
var absolute3 = 0;
var absolute4 = 0;
var absolute5 = 0;

var absolute1Min = 2;
var absolute2Min = 2;
var absolute3Min = 2;
var absolute4Min = 2;
var absolute5Min = 2;

var absolute1Max = -2;
var absolute2Max = -2;
var absolute3Max = -2;
var absolute4Max = -2;
var absolute5Max = -2;
var absoluteTotalMax = 0;

var normalizedAbsolute1= 0;
var normalizedAbsolute2 = 0;
var normalizedAbsolute3 = 0;
var normalizedAbsolute4 = 0;
var normalizedAbsolute5 = 0;

// --------------------------------------------
// initialize event variables
// ----------------------------------------
// jaw clench state
var jaw = 0;
// head XY tilt
var accelerationX = 0;
// battery state
var battery = 1;


// ----------------------------------------
// TODO - IMPORTANT 
// scaling values
// ----------------------------------------
var maxVal = 500;
var minVal = 1200;

// ----------------------------------------
// initialize color variables
// ----------------------------------------
var roomColor;
var roomColor0;
var roomColor1;


// ----------------------------------------
// ----------------------------------------
// HEADSET DATA EVENTS
// ----------------------------------------
// ----------------------------------------

socket.on(headset,function(msg){

    // global data variable
    data = msg.elements[0];

    // update raw data
    if(data.address == "/muse/eeg"){

        raw1 = data.args[0].value;
        raw2 = data.args[1].value;
        raw3 = data.args[2].value;
        raw4 = data.args[3].value;
        raw5 = data.args[4].value;

        // TODO
        // CREATE BASELINE MINIMUMS AND MAXIMUMS
        if(raw1 > raw1Max  && raw1 < 1400){ raw1Max = raw1;}
        if(raw1 < raw1Min && raw1 != 0){ raw1Min = raw1;}

        if(raw2 > raw2Max && raw2 < 1400){ raw2Max = raw2;}
        if(raw2 < raw2Min && raw2 != 0){ raw2Min = raw2;}

        if(raw3 > raw3Max && raw3 < 1400){ raw3Max = raw3;}
        if(raw3 < raw3Min && raw3 != 0){ raw3Min = raw3;}

        if(raw4 > raw4Max && raw4 < 1400){ raw4Max = raw4;}
        if(raw4 < raw4Min && raw4 != 0){ raw4Min = raw4;}

        if(raw5 > raw5Max && raw5 < 1400){ raw5Max = raw5;}
        if(raw5 < raw5Min && raw5 != 0){ raw5Min = raw5;}

        if(baselining == 1){
            rawTotalMax = (raw1Max + raw2Max + raw3Max + raw4Max + raw5Max)/5;
        }

        rawTotal = (raw1 + raw2 + raw3 + raw4 + raw5)/5;


        // TODO
        // if not recording, do not use data
        if(recording == 0){
            raw1Max = 0;
            raw2Max = 0;
            raw3Max = 0;
            raw4Max = 0;
            raw5Max = 0;

            absolute1Max = 0;
            absolute2Max = 0;
            absolute3Max = 0;
            absolute4Max = 0;
            absolute5Max = 0;
            absoluteTotalMax = 0;

        }

        // show values on screen
        $('#rawMax1').text(raw1Max);
        $('#rawMax2').text(raw2Max);
        $('#rawMax3').text(raw3Max);
        $('#rawMax4').text(raw4Max);
        $('#rawMax6').text(rawTotalMax);
        $('#rawTotal').text(rawTotal);


        // update normalized values
        normalizedRaw1 = normalizeRawEEGData(raw1);
        normalizedRaw2 = normalizeRawEEGData(raw2);
        normalizedRaw3 = normalizeRawEEGData(raw3);
        normalizedRaw4 = normalizeRawEEGData(raw4);
        normalizedRaw5 = normalizeRawEEGData(raw5);

    }


    // state: headband "wearing"
    if(data.address == "/muse/elements/touching_forehead"){
        wearing = data.args[0].value;
    }

    // event: jaw clench
    if(data.address == "/muse/elements/jaw_clench"){
        jaw = 15;
    }

    // event: head XY tilt
    if(data.address == "/muse/acc"){
        // TODO find best value
        if(data.args[0].value < -0.2){
          accelerationX = 5;
        }
    }

    // event: absolute data values
    if(data.address == "/muse/elements/delta_absolute"){
        absolute1 = data.args[0].value
        if(absolute1 > absolute1Max){ absolute1Max = absolute1;}
        if(absolute1 < absolute1Min && absolute1 != 0){ absolute1Min = absolute1;}
        normalizedAbsolute1 = normalizeAbsoluteData(absolute1, absolute1Max,absolute1Min);
    }

    if(data.address == "/muse/elements/theta_absolute"){
        absolute2 = data.args[0].value
        if(absolute2 > absolute2Max){ absolute2Max = absolute2;}
        if(absolute2 < absolute2Min && absolute2 != 0){ absolute2Min = absolute2;}
        normalizedAbsolute2 = normalizeAbsoluteData(absolute2,absolute2Max,absolute2Min);
    }

    if(data.address == "/muse/elements/alpha_absolute"){
        absolute3 = data.args[0].value
        if(absolute3 > absolute3Max){ absolute3Max = absolute3;}
        if(absolute3 < absolute3Min && absolute3 != 0){ absolute3Min = absolute3;}
        normalizedAbsolute3 = normalizeAbsoluteData(absolute3,absolute3Max,absolute3Min);
    }

    if(data.address == "/muse/elements/beta_absolute"){
        absolute4 = data.args[0].value
        if(absolute4 > absolute4Max){ absolute4Max = absolute4;}
        if(absolute4 < absolute4Min && absolute4 != 0){ absolute4Min = absolute4;}
        normalizedAbsolute4 = normalizeAbsoluteData(absolute4,absolute4Max,absolute4Min);
    }

    if(data.address == "/muse/elements/gamma_absolute"){
        absolute5 = data.args[0].value
        if(absolute5 > absolute5Max){ absolute5Max = absolute5;}
        if(absolute5 < absolute5Min && absolute5 != 0){ absolute5Min = absolute5;}
        normalizedAbsolute5 = normalizeAbsoluteData(absolute5,absolute5Max,absolute5Min);
    }

    absoluteTotalMax = (absolute1Max + absolute2Max + absolute3Max + absolute4Max) / 4;


    // TODO: move elsewhere?
    // show data max values on screen
    $('#dMax').text(absolute1Max);
    $('#tMax').text(absolute2Max);
    $('#aMax').text(absolute3Max);
    $('#gMax').text(absolute4Max);
    $('#bMax').text(absolute5Max);
    $('#avgMax').text(absoluteTotalMax);


    // UPDATE THE DISPLAY STATE VARIABLES
    if(wearing == 0){
        $('#not-wearing').show();
        $('#wearing').hide();
    }
    if(wearing == 1 && baselining == 0){
        $('#not-wearing').hide()
        $('#wearing').show()
    };
    if(baselining == 1){
        $('#baselining').show();
        $('#wearing').hide();
    }else{
        $('#baselining').hide();
    }
    if(baselining == 2){
        $('#eating').show();
    }else{
        $('#eating').hide();
    }
    if(recording == 2){
        $('#finished').show();
        $('#eating').hide();
    }else{
        $('#finished').hide();
    }


});



// ----------------------------------------
// Normalize data
// ----------------------------------------

function normalizeRawGiroData(rawData){
    if(rawData > 800 && rawData < 900){
        return map(rawData,800,900,1,0.25);
    }
    if(rawData > 0 && rawData < 1){
        return rawData;
    }
}

function normalizeRawEEGData(rawData){
    return map(rawData,minVal,maxVal,2,0.5);
}


function normalizeAbsoluteData(rawData,rawDataMax,rawDataMin){
        return map(rawData,rawDataMin,rawDataMax,1,0.25);
}


// ----------------------------------------
// SAVING / STORING CANVAS DATA
// ----------------------------------------

// encode to base64
function encodeVis(){

}


$('#save').on("click",function(){
    var dateName = new Date;
    saveCanvas(dateName.toDateString(),'png');
});


// ----------------------------------------
// TIMER
// ----------------------------------------

var t;
d3.select("#go").on("click", function(){
    if(go == 0){
        go = 1;
        baselining = 1;
        recording = 1;
        $("#go").text('reset');
        t = d3.timer(function(elapsed) {
            if(elapsed < 1 * 30000){
                $('#countdown').text(millisToMAndS((30 * 1000) - elapsed))
                if(elapsed > 1 * 10000){
                    baselining = 2;
                }
            }else{
                recording = 2;
                t.stop();
                $('#countdown').text("0:30")
            }
        });
    }else{
        go = 0;
        t.stop();
        $("#go").text('Analyse');
        $('#countdown').text("0:30")
        wearing = 0;
        recording = 0;
        baselining = 0;
        clear();
    }
});

function millisToMAndS(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// ----------------------------------------
// colors
// ----------------------------------------

$('#room1').click(function(){
    // Champagne: 185, 97, 236
    roomColor1 = color(185,97, 236, 125);
    roomColor = color(185,97, 236, 75);
    roomColor0 = color(185,97, 236,16);
});

$('#room2').click(function(){
    // Himulayan Salt: 236, 142, 109
    roomColor1 = color(236, 142, 109,125);
    roomColor = color(236, 142, 109,75);
    roomColor0 = color(236, 142, 109,65);
});

$('#room3').click(function(){
    // Mushroom: 97, 197, 144
    roomColor1 = color(97, 197, 144,125);
    roomColor = color(97, 197, 144,75);
    roomColor0 = color(97, 197, 144,65);
});

$('#room4').click(function(){
    // Cheescake: 232, 87, 76
    roomColor1 = color(232, 87, 76,125);
    roomColor = color(232, 87, 76,75);
    roomColor0 = color(232, 87, 76,65);
});

$('#room5').click(function(){
    // Thai: 98, 214, 224
    roomColor1 = color(98, 214, 224,125);
    roomColor = color(98, 214, 224,75);
    roomColor0 = color(98, 214, 224,65);
});

$('#room6').click(function(){
    // Coffee: 224, 159, 56
    roomColor1 = color(224, 159, 56,125);
    roomColor = color(224, 159, 56,75);
    roomColor0 = color(224, 159, 56,65);
});

// ----------------------------------------
// ----------------------------------------
// VISUALIZATION CODE
// ----------------------------------------
// ----------------------------------------


// ----------------------------------------
// framerates
// ----------------------------------------

var frameRotation = 3.25; // tablet
// -- testing --
// var frameRotation = 3.5; // tablet
// var frameRotation = 5; // desktop



function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    noStroke();

    // default Champagne
    roomColor1 = color(185,97, 236, 125);
    roomColor = color(185,97, 236, 75);
    roomColor0 = color(185,97, 236,16);
}

function draw() {
    
    // -----------------------------------------------
    // IDLE : HEADBAND OFF
    // -----------------------------------------------

    if(wearing == 0){
        start = 0;
        push();
        if(frameCount % 3 == 0){
            fill(255,50);
            rect(0,0,width,height);
        }

        // center on canvas
        translate(width/2,height/2);

        push();
        rotate(frameCount*2);
        translate(0,185);
        fill(roomColor);
        ellipse(0,0,15,5);
        pop();

        push();
        rotate(frameCount*2 + 15);
        translate(0,145);
        fill(roomColor);
        ellipse(0,0,15,5);
        pop();

        push();
        rotate(frameCount*2 + 30);
        translate(0,105);
        fill(roomColor);
        ellipse(0,0,15,5);
        pop();

        push();
        rotate(frameCount*2 + 55);
        translate(0,65);
        fill(roomColor);
        ellipse(0,0,15,5);
        pop();


        push();
        rotate(frameCount*2 + 120);
        translate(0,25);
        fill(roomColor);
        ellipse(0,0,15,5);
        pop();

        pop();
    }


    // -----------------------------------------------
    // NOT RECORDING, BUT HEADBAND ON
    // -----------------------------------------------

    if(wearing == 1 && recording == 0){

        start = 0;

        push();
        if(frameCount % 3 == 0){
            fill(255,50);
            rect(0,0,width,height);
        }

        // center on canvas
        translate(width/2,height/2);

        push();

        push();
        rotate(frameCount*2);
        translate(0,165 + normalizedRaw2*7);
        fill(roomColor);
        ellipse(0,0,15,5);
        pop();

        push();
        rotate(frameCount*2 + 15);
        translate(0,125 + normalizedRaw2*7);
        fill(roomColor);
        ellipse(0,0,15,5);
        rotate(-4*frameCount);
        fill(roomColor0);
        ellipse(5,0,5,5);
        pop();

        push();
        rotate(frameCount*2 + 30);
        translate(0,85 + normalizedRaw2*7);
        fill(roomColor);
        ellipse(0,0,15,5);
        rotate(-4*frameCount);
        fill(roomColor0);
        ellipse(5,0,5,5);
        pop();

        push();
        rotate(frameCount*2 + 55);
        translate(0,45 + normalizedRaw2*7);
        fill(roomColor);
        rotate(-2*frameCount);
        ellipse(0,0,15,5);
        rotate(-4*frameCount);
        fill(roomColor0);
        ellipse(5,0,5,5);
        pop();

        push();
        rotate(frameCount*2 + 120);
        translate(0,25);
        fill(roomColor);
        rotate(-4*frameCount);

        ellipse(0,0,15,5);
        rotate(-4*frameCount);
        ellipse(5,0,5,5);
        ellipse(-7,10,5,5);
        translate(0,normalizedRaw2*7);
        fill(roomColor0);
        ellipse(5,0,5,5);
        pop();

        pop();
    }


    // -----------------------------------------------
    // BASELINE : HEADBAND ON, TIMER ON, 10 SECOND EYES CLOSED MEDITATION
    // -----------------------------------------------

    if(wearing == 1 && baselining == 1){

        // clear idle visualisation
        if(start == 0){
            clear();
            start = 1;
        }

        push();

        // center on canvas
        translate(width/2,height/2);

        push();
        rotate(frameCount/frameRotation);
        translate(0, normalizedRaw1*(width/3) - 100);
        noStroke();
        fill(roomColor0);
        ellipse(random(-5,5),random(-5,5),2,2);
        ellipse(random(5),random(5),normalizedRaw1*2,normalizedRaw1*2);
        ellipse(0,0,1 + map(normalizedRaw1,0,1,0,3), 1 + map(normalizedRaw1,0,1,0,3));
        pop();

        push();
        rotate(frameCount/frameRotation);
        translate(0, normalizedAbsolute1*(width/2 -150));
        fill(normalizedAbsolute3*180);
        fill(roomColor0);
        ellipse(random(5),random(5),normalizedAbsolute3*2,normalizedAbsolute3*2);
        ellipse(random(5),random(5),normalizedAbsolute3*2,normalizedAbsolute3*2);
        ellipse(0,0,1 + map(normalizedRaw1,0,1,0,2), 1 + map(normalizedRaw1,0,1,0,2));
        pop();

        push();
        rotate(frameCount/frameRotation);
        translate(0, (normalizedAbsolute4)*(width/3) - 50);
        fill(roomColor0);
        ellipse(random(5),random(5),normalizedAbsolute4*2,normalizedAbsolute4*2);
        pop();

        push();
        rotate(frameCount/frameRotation);
        translate(0, normalizedAbsolute5*(width/2 -150));
        fill(normalizedAbsolute5*180);
        fill(roomColor0);
        ellipse(0,0,1 + map(normalizedAbsolute5,0,1,0,2), 1 + map(normalizedAbsolute5,0,1,0,2));
        pop();

        pop();
    }


    // -----------------------------------------------
    // TASTING : HEADBAND ON, TIMER ON, 20 SECOND ANALYSIS
    // -----------------------------------------------

    if(wearing == 1 && recording != 2 && recording != 0 && baselining != 1 && baselining != 0){


        push();
            
        // center on canvas
        translate(width/2,height/2);
        
        push();
        rotate(frameCount/frameRotation);
        translate(0, normalizedRaw1*(width/3) - 100);
        noStroke();
        fill(roomColor0);
        ellipse(random(-5,5),random(-5,5),2,2);
        ellipse(random(5),random(5),normalizedRaw1*2,normalizedRaw1*2);
        ellipse(0,0,1 + map(normalizedRaw1,0,1,0,3), 1 + map(normalizedRaw1,0,1,0,3));
        pop();

        push();
        rotate(frameCount/frameRotation);
        translate(0, normalizedAbsolute1*(width/2 -150));
        fill(normalizedAbsolute3*180);
        fill(roomColor0);
        ellipse(random(5),random(5),normalizedAbsolute3*2,normalizedAbsolute3*2);
        ellipse(random(5),random(5),normalizedAbsolute3*2,normalizedAbsolute3*2);
        pop();

        push();
        rotate(frameCount/frameRotation);
        translate(0, (normalizedAbsolute4)*(width/3) - 50);
        fill(roomColor0);
        ellipse(random(5),random(5),normalizedAbsolute4*2,normalizedAbsolute4*2);
        pop();

        push();
        rotate(frameCount/frameRotation);
        translate(0, normalizedAbsolute5*(width/2 -150));
        fill(normalizedAbsolute5*180);
        fill(roomColor0);
        ellipse(0,0,1 + map(normalizedRaw1,0,1,0,2), 1 + map(normalizedRaw1,0,1,0,2));
        ellipse(0,0,normalizedAbsolute5*3,normalizedAbsolute5*3);
        pop();


        if(  jaw > 0 || accelerationX > 0 || rawTotal > rawTotalMax){
            push();
            
            rotate(frameCount/frameRotation);
            translate(0, normalizedAbsolute1*(width/2) - 25);
            fill(roomColor);
            if(frameCount % 7 == 0){
                noStroke();
                for(var i = 0; i < map(normalizedRaw1,0,1,0,jaw*7);i++){
                    ellipse(0,0,random(1,4),random(1,4));
                    ellipse(random(random(-15),15),random(random(-150,5),0),random(3,7),random(3,7));
                    ellipse(random(random(-65),65),random(random(-85,-5),15),random(3,7),random(3,7));
                }
                for(var i = 0; i < map(normalizedRaw1,0,1,0,accelerationX*7);i++){
                    ellipse(0,0,random(1,4),random(1,4));
                    ellipse(random(random(-15),15),random(random(-150,5),0),random(3,7),random(3,7));
                    ellipse(random(random(-65),65),random(random(-85,-5),15),random(3,7),random(3,7));
                }
                for(var i = 0; i < map(normalizedRaw1,0,1,0,15);i++){
                    ellipse(0,0,random(1,4),random(1,4));
                    ellipse(random(random(-15),15),random(random(-150,5),0),random(3,7),random(3,7));
                    ellipse(random(random(-65),65),random(random(-85,-5),15),random(3,7),random(3,7));
                }

            rotate(frameCount/frameRotation);
            stroke(roomColor);
            var lineLength = random(21);
            noFill();
            curve((raw1/rawTotalMax)*25,random(20),20,random(-40,40),(rawTotal/rawTotalMax)*5,lineLength,(raw2/rawTotalMax)*25,0);
            curve((raw1/rawTotalMax)*50,random(40),20,random(-40,40),(rawTotal/rawTotalMax)*5,lineLength,(raw2/rawTotalMax)*50,0);
            line(20,40,(rawTotal/rawTotalMax)*5,lineLength);
            }

            pop();
        }

        pop();
    }

    if(accelerationX > 0){
        accelerationX = accelerationX - 1;
    }
    if(jaw > 0){
        jaw = jaw - 1;
    }
}
