//ranking
let ranking = [];
const rankingJSON = localStorage.getItem("ranking"); //obtener key con data de ultimo ranking
if (rankingJSON !== null) {
	ranking = JSON.parse(rankingJSON);
}

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

//poner los nombres del ranking en el html
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

//clase usuario
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

	//TIMER 30 segundo
	let seconds = 30;
	let timer = setInterval(function () {
		seconds--;
		document.getElementById("timer").textContent = seconds;
		if (seconds === 0) {
			//si llega a 0 el juego se termina
			clearInterval(timer);
			alert("Tiempo agotado. Obtuviste " + puntuacion + "/10");
			juego.style.display = "none";
			main_page.style.display = "block";
		}
	}, 1000);

	//juego de 10 multiplicaciones de numeros random del 0 al 10
	let preguntas = [];
	let respuestas = [];

	for (i = 0; i < 10; i++) {
		//generar la 10 preguntas
		let numero_uno = parseInt(Math.random() * 10);
		let numero_dos = parseInt(Math.random() * 10);

		preguntas.push(numero_uno + " x " + numero_dos);
		respuestas.push(numero_uno * numero_dos);
	}

	let pregunta_actual = 0;
	let puntuacion = 0;

	function mostrar_pregunta() {
		//mostrar la multiplicacion en el html
		let multi = document.getElementById("multi");
		multi.textContent = preguntas[pregunta_actual];
	}

	function validar_respuesta() {
		//validar la respuesta que dio el usuario, si es correcta sumar un punto
		let rta = document.getElementById("respuesta");
		let respuesta = parseInt(rta.value);

		if (respuestas[pregunta_actual] == respuesta) {
			puntuacion++;
		}

		pregunta_actual++; //cambiar de pregunta

		if (pregunta_actual == 10 || seconds == 0) {
			//cuando no hayan mas preguntas o se acabe el tiempo finaliza el juego
			alert("Obtuviste " + puntuacion + "/10");

			let nombre = document.getElementById("nombre_jugador").value;
			ranking.push(new Usuario(nombre, puntuacion)); //push al array ranking del nombre de usuario y su puntuacion
			sort();

			//cambiar el html segun el nuevo ranking
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

			//update de la key "ranking" con el nuevo array de ranking
			const rankingJSON = JSON.stringify(ranking);
			localStorage.setItem("ranking", rankingJSON);

			//cuando se acaba el juego aparece la pantalla con el boton jugar
			let juego = document.getElementsByClassName("juego")[0];
			juego.style.display = "none";
			let main_page = document.getElementsByTagName("main")[0];
			main_page.style.display = "block";
		} else {
			mostrar_pregunta();
		}

		rta.value = ""; //borrar el valor de la respuesta para una nueva pregunta
	}

	//nueva pregunta si el usuario presiona la tecla enter
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
	//ordenar array ranking de mayor a menor puntuacion
	ranking.sort(function (a, b) {
		return b.puntuacion - a.puntuacion;
	});
}

// si al entrar a la pagina el array ranking tiene elementos entonces mostrarlos en el html
if (ranking.length > 0) {
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
