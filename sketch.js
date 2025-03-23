let canvas;
let offset = 17;


let nodes = [];
const nodeCount = 150;
const connectionDistance = 250;
const baseColor = [3, 169, 244];

function windowResized() {
  resizeCanvas(windowWidth-offset, windowHeight);
  let nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node(random(width), random(height)));
  }
}

function setup() {
  canvas = createCanvas(windowWidth-offset, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(0);
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node(random(width), random(height)));
  }
}

function draw() {
  background(0, 20, 30); // Dark blue background
 
  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < connectionDistance) {
        let alpha = map(d, 0, connectionDistance, 200, 0);
        stroke(baseColor[0], baseColor[1], baseColor[2], alpha);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }
 
  // Update and display nodes
  for (let node of nodes) {
    node.update();
    node.display();
  }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
  }
 
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
   
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
  }
 
  display() {
    noStroke();
   
    // Create gradient for glow effect
    let gradient = drawingContext.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 1.5
    );
    gradient.addColorStop(0, color(baseColor[0], baseColor[1], baseColor[2], 215));
    gradient.addColorStop(1, color(baseColor[0], baseColor[1], baseColor[2], 0));
   
    drawingContext.fillStyle = gradient;
    ellipse(this.x, this.y, this.radius * 4);

  }
}
