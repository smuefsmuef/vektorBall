var timerFunction = null;
var xm = 250;
var ym = 250;
var r = 50;
var xp = 7;
var yp = 7;
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
  dx = Math.round(Math.random() * 5 - 10);
  dy = Math.round(Math.random() * 5 - 10);
  var circle = document.getElementById("kreis");
  r = Math.round(Math.random() * 100);
  xm = Math.round(Math.random() * (498 - 2 * r) + r);
  ym = Math.round(Math.random() * (498 - 2 * r) + r);
  circle.setAttribute("cx", xm);
  circle.setAttribute("cy", ym);
  circle.setAttribute("r", r);
}

function animate() {
  var circle = document.getElementById("punkt");
  var x = circle.getAttribute("cx");
  var y = circle.getAttribute("cy");
  var newX = dx + parseInt(x);
  var newY = dy + parseInt(y);
  if (newX > 493) {
    dx = -dx;
  }
  if (newX < 7) {
    dx = -dx;
  }
  if (newY > 493) {
    dy = -dy;
  }
  if (newY < 7) {
    dy = -dy;
  }
  circle.setAttribute("cx", newX);
  circle.setAttribute("cy", newY);
}


