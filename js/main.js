const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


const window_height = "300";
const window_width = "500";


canvas.height = window_height;
canvas.width = window_width;


canvas.style.backgroundColor = "#b7f7ed";


class Circle {

  constructor(x, y, radius, color, text, backcolor, speed) {

    this.posX = x;

    this.posY = y;

    this.radius = radius;

    this.color = color;

    this.text = text;

    this.backcolor = backcolor;

    // Velocidad 
    this.speed = speed;

    // VElocidad normal y especificacion de 
    // Dirección
    this.dx = 1 * this.speed;

    this.dy = 1 * this.speed;

  }

  draw(context) {

    //Rellena el objeto

    context.beginPath();

    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);

    context.fillStyle = this.backcolor;

    context.fill();


    //Dibuja la línea del objeto

    context.lineWidth = 5;

    context.strokeStyle = this.color;

    context.stroke();


    //Dibuja el texto al centro del objeto

    context.textAlign = "center";

    context.textBaseline = "middle";

    context.font = "bold 20px cursive";

    context.fillStyle = "white";

    context.fillText(this.text, this.posX, this.posY);


    context.closePath();

  }

  //metodo que permite mover el objeto, mueve el circulo de posicion en pocisión
  update(context) {
    // dibuja el circulo
    this.draw(context);


    //Si el circulo supera el margen derecho entonces se mueve a la izquierda

    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {

      this.dx = -this.dx;

    }


    //Si el circulo supera el margen superior entonces se mueve a abajo

    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {

      this.dy = -this.dy;

    }


    this.posX += this.dx;

    this.posY += this.dy;
    // Actualizar las posiciones en el recuadro
    document.getElementById('posX').textContent = this.posX.toFixed(2);
    document.getElementById('posY').textContent = this.posY.toFixed(2);
  }

}


let randomRadius = Math.floor(Math.random() * 60 + 20);

let randomX = Math.random() * window_width;

let randomY = Math.random() * window_height;

let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";


randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;

randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;


let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 1);

miCirculo.draw(ctx);


let updateCircle = function () {

  requestAnimationFrame(updateCircle);

  ctx.clearRect(0, 0, window_width, window_height);

  miCirculo.update(ctx);

};


updateCircle();

////////
// Crear elementos en el DOM para cada círculo
function createCoordinateElements(nCircles) {
  const coordinatesContainer = document.getElementById('coordinates');
  coordinatesContainer.innerHTML = ''; // Limpiar el contenedor

  for (let i = 0; i < nCircles; i++) {
    const circleCoords = document.createElement('div');
    circleCoords.id = `circle-${i}`;
    circleCoords.textContent = `Circle ${i + 1}: (X: 0.00, Y: 0.00)`;
    coordinatesContainer.appendChild(circleCoords);
  }
}
//////////



const canvasnewCanvas = document.getElementById("newCanvas");
let ctxnewCanvas = canvasnewCanvas.getContext("2d");

canvasnewCanvas.height = window_height;
canvasnewCanvas.width = window_width;

canvasnewCanvas.style.backgroundColor = "#f7b7c1";




const nCircles = 10;
let circles = [];
createCoordinateElements(nCircles);

// Actualizar las coordenas en el DOM
function updateCoordinates(circles) {
  circles.forEach((circle, index) => {
    const circleCoords = document.getElementById(`circle-${index}`);
    circleCoords.textContent = `Circle ${index + 1}: (X: ${circle.posX.toFixed(2)}, Y: ${circle.posY.toFixed(2)})`;
  });
}




for (let i = 0; i < nCircles; i++) {

  let randomRadius = Math.floor(Math.random() * 30 + 20);

  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;

  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ", " + Math.random() * 1 + ")";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 1 + ")";

  let randomSpeed = Math.random() * 0.15 + 1;


  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;


  let miCirculo2 = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);

  circles.push(miCirculo2);

}

let updateCircle2 = function () {
  requestAnimationFrame(updateCircle2);
  ctxnewCanvas.clearRect(0, 0, window_width, window_height);
  circles.forEach((miCirculo2) => {
    miCirculo2.update(ctxnewCanvas);
  });
  updateCoordinates(circles); // Actualiza las coordenadas en el DOM

};

updateCircle2();