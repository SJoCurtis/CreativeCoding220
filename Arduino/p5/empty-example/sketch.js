import processing.serial.*;

Serial myPort;
final var linefeed = 10;

//maximum number of sensors to display
final var maxSensors = 6;

//raw analog input values from controller
var raw[];
var rawMin[];
var rawMax[];
var max = 15; // max createCanvas of each dot
var row;
var column;

//values scaled to fit screen
var scaledVal[];
var scaledMin[];
var scaledMax[];
var prevScaledVal[];

//min/max values of analog input from controller
final var minAnalogVal = 0;
final var maxAnalogVal = 1024;

//colors used to draw sensor graphs
color colors[];

var xCursor = 0;

//length of each line segment in graph, 1=1 pixel
final var plotLineLength = 1;

PFont myFont;
final var fontSize = 12;

final var drawDelay = 10;

var madeContact = false;


function setup() {

  myPort = new Serial(this, Serial.list()[0], 9600);
  myPort.bufferUntil(linefeed);

  //initialize raw vars
  raw = new Array(maxSensors);
  rawMin = new Array(maxSensors);
  for (var i = 0; i<rawMin.length; i++) {
    rawMin[i] = 2147483647;
  }
  rawMax = new Array(maxSensors);

  //initialize scaled vars
  scaledVal = new Array(maxSensors);
  scaledMin = new Array(maxSensors);
  for (var i = 0; i<scaledMin.length; i++) {
    scaledMin[i] = 2147483647 ;
  }
  scaledMax = new Array(maxSensors);

  prevScaledVal = new Array(maxSensors);

  //set colors used for each sensor display
  colors = new color[maxSensors];
  colors[0] = color(255, 0, 0); //red
  colors[1] = color(0, 255, 0); //green
  colors[2] = color(0, 0, 255); //blue
  colors[3] = color(255, 255, 0); //yellow
  colors[4] = color(0, 255, 255); //teal
  colors[5] = color(255, 0, 255); //purple

  createCanvas(windowWidth , windowHeight);
  background(255);
}

function draw() {

  background(0);

  if(madeContact==false) {
    //start handshake w/controller
    myPort.write('\r');
  } else {

    for (var i = 0; i < scaledVal.length; i++) {

      fill(colors[i]);     // make each circle a different color
      if (i < 3){          // places each circle
        row = 1;
        column = i+1;
      }
      else{
        row = 2;
        column = i-2;
      }

      //Draws each circle
      ellipse(column*displayWidth/4, row*displayHeight/3, max*abs(scaledVal[i]), max*abs(scaledVal[i]));
      prevScaledVal[i] = scaledVal[i];
    }



    delay(drawDelay);
  }
}


function serialEvent(Serial myPort) {

  madeContact = true;

  var rawInput = myPort.readvarUntil(linefeed);

  if (rawInput != null) {
    rawInput = trim(rawInput);

    var sensors[] = var(split(rawInput, ','));

    //prvar("raw: ");
    //read in raw sensor values
    for (var i=0; i<sensors.length; i++) {
        raw[i] = sensors[i];
        rawMin[i] = min(rawMin[i], raw[i]);
        rawMax[i] = max(rawMax[i], raw[i]);
    }
    prvarln();

    for (var i=0; i<sensors.length; i++) {
      scaledVal[i] = max * (raw[i] - minAnalogVal) / maxAnalogVal;
      scaledMin[i] = max * (rawMin[i] - minAnalogVal) / maxAnalogVal;
      scaledMax[i] = max * (rawMax[i] - minAnalogVal) / maxAnalogVal;
    }

  }

  //request more data from controller
  myPort.write('\r');
}
