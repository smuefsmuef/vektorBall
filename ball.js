
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
var xKreisMitte = 250; // x position des kreis
var yKreisMitte = 250;
var rKreis = 50;


// punkt init
var xPunktMitte = 193; // x position des punkts
var yPunktMitte = 61;
var rPunkt = 5;


// var xp = 7;
// var yp = 7;

// zweiter Punkt-punkt -->  werte um die richtung des punkts zu berechnen --> verändert sich
// (spielt keine rolle, was für werte, aber 500 >= x | y => 0)
var dx = 3;
var dy = 1;


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
  dx = Math.round(Math.random() * 5 -10);
  dy = Math.round(Math.random() * 5 - 10);
  console.log("set point 2 after reset to :", dx + " : " + dy);

  // set radius and position of kreis randomly
  var circle = document.getElementById("kreis");
  rKreis = Math.round(Math.random() * 100);
  xKreisMitte = Math.round(Math.random() * (498 - 2 * rKreis) + rKreis);
  yKreisMitte = Math.round(Math.random() * (498 - 2 * rKreis) + rKreis);
  circle.setAttribute("cx", xKreisMitte);
  circle.setAttribute("cy", yKreisMitte);
  circle.setAttribute("r", rKreis);
}

function animate() {

  var punkt = document.getElementById("punkt");
  var x = punkt.getAttribute("cx");  // get point 1
  var y = punkt.getAttribute("cy"); // get point 1
  console.log("pos of point 1, x : y: ", x + " :  " + y);
  console.log("pos of point 2 init, dx : dy: ", dx + " : " + dy);

  // Set new point 2

  var newX = dx + parseInt(x);
  var newY = dy + parseInt(y);

  if (newX > 493) { // crash with right border
    dx = -dx;
  }
  if (newX < 7) { // crash with left border
    dx = -dx;
  }
  if (newY > 493) { // crash with bottom border
    dy = -dy;
  }
  if (newY < 7) { // crash with top border
    dy = -dy;
  }

  punkt.setAttribute("cx", newX); // set new point 1 (point 2 becomes point 1)
  punkt.setAttribute("cy", newY); // set new point 1  (point 2 becomes point 1)
}


