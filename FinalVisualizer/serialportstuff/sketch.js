//variables for ball
var x = 180;
var y = 180;
var xspeed = 6;
var yspeed = 8;
//variables for fractal tree
var angle = 0;
// variables to hold an instance of the serialport library
var serial;
var portName = '/dev/cu.usbmodem1441'; // fill in your serial port name here
var inData1;
var inData2;
var inData3;
var inData4;
// for incoming serial data
let sensors;


function setup() {
    createCanvas(screen.width, screen.height);
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function draw() {
  background(0);
  //background stars
  fill(255);
  if (inData4 > 60) {
      ellipse(random(0, width), random(10, height), 4, 4);
      fill(255,255,255);
      ellipse(random(0, width), random(0, height), 8, 8);
    }

  // Ball actions
  //var d = dist(windowWidth/2, windowHeight/2, mouseX, mouseY);
  //Ball visuals
    	fill (0,0);
    	ellipse (x, y, 300-inData1);

        x = x + xspeed;

    	 if (x > windowWidth || x < 0)  {
       	xspeed = -xspeed;
      }

      y = y + yspeed;

    	if (y > windowHeight || y < 0) {
  	 	  yspeed = -yspeed;
    	}
      //Fractal Tree Visuals
      angle = inData3;
      stroke(255);
      translate(550, height);
      branch(200);

      }
      //New function for the tree logistics
      function branch(len) {
        line(0, 0, 0, -len);
        translate(0, -len);
        if (len > 4) {
          push();
          stroke(255-inData2);
          rotate(angle);
          branch(len * 0.69);
          pop();
          push();
          rotate(-angle);
          branch(len * 0.69);
          pop();
        }
}

// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        console.log(i + " " + portList[i]);
    }
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.');
}

function serialEvent() {
    // read a string from the serial port:
    var tempString = serial.readLine();
    // check to see that there's actually a string there:
    if (tempString.length > 0) {
        sensors = tempString.split(',');
        for (let i = 0; i < sensors.length; i++){
            sensors[i] = Number(sensors[i]);
             console.log(sensors[i]);
        }
        inData1 = sensors[0];
        inData2 = sensors[1];
        inData3 = sensors[2];
        inData4 = sensors[3];

    }

}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}
