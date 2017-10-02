var attractors = [];
var particles = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
}
function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(7);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 95) {
    particles.splice(0, 1);
  }

  for (var i = 0; i < attractors.length; i++) {
    stroke(255,255,0);
    point(attractors[i].x, attractors[i].y);
  }
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    for (var j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
  }

}
