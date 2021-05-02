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

var timerFunction = null;

// kreis init
var circle = document.getElementById("kreis");
var xKreisMitte = 250; // x position des kreis
var yKreisMitte = 250;
var rKreis = 50;


// Punkt 1, init
var punkt = document.getElementById("punkt");
var x = 193; // x position der punktmitte
var y = 61; // y position der punktmitte
const r = 30; // radius

// Punkt 2 -->  werte um die richtung des punkts zu berechnen --> verändert sich
var dx = 3;
var dy = 1;

// Punkt 3
var newX;
var newY;


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
  // setzt den zweiten punkt neu, resultat ist minus wert --> 'retour'
  dx = Math.round(Math.random() * 5 - 10);
  dy = Math.round(Math.random() * 5 - 10);
  console.log("set point 2 after reset to :", dx + " : " + dy);

  // set radius and position of kreis randomly
  rKreis = Math.round(Math.random() * 100);
  xKreisMitte = Math.round(Math.random() * (498 - 2 * rKreis) + rKreis);
  yKreisMitte = Math.round(Math.random() * (498 - 2 * rKreis) + rKreis);
  circle.setAttribute("cx", xKreisMitte);
  circle.setAttribute("cy", yKreisMitte);
  circle.setAttribute("r", rKreis);
}

function animate() {
  x = punkt.getAttribute("cx");  // get point 1
  y = punkt.getAttribute("cy"); // get point 1
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
}

function reflectPointOnCirlce() {
// a) liegt P3 auf dem Kreis?
// dis ist der Fall, wenn die Distanz zwischen dem Mittelpunkt des Kreises zu Punkt, dem Radius des Kreises entspricht.

  var xKomponenteVektorMP = (newX - xKreisMitte);
  var yKomponenteVektorMP = (newY - yKreisMitte);

  var normVectorMP = Math.round(Math.sqrt(Math.pow(xKomponenteVektorMP, 2) + Math.pow(yKomponenteVektorMP, 2)));

  if (normVectorMP <= (rKreis + r)) {
    console.log("/////////////////   it's the same /////////////////   ");
    dy = -dy;
    dx = -dy;
  }

}




