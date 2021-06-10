//
//
// Initial Square
// 500 x 500
// Ränder je 2 pixel


// Kreis Infos Grün
// (Radius rKreis, Punkt K (Kreismitte) = K(xKreisMitte,yKreisMitte)

// Roter Punkt 1
// (Radius rPunkt, Punkt P (Punktmitte) = P(xPunktMitte,yPunktMitte)

// Roter Punkt 2
// (Radius rPunkt, Punkt P2 (Punktmitte) = P2(dx,dy)
//
//

var punkt = document.getElementById("punkt");
var circle = document.getElementById("kreis");

var timerFunction = null;


var quadratsSeiteAussen = 500;
var quadratSeiteInnen = 496;

// kreis init
var xKreisMitte = 250; // x position des kreismittelpunktes
var yKreisMitte = 250; // y position des kreismittelpunktes
var rKreis = 50;
var durchmesserKreis = 2 * rKreis;

// Punkt 1, init
var x = 193; // x position der punktmitte
var y = 61; // y position der punktmitte
const r = 30; // radius
const durchmesserPunkt = 2 * r;

// Punkt 2 -->  werte um die richtung des punkts zu berechnen --> verändert sich
var dx = 3;
var dy = 1;

// Punkt 3
var newX;
var newY;

// Norm = Distanz zwischen Mitte Punkt 1 und Kreis
var normVectorPK;


document.getElementById("distanz").innerText = Math.round(calculateNorm(x, y, xKreisMitte, yKreisMitte) - r - rKreis); // init 117


////////////////// action buttons /////////////////////

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
  animate();
}

////////////////// resets /////////////////////


function resetCircle() { /// done
                         // set radius and position of kreis randomly
  rKreis = Math.round(Math.random() * 100);
  xKreisMitte = Math.round((Math.random() * (quadratSeiteInnen - durchmesserKreis * 2)) + durchmesserKreis);
  yKreisMitte = Math.round((Math.random() * (quadratSeiteInnen - durchmesserKreis * 2)) + durchmesserKreis);
  console.log(xKreisMitte, yKreisMitte);
  circle.setAttribute("cx", xKreisMitte);
  circle.setAttribute("cy", yKreisMitte);
  circle.setAttribute("r", rKreis);
}

function resetPoint() {


  var nextX = Math.round((Math.random() * (quadratSeiteInnen - durchmesserPunkt * 2)) + durchmesserPunkt);
  var nextY = Math.round((Math.random() * (quadratSeiteInnen - durchmesserPunkt * 2)) + durchmesserPunkt);


  // var normVectorMM = Math.sqrt(Math.pow(xKomponenteVektorMM, 2) + Math.pow(yKomponenteVektorMM, 2));
  var normVectorcalc = Math.round(calculateNorm(nextX, nextY, xKreisMitte, yKreisMitte));
  let distanz = normVectorcalc - (r + rKreis);

  // console.log("norm", normVectorMM);
  console.log("norm ca", normVectorcalc);
  console.log("radius punkt ", r);
  console.log("radius kreis gr ", rKreis);
  console.log("different  ", normVectorcalc-(r+rKreis));

  document.getElementById("distanz").innerText = distanz;


  //Aufgabe b)
  // Wenn die Norm von Mittelpunkt zu Mittelpunkt grösser ist als der Radius Kreis plus Radius Punkt, dann
  // gibt es einen Abstand zwischen den beiden. Andernfalls überlappen die Kreise --> dies muss verhindert werden
  if (distanz>0) {
    punkt.setAttribute("cx", nextX);
    punkt.setAttribute("cy", nextY);

  } else {
    console.log("Bitte neue Werte generieren!")
  }

  // Setze 'Richtung' durch P2
  dx = Math.round(Math.random() * 5);
  dy = Math.round(Math.random() * 5);
}

////////////////// animate & reflect /////////////////////


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

  if (newX > (500 - r - 2)) { // crash with right border (minus borderline)
    dx = -dx;
  }
  if (newX < (0 + r + 2)) { // crash with left border
    dx = -dx;
  }
  if (newY > (500 - r - 2)) { // crash with bottom border
    dy = -dy;
  }
  if (newY < (0 + r + 2)) { // crash with top border
    dy = -dy;
  }

  // set new point 1 (point 3 becomes point 1)
  punkt.setAttribute("cx", newX);
  punkt.setAttribute("cy", newY);

  //c)
  document.getElementById("distanz").innerText =
    Math.round(calculateNorm(newX, newY, xKreisMitte, yKreisMitte) - r - rKreis);
}


//Aufgabe a)
function reflectPointOnCirlce() {
// a) Punkt auf dem Kreis?
// dies ist der Fall, wenn die Distanz zwischen dem Mittelpunkt des Kreises zu Punkt,
// dem Radius des Kreises entspricht.

  var xKomponenteVektorMP = (newX - xKreisMitte);
  var yKomponenteVektorMP = (newY - yKreisMitte);

  var normVectorMP = Math.round(Math.sqrt(Math.pow(xKomponenteVektorMP, 2) + Math.pow(yKomponenteVektorMP, 2)));
var diszanz = normVectorMP - (rKreis+r);


  if (normVectorMP < (rKreis + r)) {
    console.log("/////////////////   bounce back /////////////////   ");
    dy = -dy;
    dx = -dy;
  }


}

//Aufgabe c) // todo: check aufgabe 3
function calculateNorm(xPunkt, yPunkt, xKreis, yKreis) {
  let xKomponenteVektorPK = (xKreis - xPunkt);
  let yKomponenteVektorPK = (yKreis - yPunkt);
  normVectorPK = Math.sqrt(Math.pow(xKomponenteVektorPK, 2) + Math.pow(yKomponenteVektorPK, 2));
  return normVectorPK;

}






