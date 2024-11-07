//scene tracker
let currentScene = 1;
let timer = 0;
let nightToDay;

// sad circle 
let x = 400;
let elWalk = 1;
let circleStop = false;
let exitScreen = false;
let movedAcross = 0;
let stopMoving = false;
let done = false;

// girl circle
let girlX = 0;
let girlSpeed = 2;

// girl's movement
let isGirlStopped = false;
let girlWalksOff = false;

//bkg colors
let bkgColor = [255, 0, 150]; 
let redColor = [173, 19, 19]; 
let blueColor = [135, 206, 235]; 
let nightColor = [29, 54, 92];
let dayColor = [135, 206, 235];

//allows backgrounds to fade into different colors
let fadeSpeed = 50;
let isFadingToBlue = false;
let isNightFading = false;
let isDayFading = false;

// Rain 
let particles = [];
let rainStopped = false;

//moon
let moonX = -100;
let moonY = 100;

//sun
let sunX = -100;
let sunY = 100;

let sunCount = 1;
let testCount = 1;

//grass
let rectX = 0;
let rectY = 900;
let xOffset=400;
let shake = true;



//p5 frequency reference
let startX = 300
let startY = 0; 
let endX = 300; 
let endY = 700; 
let frequency = 50.5;
let amplitude = 5;

//flying bee
let beeX = 0;
let beeY = 200; 
let beeSpeed = 1.2; 
let waveAmplitude = 20;
let waveFrequency = 0.05;



