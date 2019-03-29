var canvas;
let debug = true;

function preload() {}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.class("canv");
}

function draw() {}

function saveThisMap() {
  saveCanvas(canvas, "img", "png");
}
