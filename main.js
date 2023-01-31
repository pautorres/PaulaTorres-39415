// pregunta para volver a jugar

function jugar_otra_vez() {
	if (prompt("Si querés jugar otra vez escribí JUGAR.") == "JUGAR") {
		let i = 0;
	} else {
		i = 100;
	}
}

let usuario = prompt("¿Cuál es tu nombre?");

// juego: 10 preguntas de multiplicacion de dos numeros random del cero al diez

for (i = 0; i <= 10; i++) {
	let numero_uno = parseInt(Math.random() * 10);
	let numero_dos = parseInt(Math.random() * 10);
	console.log(numero_uno, "x", numero_dos);

	let respuesta = prompt("¿Cuánto es " + numero_uno + " x " + numero_dos + " ?");

	let solucion = numero_uno * numero_dos;

	if (solucion == respuesta) {
		console.log("¡Bien", usuario, "! Tu respuesta fue:", solucion, "Tenés:", i, " puntos.");
	} else {
		alert("¡PERDISTE!");
		console.log("¡Incorrecto", usuario, "! La respuesta correcta era:", solucion, ". Obtuviste ", i, "puntos.");
		jugar_otra_vez();
	}
	if (i == 10) {
		alert("10/10 ¡GANASTE!");
		jugar_otra_vez();
	}
}
