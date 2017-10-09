var a = 0;
var r = 50;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(20);
}
function draw() {
  noFill();

  var x = r * cos(a);
  var y = r * sin(a);

  a += 0.4;
  r += 0.4;

  push();
  translate(width / 2, height / 2);
  strokeWeight(4);
  stroke(r%255);
  ellipse(x, y, 40, 40);
  pop();

}
