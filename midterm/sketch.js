//scene tracker
let currentScene = 1;
let timer = 0;
let nightToDay;

// sad circle 
let x = 400;

// girl circle
let girlX = 0;
let girlSpeed = 2;

// girl's movement
let isGirlStopped = false;
let girlWalksOff = false;

//bkg colors
let bkgColor = [255, 0, 150]; 
let redColor = [173, 19, 19]; 
let blueColor = [100, 100, 255]; 
let nightColor = [29, 54, 92];
let dayColor = [135, 206, 235];

//allows backgrounds to fade into different colors
let fadeSpeed = 50;
let isFadingToBlue = false;
let isNightFading = false;
let isDayFading = false;

// Rain 
let particles = [];

//moon
let moonX = -100;
let moonY = 200;

//sun
let sunX = -100;
let sunY = 200;

function setup() {

  // Centering the canvas -> code from p5.js reference
  let centered = createCanvas(800, 800);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  centered.position(x, y);
  background(0);

  // Time triggers certain events 
  timer = millis();

  //start to rain in scene 3 
  for (let i = 0; i < 100; i++) {
    //random x&y positions
    let xPosition = random(width);            
    let yPosition = random(-height, 0); 

    //x is static and y accelerates downward randomly
    let xAcceleration = 0;                      
    let yAcceleration = random(2, 5);

    //creates new rain droplets
    let newParticle = new Particle(xPosition, yPosition, xAcceleration, yAcceleration); 
    particles.push(newParticle);         
    }
}

function draw() {
  // Loop back to the first scene
  if (currentScene > 8) {  
    currentScene = 1;
    resetScene();
  }

  // Calling each scene function
  if (currentScene === 1) {
    scene1();
  } 
  else if (currentScene === 2) {
    scene2();
  }
  else if (currentScene === 3) {
    scene3();
  }
  else if (currentScene === 4) {
    scene4();
  }
  else if (currentScene === 5) {
    scene5();
  }
  else if (currentScene === 6) {
    scene6();
  }
  else if (currentScene === 7) {
    scene7();
  }
  else if (currentScene === 8) {
    scene3();
  }
  else{
    resetScene();
  }

  //tracks the night and day scenes 
  if (nightToDay >= 2) {  
    //moves to scene 4
    currentScene += 1;
  }
  
}

//restarts the story
function resetScene() {
  // Reset girl circle position and state
  girlX = 0;           
  isGirlStopped = false; 
  girlWalksOff = false;  
  
  //color reset
  stroke(0);
  bkgColor = [255, 0, 150];  
  let isFadingToBlue = false;
  let isNightFading = false;
  currentScene = 1;

  //moon&sun
  moonX = -100;
  sunX = -100;

  //day to night reset
  nightToDay = 0;  
}


function scene1() { 

  background(bkgColor);

  ellipseMode(CENTER);
  rectMode(CORNER); 

  // Grass
  fill(20, 128, 18); 
  rect(0, 700, 850, 200);

  // Static sad circle
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);

  // Check girl's location and move her towards the sad circle
  if (girlX < 200 && isGirlStopped==false) {
    girlX += girlSpeed;
  } 

  //checks if the girl is stopped so she
  if (girlX ==200) {
    isGirlStopped = true;
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

  //moves to scene 2 when the girl circle is off the screen
  if (girlX <= -200){
    isFadingToBlue = true;
    currentScene+=1;
    timer = millis();
  }
}

function scene2() {

  // fades the background to sad blue sky
  if (isFadingToBlue == true) {
    for (let i = 0; i < 3; i++) { 
      bkgColor[i] += (blueColor[i] - bkgColor[i]) / fadeSpeed; 
    }
  }

  // Apply the background color
  background(bkgColor[0], bkgColor[1], bkgColor[2]);

  // Grass
  fill(20, 128, 18); 
  rect(0, 700, 850, 200);


  // Sad circle stays 
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);


  if (isGirlStopped && (millis() - timer > 5000)) {
    timer = millis();
    currentScene+=1;
  }

}

function scene3() {
  background(bkgColor[0], bkgColor[1], bkgColor[2]);

  if ((isGirlStopped == true) && (millis() - timer > 3000)) {
    timer = millis();
    isNightFading = true;
  }

  if (isNightFading == true && isDayFading == false) {
    for (let i = 0; i < 3; i++) { 
      bkgColor[i] += (nightColor[i] - bkgColor[i]) / fadeSpeed;
    }

    //rsing moon
    noStroke();
    fill(194, 200, 209);
    ellipse(moonX,moonY,100,100);
    moonX +=5;
    //moonY += 1;

    if (moonX > (width+100)) {
      isNightFading = false;
      isDayFading = true;
      resetMoon();
      nightToDay += 1; 
    }
  }

  //sky brightens 
  if (isDayFading == true && isNightFading == false) {
    for (let i = 0; i < 3; i++) { 
      bkgColor[i] += (dayColor[i] - bkgColor[i]) / fadeSpeed;
    }
    background(bkgColor[0], bkgColor[1], bkgColor[2]);
    //sun rising&setting
    noStroke();
    fill(255, 223, 97);
    ellipse(sunX, sunY, 100, 100);
    sunX += 5;
    //sunY += 1;

    if(sunX > (width+100)){
      //rest to night 
      isDayFading = false;
      resetSun();
      resetSky();
      nightToDay += 1; 
      if (nightToDay < 2) {
         isNightFading = true; // Go back to night
      }
    }
  }

  // Grass
  fill(20, 128, 18); 
  rect(0, 700, 850, 200);

  // Sad circle stays in place
  stroke(0);
  fill(0, 0, 255);
  ellipse(x, 600, 200, 200);

  //rain
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].checkEdges();
    particles[i].display();
  }

}

// Referenced particle code from class 
class Particle { 
  constructor(x, y, a1, a2) {
    this.position = new createVector(x, y);
    this.velocity = new createVector(0, random(5, 10));
  }

  update() {
    //this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.position.x, this.position.y, 5, 10); // Raindrop shape
  }

  checkEdges() {
    if (this.position.y > height) {
      this.position.y = 0; // Reset raindrop to the top
      this.position.x = random(width); // Randomize the x-position
    }
  }
}

function resetMoon() {
  moonX = -100;  
}

function resetSun() {
  sunX = -100;  
}

// Resets the sky to dark blue for the next night
function resetSky() {
  bkgColor = nightColor;  
  isNightFading = true;    
}

function scene4() {
  fill(0);
  ellipse(400,600, 200, 200);

}



