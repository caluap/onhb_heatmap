var canvas;
let debug = true;
let margin = 0.1055555556;
let points = [];

let animation = true;

let bg;
let overlay;

let w = 1080;
let h = 1080;

let frame_limit = 200;
let phase_1 = true;
let jit = 3,
  acc_limit = 0.2,
  vel_limit = 1,
  alpha_range = 0.03;

let cps;

let particles = [];

let n_squares = 92;
let square_size;
// https://stackoverflow.com/a/46792350/888094
let squares = Array.from(Array(n_squares), _ => Array(n_squares).fill(0));
let max_square = -1;

let min_x, max_x, min_y, max_y;
let min_long, max_long, min_lat, max_lat;

// NORTE (ponto mais setentrional):
// Nascente do rio Ailã (extremo norte do estado de Roraima, fronteira com a Guiana)
// - Latitude: +05° 16'19"
// - Longitude: -60° 12'45"
let north = "5° 16' 19\"";

// SUL (ponto mais meridional):
// Arroio Chuí (extremo sul do estado do Rio Grande do Sul, fronteira com o Uruguai)
// - Latitude: -33° 45'07"
// - Longitude: -53° 23'50"
let south = "-33° 45' 07\"";

// LESTE (ponto mais oriental):
// Ponta do Seixas (Cabo Branco-Paraíba)
// - Latitude: -07° 09'18"
// - Longitude: -34° 47'34"
let east = "-34° 47' 34\"";

// OESTE (ponto mais ocidental):
// Nascente do rio Moa (extremo oeste do estado do Acre, fronteira com o Peru)
// - Latitude: -07° 32'09"
// - Longitude: -73° 59'26"
let west = "-73° 59' 26\"";

let data;

function preload() {
  let g = new GeoPoint();

  max_lat = g.deg2dec(north);
  min_lat = g.deg2dec(south);

  max_long = g.deg2dec(east);
  // min_long = g.deg2dec(west);
  min_long = -72.6762232; // (there seems to be a bug in GeoPoint!)

  min_x = w * margin;
  max_x = w * (1 - margin);
  min_y = h * margin;
  max_y = h * (1 - margin);

  bg = loadImage("assets/brazzz.png");
  overlay = loadImage("assets/overlay.png");

  data = loadJSON("data/processed_data.json");
}

function coord(long, lat) {
  let cx = map(long, min_long, max_long, min_x, max_x);
  let cy = map(lat, max_lat, min_lat, min_y, max_y);
  return createVector(cx, cy);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.class("canv");

  cps = coord(-47.073845, -22.9329252);

  prepare_particles();
  image(bg, 0, 0);
}

function draw() {
  particles.forEach(e => {
    e.update(cps);
    e.draw(frameCount);
  });
  if (frameCount == frame_limit && phase_1) {
    console.log("finished phase 1");
    phase_1 = false;
    frame_limit = 1200;
    jit = 0.01;
    acc_limit = 0.4;
    vel_limit = 1;
    particles.length = 0;
    prepare_particles(color(237, 3, 124));
  }
  if (frameCount == frame_limit && !phase_1) {
    console.log("finished phase 2");
    noLoop();
  }
  if (animation) {
    image(overlay, 0, 0);
  }
}

function prepare_particles(col = null) {
  data.data.forEach(e => {
    let c = coord(e.long, e.lat);
    // let q = e.qtd / 50 + 1;
    // let q = Math.log(e.qtd) * 3;
    let q = e.qtd;
    for (let i = 0; i < q; i++) {
      if (col) {
        particles.push(new Particle(c.x, c.y, col));
      } else {
        particles.push(new Particle(c.x, c.y));
      }
    }
  });
}

function draw_particles() {}

function prepare_points() {
  data.data.forEach(e => {
    let r = e.qtd;
    let c = coord(e.long, e.lat);
    points.push({
      r: r,
      p: createVector(c.x, c.y)
    });
  });
}

function draw_points() {
  if (points.length == 0) {
    prepare_points();
  }

  noStroke();
  points.forEach(e => {
    let g = (e.r / 1203) * 128 + 128;
    fill(0, 0, 255, g);
    let r = 2 + e.r * 0.05;
    circle(e.p.x, e.p.y, r);
  });
}

function prepare_squares() {
  square_size = (max_x - min_x) / n_squares;

  data.data.forEach(e => {
    c = coord(e.long, e.lat);
    ix = Math.floor((c.x - min_x) / square_size);
    iy = Math.floor((c.y - min_y) / square_size);
    if (debug && (ix >= n_squares || iy >= n_squares || ix < 0 || iy < 0)) {
      console.log(e.cidade);
      console.log(c);
      console.log(ix + "," + iy);
    }
    squares[ix][iy] += parseInt(e.qtd);
    if (squares[ix][iy] > max_square) {
      max_square = squares[ix][iy];
    }
  });
}

function draw_squares() {
  if (max_square < 0) {
    prepare_squares();
  }
  rotateX(TWO_PI / 7);
  translate(-width / 2, -height / 2);

  // noStroke();
  let max_height = 18 * square_size;
  for (let ix = 0; ix < n_squares; ix++) {
    for (let iy = 0; iy < n_squares; iy++) {
      if (squares[ix][iy] > 0) {
        p = squares[ix][iy] / max_square;
        fill(p * 255, 128, 64);
        let z = p * max_height;
        translate(0, 0, z / 2);
        box(square_size, square_size, z);
        translate(0, 0, -z / 2);
      }
      translate(0, square_size);
    }
    translate(square_size, -square_size * n_squares);
  }
}

function saveThisMap() {
  saveCanvas(canvas, "img", "png");
}
