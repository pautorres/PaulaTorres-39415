//pregunta volver a jugar
function jugar_otra_vez() {
	let jugarDeNuevo = confirm("¿Querés jugar otra vez?");
	if (jugarDeNuevo) {
		puntuacion = 0;
		juego();
	}
}

// ranking de personas con mas puntuacion

const ranking = [];

let primero = "";
let segundo = "";
let tercero = "";

let rank1 = document.getElementsByClassName("rank1")[0];
let rank2 = document.getElementsByClassName("rank2")[0];
let rank3 = document.getElementsByClassName("rank3")[0];

rank1.textContent = primero;
rank2.textContent = segundo;
rank3.textContent = tercero;

// clase de datos de la partida del ususario

class Usuario {
	constructor(nombre, puntuacion) {
		this.nombre = nombre;
		this.fecha = Date();
		this.puntuacion = puntuacion;
	}
}

let puntuacion = 0;

function juego() {
	//juego de 10 multiplicaciones de numeros random del 0 al 10
	for (i = 0; i <= 10; i++) {
		let numero_uno = parseInt(Math.random() * 10);
		let numero_dos = parseInt(Math.random() * 10);
		console.log(numero_uno, "x", numero_dos);

		let respuesta = prompt("¿Cuánto es " + numero_uno + " x " + numero_dos + " ?");

		let solucion = numero_uno * numero_dos;

		if (solucion == respuesta) {
			puntuacion = puntuacion + 1;
			console.log("¡Bien! Tu respuesta fue:", solucion, "Tenés:", puntuacion, " puntos.");
		} else {
			console.log("¡Incorrecto! La respuesta correcta era:", solucion, ". Tenés ", puntuacion, "puntos.");
		}
		if (i == 10) {
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
			console.log(ranking);
			jugar_otra_vez();
		}
	}
}

if (confirm("¿Jugar?")) {
	juego();
}
