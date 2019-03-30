var canvas;
let debug = true;
let margin = 0.05;
let points = [];

let w = 1080;
let h = 1080;

let n_squares = 34;
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
}

function draw() {
  background(0);

  draw_squares();

  noLoop();
}

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
  noStroke();
  for (let ix = 0; ix < n_squares; ix++) {
    for (let iy = 0; iy < n_squares; iy++) {
      if (squares[ix][iy] > 0) {
        p = squares[ix][iy] / max_square;
        fill((p * 255 * 2) / 3 + (255 * 1) / 3, 0, 0);
        square(min_x + ix * square_size, min_y + iy * square_size, square_size);
      }
    }
  }
}

function saveThisMap() {
  saveCanvas(canvas, "img", "png");
}
