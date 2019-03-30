class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.red = random() * 255;
  }
  update(where_to) {
    let distance = p5.Vector.dist(where_to, this.pos);
    let direction = p5.Vector.sub(where_to, this.pos);

    let d = false;
    if (random() > 0.999 && false) {
      d = true;
    }

    if (d) {
      console.log("init");
      console.log("dist " + distance);
      console.log("direction " + direction);
      console.log("pos " + this.pos);
      console.log("vel " + this.vel);
      console.log("acc " + this.acc);
      console.log("cps " + where_to);
    }

    let alpha = map(distance, 0, 1080, 0, 128, true);

    this.col = color(this.red, 128, 128, alpha);

    if (distance > 0) {
      direction.div(distance);
    }
    this.acc.add(direction);
    this.acc.limit(0.2);

    this.vel.add(this.acc);

    let jit_r = 2;

    let jitter = createVector(
      random() * jit_r - jit_r / 2,
      random() * jit_r - jit_r / 2
    );
    this.vel.add(jitter);

    this.vel.limit(1);
    this.pos.add(this.vel);

    if (d) {
      console.log("finit");
      console.log("pos " + this.pos);
      console.log("vel " + this.vel);
      console.log("acc " + this.acc);
    }
  }
  draw() {
    stroke(this.col);
    point(this.pos.x, this.pos.y);
  }
}
