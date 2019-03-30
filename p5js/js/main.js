var canvas;
let debug = true;

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
  console.log(g.deg2dec(min_y));
}

function draw() {}

function saveThisMap() {
  saveCanvas(canvas, "img", "png");
}