function setup() {

  // Centering the canvas -> code from p5.js reference
  let centered = createCanvas(800, 800);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  centered.position(x, y);
  background(0);

  // Time triggers certain events 
  timer = millis();

  //grass 
  fill(20, 128, 18);  // Consistent grass color
  rect(0, 700, 850, 200);

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
    stopScene3();
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
    if (girlWalksOff==true) {
    bkgColor = [255,0,0]; // Set background color to red


  } else {
    bkgColor = [255, 102, 199]; // Original background color
  }
  //bkgColor = [255, 102, 199]; 
  background(bkgColor);
  stroke(0);
  ellipseMode(CENTER);
  rectMode(CORNER); 

  // Grass
  fill(5, 173, 61);
  rect(0, height - 100, width, 100);

  // Static sad circle
  fill(120, 255, 208);
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
  fill(212, 0, 255);
  ellipse(girlX, 600, 200, 200);

  // wait to start walking off the screen
  if (isGirlStopped && (millis() - timer > 4000)) {

    girlWalksOff = true;
    

  }

  // Girl walks off the screen
  if (girlWalksOff == true) {

    //shaking circle
    fill(120, 255, 208);
    xOffset = random(380,420);
    ellipse(xOffset, 600, 200, 200);

    //ground shaking
    if (shake == true){
      rectX = random(-10, 50);
      rectY = random(700, 750);
      fill(34, 87, 43);
      rect(rectX, rectY, width, 100); 
      fill(5, 173, 61);
      rect(0, rectY + 10, width, 100);
    }

    //girl leaving
    girlX -= girlSpeed;
    
  }

  //moves to scene 2 when the girl circle is off the screen
  if (girlX <= -200 && (millis() - timer > 10000)){
    shake = false;
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
  fill(5, 173, 61); 
  rect(0, 700, 850, 200);


  // Sad circle stays 
  fill(120, 255, 208);
  ellipse(x, 600, 200, 200);


  if (isGirlStopped && (millis() - timer > 5000)) {
    timer = millis();
    currentScene+=1;
  }

}

function scene3() {
  background(bkgColor[0], bkgColor[1], bkgColor[2]);

  if (currentScene === 3) {

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

      //trying to debug why the sun isn't reaching the end of the width
      print("MoonX: " + moonX);
      print("Night Fading: " + isNightFading);

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
      
      //sun rising&setting
      noStroke();
      fill(255, 223, 97);
      ellipse(sunX, sunY, 100, 100);
      //sunX += 5;
      //sunY += 1;

      print("SunX: " + sunX);
      print("Day Fading: " + isDayFading);


      if (sunX < (width+100)) {
        sunX += 5;  // Normal speed

      }

      if (sunX >= 700 && sunCount == 1) {
        sunCount += 1; 
        resetSun();  
        resetSky();  
        nightToDay += 1;
        isNightFading = true;  
        isDayFading = false;  
      } else if (sunX >= 700 && sunCount == 2) {
        // On the second iteration, move to scene4
        isNightFading = false;  
        isDayFading = false; 
        stopScene3()
        currentScene+=1;
      }
    }
  }


  

  // Grass
  stroke(0);
  fill(5, 173, 61); 
  rect(0, 700, 850, 200);

  // Sad circle stays in place
  fill(120, 255, 208);
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

function stopScene3() {
  // moonX = -100;  
  // sunX = -100;
  particles = [];  
  isNightFading = false;  
  isDayFading = false; 
  nightToDay = 0;   
  rainStopped = true;
  print("scene 3 end");
}

function scene4() {

  if (currentScene == 4){
    //rainStopped = true;
    timer = millis();
    bkgColor = [135, 206, 235]; // Example: Sky blue for day
    background(bkgColor[0], bkgColor[1], bkgColor[2]);

    //grass 
    stroke(0);
    strokeWeight(1);
    rectMode(CORNER);
    fill(20, 128, 18);  // Consistent grass color
    rect(0, 700, 850, 200);
    

    // Sad circle 
    fill(120, 255, 208);
    ellipse(x, 600, 200, 200);

    //sun
    noStroke();
    fill(255, 223, 97);
    ellipse(700, 100, 100, 100);
    print("hello, I'm scene 4");
    //////before changes

    //finding the bee

    if (rainStopped == true && exitScreen == false) {
      x += elWalk;
      print("Circle x position: " + x);  // Debugging x position
    }

    // Check if the circle has moved off the screen
    if (x >= 900 && (exitScreen == false)) {
      print("I'm off screen");  // Debugging 
      x = -100;  // Reset circle 
      exitScreen = true;
          }

    if (exitScreen == true) {
      if (beeX > width) {
        print("Scene 4: Bee has moved off-screen, transitioning to Scene 5");
        // Reset bee position
        beeX = -50;  
        exitScreen = false; // Reset this flag for future scenes
        circleStop = false;
        currentScene = 5;  // Transition to scene 5
      }
    }

    // Check if the bee should be moving
    if (circleStop == true) {
      // Move the bee
      beeX += beeSpeed;
      beeY = 200 + waveAmplitude * sin(waveFrequency * beeX);
    }

    // Flying bee logic
    if (beeX > 200) {
      rainStopped = true;  // Start moving the circle
      exitScreen = false;  // Ensure this is reset
    }

    // Drawing the bee
    flyingBee(beeX, beeY);
  }
}



function flyingBee(x, y) {
  rectMode(CENTER);
  strokeWeight(2);

  // Wings
  fill(201, 248, 255);
  rect(x - 2, y - 8, 10, 20, 100);
  rect(x + 2, y - 8, 10, 20, 100);

  // Body
  fill(250, 215, 57);
  rect(x, y, 30, 20, 100);
  fill(0);
  rect(x, y, 2, 20);
  rect(x - 8, y, 2, 18);
  rect(x + 8, y - 2, 3, 3, 20);

  // Stinger
  rect(x - 18, y, 7, 0)
}

function scene5() {
  if (currentScene == 5){
    bkgColor = [135, 206, 235]; // Example: Sky blue for day
    background(bkgColor[0], bkgColor[1], bkgColor[2]);
    x = 0;
    //grass 
    stroke(0);
    strokeWeight(1);
    rectMode(CORNER);
    fill(20, 128, 18);  // Consistent grass color
    rect(0, 700, 850, 200);
    

    // Sad circle 
    fill(120, 255, 208);
    ellipse(x, 600, 200, 200);

    //sun
    noStroke();
    fill(255, 223, 97);
    ellipse(700, 100, 100, 100);
    print("hello, I'm scene 4");

    if (done == false){
      x += elWalk;

      if (x == 400){
        done = true;
        x = 400;
      }
    }



  }

}











