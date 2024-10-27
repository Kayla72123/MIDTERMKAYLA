//  TESTING HOW TO DO PUSHES 


var currentScene = 1;
var timer = 0;

// sad circle 
var speed = 5;
var x = 400

//girl circle
var hisX = 199;

function setup() {

  //centering the canvas -> code from p5.js reference
  var centered = createCanvas(800, 800);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  centered.position(x, y);
  background(0);
}

function draw() {
  background(255, 0, 150);
  ellipseMode(CENTER);
  rectMode(CORNER); 

  //grass 
  fill(0,255,0); 
  rect(0, 700, 850, 200);

  //sad circle
  fill(0,0,255);
  ellipse(x, 600, 200, 200);

  // girl circle
  fill(255,0,255);
  ellipse(hisX, 600, 200, 200);

  //scene change counter
  if (millis() - timer > 5000) { // After 5 seconds
    currentScene++;
    timer = millis(); // Reset timer
  if (currentScene > 2) {  // Loop back to first scene
      currentScene = 0;
    }
  }

  calling each scene change
  if (currentScene === 0) {
    sceneOne();
  } 
  else if (currentScene === 1) {
    sceneTwo();
  } 
  else if (currentScene === 2) {
    sceneThree();
  }
}


//testing circle movement
  /*x += speed;  
  if (x > width + 200) {  
    x = -100;  
  }
  ellipse(x, 600, 200, 200);
}*/