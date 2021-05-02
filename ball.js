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
var x = 193; // x position der punktmitte
var y = 61; // y position der punktmitte
var rPunkt = 5;


// var xp = 7;
// var yp = 7;

// zweiter Punkt-punkt -->  werte um die richtung des punkts zu berechnen --> verändert sich
// (spielt keine rolle, was für werte, aber 500 >= x | y => 0)
var dx = 3;
var dy = 1;


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
  x = punkt.getAttribute("cx");  // get point 1
  y = punkt.getAttribute("cy"); // get point 1
  console.log("pos of point 1, x : y: ", x + " :  " + y);
  console.log("pos of point 2 init, dx : dy: ", dx + " : " + dy);



  // Set new point 3
  newX = dx + parseInt(x);
  newY = dy + parseInt(y);
  console.log("pos of new point:  ", newX + " :  " + newY);

  reflectPointOnCirlce();

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

  // set new point 1 (point 3 becomes point 1)
  punkt.setAttribute("cx", newX);
  punkt.setAttribute("cy", newY);
}

function reflectPointOnCirlce() {
// a) liegt P3 auf dem Kreis?
// ist der Fall, wenn die Distanz zwischen dem Mittelpunkt des Kreises zu neuem Punkt dem Radius des Kreises entspricht.
// M(xKreisMitte, yKreisMitte)
// r = rKreis
// P(dx+rPunkt, dy+punkt auf dem punkt)
// todo: atm only mitte von punkt--> berechne kontaktstelle punkt auf umfang, and also consider that new point could be negative
// Norm des Vektors MP

  var xKomponenteVektorMP = (newX - xKreisMitte);
  var yKomponenteVektorMP = (newY - yKreisMitte);

  var normVectorMP = Math.round(Math.sqrt(Math.pow(xKomponenteVektorMP, 2) + Math.pow(yKomponenteVektorMP, 2)));

  if (normVectorMP == rKreis) {
    console.log("/////////////////   it's the same /////////////////   ");
    dy = -dy;
    dx = -dy;
  }

}




