let table, totalRows;
let flowers, charCounts, cols, thisCol;
let grow = 0;
let touch = false;
var bigFlowerX, bigFlowerY;
let angle = 0;
var canvasDiv;

function preload() {
  table = loadTable("MODULE-5-FLOWERS-PARSED-2.csv", "csv", "header");
}

function setup() {
  
  canvasDiv = document.getElementById('mySketch');
  let canvas = createCanvas(canvasDiv.offsetWidth, windowHeight/1.8);
  canvas.parent('mySketch');
  
  totalRows = table.getRowCount();
  cols = table.getString(0, "COLOUR");
  thisCol = cols;
  colorCount = 0;
}

function draw() {
  background(230);
  fill(220);
  // textAlign(CENTER);
  // textSize(36);
  textFont("New Kansas");
  // text("What flowers bloom in Winter?", width / 2, 50);

  let base = height / 1.03;
  let xPos = 0;
  let yPos = base;

  for (let i = 0; i < totalRows; i++) {
    flowers = table.getString(i, "FLOWER");
    charCounts = table.getString(i, "characterCount");
    cols = table.getString(i, "COLOUR");

    noStroke();

    if (thisCol != cols) {
      xPos += width / 9;
      fill(cols);
      bigFlowerX = xPos;
      grow = 0;
      thisCol = cols;
    }

    grow += 15;
    yPos = base - grow;
    ellipse(xPos, yPos, 9);
    bigFlowerY = yPos;
    if (dist(mouseX, mouseY, xPos, yPos) < 5) {
      push();
      Flower(bigFlowerX, bigFlowerY, charCounts, cols);
      fill(30);
      textSize(15);
      text(flowers, mouseX + 30, mouseY + 25);
      pop();
    }
  }
}

function Flower(flowerX, flowerY, size, col) {
  push();
  stroke(col);
  strokeWeight(2);
  translate(flowerX, flowerY);
  rotate(angle);

  beginShape(POINTS);
  for (let a = 0; a < 360; a++) {
    let r = size*3 * sin(a * 6);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape();
  angle = angle + 0.005;
  pop();
}

function windowResized() {
  resizeCanvas(canvasDiv.offsetWidth, windowHeight/1.8);
}