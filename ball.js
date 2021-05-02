/*

Initial Square
500 x 500


Kreis Infos
(Radius rKreis, Punkt K (Kreismitte) = K(xKreisMitte,yKreisMitte)

Roter Punkt 1
(Radius rPunkt, Punkt P (Punktmitte) = P(xPunktMitte,yPunktMitte)

Roter Punkt 2
(Radius rPunkt, Punkt P2 (Punktmitte) = P2(dx,dy)

*/

var punkt = document.getElementById("punkt");
var circle = document.getElementById("kreis");

var timerFunction = null;

// kreis init
var xKreisMitte = 250; // x position des kreis
var yKreisMitte = 250;
var rKreis = 50;

// Punkt 1, init
var x = 193; // x position der punktmitte
var y = 61; // y position der punktmitte
const r = 30; // radius

// Punkt 2 -->  werte um die richtung des punkts zu berechnen --> verändert sich
var dx = 3;
var dy = 1;

// Punkt 3
var newX;
var newY;

// Norm = Distanz zwischen Mitte Punkt 1 und 2
var normVectorPK;

document.getElementById("distanz").innerText = calculateNorm(x, y, xKreisMitte, yKreisMitte) - r - rKreis; // init 117


// test


function startAnimation() {
  if (timerFunction == null) {
    timerFunction = setInterval(animate, 20);
  }

}

function stopAnimation() {
  if (timerFunction != null) {
    clearInterval(timerFunction);
    timerFunction = null;
  }
}


function resetAnimation() {
  resetCircle();
  resetPoint();
}

function resetCircle() {
  // set radius and position of kreis randomly
  rKreis = Math.round(Math.random() * 100);
  xKreisMitte = Math.round(Math.random() * (498 - 2 * rKreis) + rKreis);
  yKreisMitte = Math.round(Math.random() * (498 - 2 * rKreis) + rKreis);
  circle.setAttribute("cx", xKreisMitte);
  circle.setAttribute("cy", yKreisMitte);
  circle.setAttribute("r", rKreis);
}

function resetPoint() {
//Aufgabe b)
  // Norm Mittelpunkt zu Mittelpunkt muss grösser als Radius plus Radius sein.
  var nextX = Math.round(Math.random() * (500 - 2 - 2 * r) + r);
  var nextY = Math.round(Math.random() * (500 - 2 - 2 * r) + r);
  var xKomponenteVektorMM = (nextX - xKreisMitte);
  var yKomponenteVektorMM = (nextY - yKreisMitte);
  var normVectorMM = Math.round(Math.sqrt(Math.pow(xKomponenteVektorMM, 2) + Math.pow(yKomponenteVektorMM, 2)));

  if (normVectorMM > r + rKreis) {
    punkt.setAttribute("cx", nextX);
    punkt.setAttribute("cy", nextY);
  } else {
    console.log("Bitte neue Werte generieren!")
  }

  // Setze 'Richtung' durch P2
  dx = Math.round(Math.random() * 5 - 10);
  dy = Math.round(Math.random() * 5 - 10);
}

function animate() {
  x = punkt.getAttribute("cx");
  y = punkt.getAttribute("cy");
  console.log("pos of point 1, x : y: ", x + " :  " + y);
  console.log("pos of point 2 init, dx : dy: ", dx + " : " + dy);

  // Set new point 3
  newX = dx + parseInt(x);
  newY = dy + parseInt(y);
  console.log("pos of new point:  ", newX + " :  " + newY);

  reflectPointOnCirlce();

  if (newX > (500 - r - 1)) { // crash with right border (minus borderline)
    dx = -dx;
  }
  if (newX < (0 + r + 1)) { // crash with left border
    dx = -dx;
  }
  if (newY > (500 - r - 1)) { // crash with bottom border
    dy = -dy;
  }
  if (newY < (0 + r + 1)) { // crash with top border
    dy = -dy;
  }

  // set new point 1 (point 3 becomes point 1)
  punkt.setAttribute("cx", newX);
  punkt.setAttribute("cy", newY);

  //c)
  document.getElementById("distanz").innerText = calculateNorm(newX, newY, xKreisMitte, yKreisMitte) - r - rKreis;
}

//Aufgabe a)
function reflectPointOnCirlce() {
// a) Punkt auf dem Kreis?
// dies ist der Fall, wenn die Distanz zwischen dem Mittelpunkt des Kreises zu Punkt,
// dem Radius des Kreises entspricht.

  var xKomponenteVektorMP = (newX - xKreisMitte);
  var yKomponenteVektorMP = (newY - yKreisMitte);

  var normVectorMP = Math.round(Math.sqrt(Math.pow(xKomponenteVektorMP, 2) + Math.pow(yKomponenteVektorMP, 2)));

  if (normVectorMP <= (rKreis + r)) {
    console.log("/////////////////   bounce back /////////////////   ");
    dy = -dy;
    dx = -dy;
  }
}

//Aufgabe c) // todo: check aufgabe 3
function calculateNorm(xPunkt, yPunkt, xKreis, yKreis) {
  let xKomponenteVektorPK = (xKreis - xPunkt);
  let yKomponenteVektorPK = (yKreis - yPunkt);
  normVectorPK = Math.round(Math.sqrt(Math.pow(xKomponenteVektorPK, 2) + Math.pow(yKomponenteVektorPK, 2)));
  return normVectorPK;

}







