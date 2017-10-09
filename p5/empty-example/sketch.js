/* FREAKING AWESOME! */


var objs = [];

function setup() {
    createCanvas(windowWidth,windowHeight);
    background('black');

    objs.push(
        new Spiral( width/2, height/2, 10, 64, 'coun`ter', 'rgba(207, 52, 221, 0.69)' )
    );

    objs.push(
        new Spiral( width/2, height/2, 10, 64, 'clockwise', 'rgba(52, 221, 170, 0.69)' )
    );
}

function draw() {

    for (var i = 0; i < objs.length; i++) {
        objs[i].frame();
    }

}




function Spiral( x, y, diam, rot_delta, dir, color ) {
    this.pos = { r: 0, theta: 0 };
    this.loc = createVector(x, y);
    this.cart = createVector( 0, 0 );
    this.diam = diam;
    this.delta = rot_delta;
    this.dir = dir;
    this.color = color;
}

Spiral.prototype.frame = function(){
    this.update();
    this.display();
};


Spiral.prototype.update = function(){
    this.cart.x = this.pos.r * cos(this.pos.theta);
    this.cart.y = this.pos.r * sin(this.pos.theta);

    this.pos.r += (this.diam*2) / (this.delta*2);

    if (this.dir == 'clockwise') {
        this.pos.theta += PI/this.delta;
    } else {
        this.pos.theta -= PI/this.delta;
    }

};

Spiral.prototype.display = function(){
    push();

    translate(this.loc.x, this.loc.y);
    // line( 0, 0, cart_coor.x, cart_coor.y );
    noStroke();
    fill(this.color);
    ellipse( this.cart.x, this.cart.y, this.diam );

    pop();
};
