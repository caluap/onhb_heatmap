var canvas;
let debug = true;
let margin = 0.0;
let points = [];

let min_x, max_x, min_y, max_y;

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
  data = loadJSON("data/processed_data.json");
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");

  let g = new GeoPoint();

  min_lat = g.deg2dec(south);
  max_lat = g.deg2dec(north);

  min_long = g.deg2dec(east);
  max_long = g.deg2dec(west);

  min_x = width * (1 - margin);
  max_x = width * margin;
  min_y = height * (1 - margin);
  max_y = height * margin;

  let radius_adj = 0.2;

  data.data.forEach(e => {
    let r = e.qtd * radius_adj;
    for (let i = 0; i < e.qtd; i++) {
      let rand_r = random() * r;
      let rand_a = random() * TWO_PI;
      let _x = sin(rand_a) * rand_r;
      let _y = cos(rand_a) * rand_r;
      let cx = map(e.long, min_long, max_long, min_x, max_x);
      let cy = map(e.lat, min_lat, max_lat, min_y, max_y);
      points.push(createVector(cx + _x, cy + _y));
    }
  });
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
