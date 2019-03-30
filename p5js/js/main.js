var canvas;
let debug = true;
let margin = 0.05;
let n = 14000;
let points = [];

// NORTE (ponto mais setentrional):
// Nascente do rio Ailã (extremo norte do estado de Roraima, fronteira com a Guiana)
// - Latitude: +05° 16'19"
// - Longitude: -60° 12'45"
let min_y = "5° 16' 19\"";

// SUL (ponto mais meridional):
// Arroio Chuí (extremo sul do estado do Rio Grande do Sul, fronteira com o Uruguai)
// - Latitude: -33° 45'07"
// - Longitude: -53° 23'50"
let max_y = "-33° 45' 07\"";

// LESTE (ponto mais oriental):
// Ponta do Seixas (Cabo Branco-Paraíba)
// - Latitude: -07° 09'18"
// - Longitude: -34° 47'34"
let max_x = "-34° 47' 34\"";

// OESTE (ponto mais ocidental):
// Nascente do rio Moa (extremo oeste do estado do Acre, fronteira com o Peru)
// - Latitude: -07° 32'09"
// - Longitude: -73° 59'26"
let min_x = "-73° 59' 26\"";

function preload() {}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");

  let g = new GeoPoint();

  min_y = g.deg2dec(min_y);
  max_y = g.deg2dec(max_y);

  min_x = g.deg2dec(min_x);
  max_x = g.deg2dec(max_x);

  let x0 = width * (1 - margin);
  let x1 = width * margin;
  let y0 = height * (1 - margin);
  let y1 = height * margin;

  for (let i = 0; i < n; i++) {
    let x = map(random(), 0, 1, x0, x1);
    let y = map(random(), 0, 1, y0, y1);
    points.push(createVector(x, y));
  }
}

function draw() {
  background(0);
  stroke(255);
  points.forEach(e => {
    point(e.x, e.y);
  });
}

function saveThisMap() {
  saveCanvas(canvas, "img", "png");
}
