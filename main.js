// ranking de personas con mas puntuacion

const ranking = [];

let primero = "";
let segundo = "";
let tercero = "";
let cuarto = "";
let quinto = "";

let rank1 = document.getElementsByClassName("rank1")[0];
let rank2 = document.getElementsByClassName("rank2")[0];
let rank3 = document.getElementsByClassName("rank3")[0];
let rank4 = document.getElementsByClassName("rank4")[0];
let rank5 = document.getElementsByClassName("rank5")[0];

rank1.textContent = primero;
rank2.textContent = segundo;
rank3.textContent = tercero;
rank4.textContent = cuarto;
rank5.textContent = quinto;

// clase de datos de la partida del ususario

class Usuario {
	constructor(nombre, puntuacion) {
		this.nombre = nombre;
		this.fecha = new Date();
		this.puntuacion = puntuacion;
	}
}

let puntuacion = 0;

function juego() {
	let juego = document.getElementsByClassName("juego")[0];
	juego.style.display = "block";
	//timer
	let boton_jugar = document.getElementsByClassName("boton-jugar")[0];
	boton_jugar.style.display = "none";

	var seconds = 60;
	var timer = setInterval(function () {
		seconds--;
		document.getElementById("timer").textContent = seconds;
	}, 1000);

	//juego de 10 multiplicaciones de numeros random del 0 al 10
	for (i = 0; i < 10; i++) {
		let numero_uno = parseInt(Math.random() * 10);
		let numero_dos = parseInt(Math.random() * 10);
		console.log(numero_uno, "x", numero_dos);

		let multi = document.getElementById("multi");
		multi.textContent = numero_uno + " x " + numero_dos;

		let rta = document.getElementById("respuesta").value;

		let solucion = numero_uno * numero_dos;

		if (solucion == respuesta) {
			let respuesta = rta.onchange;

			puntuacion = puntuacion + 1;
			console.log("¡Bien! Tu respuesta fue:", solucion, "Tenés:", puntuacion, " puntos.");
		} else {
			console.log("¡Incorrecto! La respuesta correcta era:", solucion, ". Tenés ", puntuacion, "puntos.");
		}
		if (i == 10 || seconds == 0) {
			clearInterval(timer);

			alert("Obtuviste" + puntuacion + "/ 10");

			ranking.push(new Usuario(prompt("¿Cuál es tu nombre?"), puntuacion));

			ranking.sort((a, b) => b.puntuacion - a.puntuacion);

			if (ranking[0]) {
				primero = ranking[0].nombre;
				rank1.textContent = primero;
			}
			if (ranking[1]) {
				segundo = ranking[1].nombre;
				rank2.textContent = segundo;
			}
			if (ranking[2]) {
				tercero = ranking[2].nombre;
				rank3.textContent = tercero;
			}
			if (ranking[3]) {
				cuarto = ranking[3].nombre;
				rank4.textContent = cuarto;
			}
			if (ranking[4]) {
				quinto = ranking[4].nombre;
				rank5.textContent = quinto;
			}
		}
	}
}
