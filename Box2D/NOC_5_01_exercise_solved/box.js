// A rectangular box

function Box(x, y) {
  this.w = 20;//changed larger
  this.h = 250;//changed larger

   // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd.shape = new box2d.b2PolygonShape();
  fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

  // Some physics
  fd.density = 2.0;
  fd.friction = 20;
  fd.restitution = 200;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Drawing the box
  this.display = function() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x,pos.y);
    rotate(a);
    fill(255,0,0);
    stroke(0);
    strokeWeight(2);
    rect(20,2,220, this.w, this.h);
    pop();
  };
}
