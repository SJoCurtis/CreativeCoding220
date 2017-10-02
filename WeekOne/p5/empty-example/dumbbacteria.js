function Particle(x, y) {
  this.pos = createVector(x, y);
  this.prev = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    stroke(255, 255);
    strokeWeight(5);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;

  }

  this.attracted = function(target) {
    var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var d = force.mag();
    d = constrain(d, 1, 25);
    var G = 60;
    var strength = G / (d * d);
    force.setMag(strength);
    if (d < 10) {
      force.mult(-20);
    }
    this.acc.add(force);
  }

}
