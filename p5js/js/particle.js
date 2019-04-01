class Particle {
  constructor(x, y, c = color(203, 7, 114)) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.col = c;
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
    this.acc.limit(acc_limit);

    this.vel.add(this.acc);

    let jit_r = jit;

    let jitter = createVector(
      random() * jit_r - jit_r / 2,
      random() * jit_r - jit_r / 2
    );
    this.vel.add(jitter);

    this.vel.limit(vel_limit);
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
      this.col.setAlpha(0.5 * 255);
    } else {
      let alpha = 1 - fc / frame_limit;
      this.col.setAlpha(alpha_range * alpha * 255 + alpha_range * 255);
    }
    let img_c = bg.get(this.pos.x, this.pos.y);
    // brazil on the map has this color: #000201
    if (img_c[0] == 0 && img_c[1] == 2 && img_c[2] == 1) {
      stroke(this.col);
      point(this.pos.x, this.pos.y);
    }
  }
}
