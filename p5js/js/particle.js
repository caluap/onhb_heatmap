class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.col = color(203, 7, 114);
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

    if (distance > 0) {
      direction.div(distance);
    }
    this.acc.add(direction);
    this.acc.limit(0.1);

    this.vel.add(this.acc);

    let jit_r = 3;

    let jitter = createVector(
      random() * jit_r - jit_r / 2,
      random() * jit_r - jit_r / 2
    );
    this.vel.add(jitter);

    this.vel.limit(1.5);
    this.pos.add(this.vel);

    if (d) {
      console.log("finit");
      console.log("pos " + this.pos);
      console.log("vel " + this.vel);
      console.log("acc " + this.acc);
    }
  }
  draw(fc) {
    if (fc == 1) {
      this.col.setAlpha(0.8 * 255);
    } else {
      let alpha = 1 - fc / frame_limit;
      this.col.setAlpha(0.03 * alpha * 255 + 0.03 * 255);
    }
    stroke(this.col);
    point(this.pos.x, this.pos.y);
  }
}
