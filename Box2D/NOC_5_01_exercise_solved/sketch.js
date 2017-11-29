// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A reference to our box2d world
var world;

// A list for all of our boxes
var boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);//changed

  // Initialize box2d physics and create the world
  world = createWorld(new box2d.b2Vec2(0,10));
  // world.SetGravity(new box2d.b2Vec2(0,-20));

}

function draw() {
  background(0);//changed

  // We must always step through time!
  var timeStep = 2.0/frameRate();//changed:faster
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,20,20);//changed

  // Boxes fall from the top every so often
  if (mouseIsPressed) {
    var b = new Box(mouseX,mouseY);
    boxes.push(b);
  }
  // Display all the boxes
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}
