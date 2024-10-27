var currentScene = 1;
var timer = 0;

// sad circle 
var x = 400;

// girl circle
var girlX = 0;
var girlSpeed = 2;
// girl's movement
var isGirlStopped = false;
var girlWalksOff = false;

function setup() {
  // Centering the canvas -> code from p5.js reference
  var centered = createCanvas(800, 800);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  centered.position(x, y);
  background(0);

  // Scene changes based on time
  timer = millis();
}

function draw() {
  // Scene change counter
  if (millis() - timer > 5000) { // After 5 seconds
    currentScene++;
    timer = millis(); // Reset timer
    if (currentScene > 2) {  // Loop back to the first scene
      currentScene = 1;
    }
  }

  // Calling each scene change
  if (currentScene === 1) {
    scene1();
  } 
  else if (currentScene === 2) {
    scene2();
  }
}

function scene1() { 
  background(255, 0, 150);
  ellipseMode(CENTER);
  rectMode(CORNER); 

  // Grass
  fill(0, 255, 0); 
  rect(0, 700, 850, 200);

  // Static sad circle
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);

  // Check girl's location and move her towards the sad circle
  if (girlX < 600 && !isGirlStopped) {
    girlX += girlSpeed;
  } else {
    isGirlStopped = true;
  }

  // Girl circle
  fill(255, 0, 255);
  ellipse(girlX, 600, 200, 200);

  // After the girl stops, wait 2 seconds, then she starts walking off the screen
  if (isGirlStopped && millis() - timer > 2000) {
    girlWalksOff = true;
  }

  // Girl walks off the screen
  if (girlWalksOff) {
    girlX += girlSpeed;
  }
}

function scene2() {
  background(100, 100, 255);  // Blue background (different from scene 1)

  // Sad circle stays in place
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);

  // Girl continues walking off the screen
  fill(255, 0, 255);
  if (girlX < width + 200) {  // Check if the girl is off the screen
    girlX += girlSpeed;
  }
  ellipse(girlX, 600, 200, 200);
}