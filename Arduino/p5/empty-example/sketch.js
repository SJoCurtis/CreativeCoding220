//variables for ball
var x = 180;
var y = 180;
var xspeed = 9;
var yspeed = 10;
//variables for fractal tree
var angle = 0;
var slider;

function setup() {
createCanvas(windowWidth, windowHeight);
slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
background(0);
//background stars
fill(255);
    ellipse(random(0, width), random(10, height), 5, 5);
    fill(255,255,255);
    ellipse(random(0, width), random(0, height), 9, 9);
// Ball actions
var d = dist(windowWidth/2, windowHeight/2, mouseX, mouseY);
//Ball visuals
  	fill (0,0);
  	ellipse (x, y, d, d);

      x = x + xspeed;

  	 if (x > windowWidth || x < 0)  {
     	xspeed = -xspeed;
    }

    y = y + yspeed;

  	if (y > windowHeight || y < 0) {
	 	  yspeed = -yspeed;
  	}
//Fractal Tree Visuals
angle = slider.value();
stroke(255);
translate(450, height);
branch(200);

}
//New function for the tree logistics
function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.69);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.69);
    pop();
  }
}
