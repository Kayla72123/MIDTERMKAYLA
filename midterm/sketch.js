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

//bkg colors
var bkgColor = [255, 0, 150]; 
var redColor = [173, 19, 19]; 
var blueColor = [100, 100, 255]; 
var fadeSpeed = 50;
var isFadingToBlue = false;

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
  if (millis() - timer > 10000) { // After 5 seconds
    currentScene++;
    timer = millis(); // Reset timer
    if (currentScene > 2) {  // Loop back to the first scene
      currentScene = 1;
      resetScene();
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

function resetScene() {
  // Reset girl circle position and state
  girlX = 0;           // Start position off-screen
  isGirlStopped = false; // Reset stop state
  girlWalksOff = false;  // Reset walk-off state
  isFadingToBlue = false;
  bkgColor = [255, 0, 150];
  
}


function scene1() { 

  background(bkgColor);

  ellipseMode(CENTER);
  rectMode(CORNER); 

  // Grass
  fill(0, 255, 0); 
  rect(0, 700, 850, 200);

  // Static sad circle
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);

  // Check girl's location and move her towards the sad circle
  if (girlX < 200 && isGirlStopped==false) {
    girlX += girlSpeed;
  } 
  if (girlX ==200) {
    isGirlStopped = true;
    
    // if (girlX == -400){
    //   girlX = -400;
    // }
  }

  // Girl circle
  fill(255, 0, 255);
  ellipse(girlX, 600, 200, 200);

  // wait to start walking off the screen
  if (isGirlStopped && (millis() - timer > 5000)) {
    girlWalksOff = true;
    bkgColor = redColor;

  }

  // Girl walks off the screen
  if (girlWalksOff == true) {
    

    girlX -= girlSpeed;
  }

  if (girlX == -200){
    isFadingToBlue = true;
    currentScene = 2;
    timer = millis();
  }
}

function scene2() {
  // bkgColor =[];
  // bkgColor = [173, 19, 19]; 
  // for (var i = 0; i < 3; i++) { 
  //   bkgColor[i] += (newColor[i] - bkgColor[i]) / fadeSpeed;
  // }

  if (isFadingToBlue) {
    for (var i = 0; i < 3; i++) { 
      bkgColor[i] += (blueColor[i] - bkgColor[i]) / fadeSpeed; // Fade background
    }
  }

  // Apply the background color
  background(bkgColor[0], bkgColor[1], bkgColor[2]);


  // // Apply the background color
  // background(bkgColor[0], bkgColor[1], bkgColor[2]);

  // Grass
  fill(0, 255, 0); 
  rect(0, 700, 850, 200);


  // Sad circle stays 
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);

  // // Girl continues walking off the screen
  // fill(255, 0, 255);
  // if (girlX < width + 200) {  // Check if the girl is off the screen
  //   girlX += girlSpeed;
  // }
  // ellipse(girlX, 600, 200, 200);
}