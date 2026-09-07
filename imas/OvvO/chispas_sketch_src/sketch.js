// template for saving png files from p5.js sketch using CCapture
// Add blink everytime mouse pressed

var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({ format: "png" });

let NUM_FRAMES = 100;
const T = 1;

let frames = 0;
let totalFrames; //a 30fps, de 3(90f) - 5 (150f) seg.
let bloodAlpha;
let vampX, vampY;
let fangStroke, rectStroke, rectStrokeTint;
let rectSizeX, rectSizeY;
let eyesSizeX, eyesSizeY, eyesX, eyesY;
let fangY1, fangY2, fangX1, fangX2, fangX3, fangXX;
let r, g, b, r1, g1, b1;
let colorVamp, colorTemp, colorFondo, colorBody;
let randomState, state, randomBlood, bloodState, body;
let tintaShadow = 18;

var indexColor;

var colorPallete = [
  "#ff0d51",
  "#FF7919",
  "#C8FF12",
  "#56ED28",
  "#12FFFB",
  "#7BDCD9",
  "#70C2E5",
  "#E5B4CE",
  "#E55DA6",
  "#A32567",
];

var guion = {
  x: 0,
  y: 0,
  w: 28,
  h: 28
};

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(18);

  blendMode(BLEND);

  vampX = width / 2;
  vampY = height / 2;
  
  resetVariables();
}

function resetVariables() {
  
  totalFrames = floor(random(90, 150)); //a 30fps, de 3(90f) - 5 (150f) seg.
  NUM_FRAMES = totalFrames;
  randomBlood = random(10);
  bloodState = randomBlood;
  randomState = floor(random(10));
  state = randomState;
  fangStroke = random(2.5, 5);
  rectStroke = random(3, 6);
  rectStrokeTint = 255;
  rectSizeX = random(150, 500);
  rectSizeY = random(150, 300);
  eyesSizeX = random(20, 100);
  eyesSizeY = random(20, 100);
  eyesX = random(40, rectSizeX / 2); // usamos rectSizeX/2 para que los ojos no se salgan del cuerpo
  eyesY = random(20, 50);
  fangXX = random(5, 20);
  fangX3 = random(25, 45);
  fangX1 = fangX3 + fangXX;
  fangX2 = fangX3 - fangXX;
  fangY1 = random(25, 35);
  fangY2 = random(55, 95);
  r = random(255);
  g = random(255);
  b = random(255);
  r1 = random(255);
  g1 = random(255);
  b1 = random(255);

  setInterval(resetFrameCount, random(3000, 7000));
  print('Total frames= ' + totalFrames);
  print('State = '+state);
  
}

function draw() {
  if (capture && frameCount == 1) capturer.start(); // start the animation capture

  vv();
  ojos();

  if (capture) {
    capturer.capture(canvas); // if capture is 'true', save the frame
    if (frameCount - 1 == NUM_FRAMES) {
      //stop and save after NUM_FRAMES
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}

function mousePressed() {
  resetVariables();
}

function vv() {
  noFill();
  rectMode(CENTER);
  vampX = width / 2;
  vampY = height / 2;
  colorTemp = color(r1, g1, b1);

  if (state == 0) {
    // Negro, lineas colores, sans sangre
    colorFondo = 0;
    colorBody = colorFondo;
    colorTemp = color(r1, g1, b1);
  } else if (state == 1) {
    //Blanco, lineas colores, sans sangre
    colorFondo = 255;
    colorBody = colorFondo;
    colorTemp = color(r1, g1, b1);
  } else if (state == 2) {
    // Blanco, lineas negro, sans sangre
    colorFondo = 255;
    colorBody = colorFondo;
    colorTemp = 0;
  } else if (state == 3) {
    // Negro, lineas blancas, sans sangre
    colorFondo = 0;
    colorBody = colorFondo;
    colorTemp = 255;
  } else if (state == 4) {
    colorFondo = color (r, g, b);
    colorBody = colorFondo;
    tintaShadow = 0;
    rectStrokeTint = 0;
    colorTemp = color(r1, g1, b1);
  } else if (state >= 5) {
    // Colores, lineas colores, sans sangre
    colorFondo = color(r, g, b);
    colorBody = 255;
    colorTemp = color(r1, g1, b1);
  }

  if (bloodState > 7) {
    // SANGRE!
    bloodAlpha = 255;
  } else {
    bloodAlpha = 0;
  }
  
  background (colorFondo);
  push();                        //GUIONES
  noStroke();
  for (var i = width / 5; i < (width - (width / 5)); i = (i + (width / 25))) {
    for (var j = height/ 5; j < (height - (height / 5)); j = (j + (height / 8))) {
      keys();
      rect(guion.x + i, guion.y + j, random(guion.w), random(guion.h));
    }
  }
  pop();
  
  push();
  noStroke();
  blendMode(MULTIPLY);
  fill(0, tintaShadow);
  rect(vampX - 7, vampY + 7, rectSizeX, rectSizeY, 4); //SOMBRA
  pop();

  fill(colorBody);
  stroke(colorTemp, rectStrokeTint);
  strokeWeight(rectStroke);
  rect(vampX, vampY, rectSizeX, rectSizeY, 4); //RECUADRO

  fill(255, 0, 0, bloodAlpha);
  rectMode(CORNERS);
  noStroke();
  rect(
    vampX - fangX1 + random(-1, 1),
    vampY + fangY1 + 13, // SANGRE!
    vampX - fangX2 + random(-1, 1),
    height
  );
  rect(
    vampX + fangX2 + random(-1, 1),
    vampY + fangY1 + 13,
    vampX + fangX1 + random(-1, 1),
    height
  );

  strokeWeight(fangStroke);
  stroke(colorTemp);
  line(vampX - fangX1, vampY + fangY1, vampX - fangX3, vampY + fangY2); //FANGS
  line(vampX - fangX3, vampY + fangY2, vampX - fangX2, vampY + fangY1);
  line(vampX + fangX2, vampY + fangY1, vampX + fangX3, vampY + fangY2);
  line(vampX + fangX3, vampY + fangY2, vampX + fangX1, vampY + fangY1);
}

function ojos() {
  fill(colorTemp); // OJOS
  noStroke();
  if (frameCount == 21) {
    ellipse(vampX - eyesX, vampY - eyesY, eyesSizeX, 25);
    ellipse(vampX + eyesX, vampY - eyesY, eyesSizeX, 25);
  } else if (frameCount == 22) {
    ellipse(vampX - eyesX, vampY - eyesY, eyesSizeX, 2);
    ellipse(vampX + eyesX, vampY - eyesY, eyesSizeX, 2);
  } else if (frameCount == 23) {
    ellipse(vampX - eyesX, vampY - eyesY, eyesSizeX, 15);
    ellipse(vampX + eyesX, vampY - eyesY, eyesSizeX, 15);
     } else {
    ellipse(vampX - eyesX, vampY - eyesY, eyesSizeX, eyesSizeX);
    ellipse(vampX + eyesX, vampY - eyesY, eyesSizeX, eyesSizeX);
  }
}

function resetFrameCount() {
  frameCount = 0;
}

function buttonPress()
{
    if (capture == false) {
        capture = true;
        document.getElementById("myButton").value='Saving Frames... Press Again to Cancel'; 
        frameCount = 0;
    } else {
        location.reload(); //refresh the page (starts animation over, stops saving frames)
    }
}

function keys() {
  var index = floor(random(100));
  var indexColor = floor(random(colorPallete.length));
  
    if (index > 0.7) {
      fill(colorFondo);
    } else {
      fill(colorPallete[indexColor]);
    }
}
