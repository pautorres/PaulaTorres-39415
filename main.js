//desahabilitar el boton jugar por default si no se puso un nombre

let boton_jugar = document.getElementsByClassName("boton-jugar")[0];
boton_jugar.disabled = true;

let nombre_usuario = document.getElementById("nombre_jugador");
nombre_usuario.addEventListener("input", function () {
	if (nombre_usuario.value !== "") {
		boton_jugar.disabled = false;
		boton_jugar.style.border = "5px solid white";
	} else {
		boton_jugar.disabled = true;
	}
});

//ranking

let ranking = [];
ranking.push(JSON.parse(localStorage.getItem("ranking")));

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
rank4.textContent = quinto;

class Usuario {
	constructor(nombre, puntuacion) {
		this.nombre = nombre;
		this.fecha = new Date();
		this.puntuacion = puntuacion;
	}
}

//juego
function juego() {
	//cambios en el html cuando se presiona JUGAR
	let juego = document.getElementsByClassName("juego")[0];
	juego.style.display = "block";
	let main_page = document.getElementsByTagName("main")[0];
	main_page.style.display = "none";

	//TIMER
	let seconds = 30;
	let timer = setInterval(function () {
		seconds--;
		document.getElementById("timer").textContent = seconds;
	}, 1000);

	//juego de 10 multiplicaciones de numeros random del 0 al 10
	let preguntas = [];
	let respuestas = [];

	for (i = 0; i < 10; i++) {
		let numero_uno = parseInt(Math.random() * 10);
		let numero_dos = parseInt(Math.random() * 10);

		preguntas.push(numero_uno + " x " + numero_dos);
		respuestas.push(numero_uno * numero_dos);
	}

	let pregunta_actual = 0;
	let puntuacion = 0;

	function mostrar_pregunta() {
		let multi = document.getElementById("multi");
		multi.textContent = preguntas[pregunta_actual];
	}

	function validar_respuesta() {
		let rta = document.getElementById("respuesta");
		let respuesta = parseInt(rta.value);

		if (respuestas[pregunta_actual] == respuesta) {
			puntuacion++;
			console.log("¡Bien! Tu respuesta fue:", respuesta, "Tenés:", puntuacion, " puntos.");
		} else {
			console.log("¡Incorrecto! La respuesta correcta era:", respuestas[pregunta_actual], ". Tenés ", puntuacion, "puntos.");
		}

		pregunta_actual++;

		if (pregunta_actual == 10 || seconds == 0) {
			clearInterval(timer);

			alert("Obtuviste " + puntuacion + "/10");

			let nombre = document.getElementById("nombre_jugador").value;

			ranking.push(new Usuario(nombre, puntuacion));

			sort();

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
				quiinto = ranking[4].nombre;
				rank5.textContent = quinto;
			}

			const rankingJSON = JSON.stringify(ranking);
			localStorage.setItem("ranking", rankingJSON);
		} else {
			mostrar_pregunta();
		}

		rta.value = "";
	}

	//validar respuesta si el usuario presiona la tecla enter
	mostrar_pregunta();
	let rta = document.getElementById("respuesta");
	rta.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			validar_respuesta();
		}
	});
}

function sort() {
	ranking.sort(function (a, b) {
		return b.puntuacion - a.puntuacion;
	});
}
