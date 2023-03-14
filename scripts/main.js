// gif que cambia segun el clima optenido por api

let div_particulas = document.getElementById('div_particulas');

function cursor(posicion) {
	let lat = posicion.coords.latitude;
	let long = posicion.coords.longitude;

	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=174a18edc0ac641c5aa02dd32e489103`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.weather[0].id, data.weather[0].description);
			if (data.weather[0].id < 300) {
				//las descripciones de clima tienen un id, segun su id sale un gif diferente
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/thunderstorm.gif')"></div>`;
			} else if (data.weather[0].id < 400) {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/shower rain.gif')"></div>`;
			} else if (data.weather[0].id < 531) {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/rain.gif')"></div>`;
			} else if (data.weather[0].id < 800) {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/mist.gif')"></div>`;
			} else if (data.weather[0].id < 801) {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/clear sky.gif')"></div>`;
			} else if (data.weather[0].id < 802) {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/few clouds.gif')"></div>`;
			} else if (data.weather[0].id < 803) {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/scattered clouds.gif')"></div>`;
			} else {
				div_particulas.innerHTML = `<div id="particulas" style="background-image: url('/img/broken clouds.gif')"></div>`;
			}
		});
}

navigator.geolocation.getCurrentPosition(cursor);

document.addEventListener('mousemove', (e) => {
	//hacer que el gif este a 15pxd el cursos del mouse
	let particulas = document.getElementById('particulas');
	particulas.style.left = e.pageX + 15 + 'px';
	particulas.style.top = e.pageY + 15 + 'px';
});

//ranking
let ranking = [];
const rankingJSON = localStorage.getItem('ranking'); //obtener key con data de ultimo ranking
if (rankingJSON !== null) {
	ranking = JSON.parse(rankingJSON);
}

//desahabilitar el boton jugar por default si no se puso un nombre

let boton_jugar = document.getElementsByClassName('boton-jugar')[0];
boton_jugar.disabled = true;

let nombre_usuario = document.getElementById('nombre_jugador');
nombre_usuario.addEventListener('input', function () {
	if (nombre_usuario.value !== '') {
		boton_jugar.disabled = false;
		boton_jugar.style.border = '5px solid white';
		boton_jugar.addEventListener('click', function () {
			juego();
		});
	} else {
		boton_jugar.disabled = true;
	}
});

//poner los nombres del ranking en el html

let primero = '';
let segundo = '';
let tercero = '';
let cuarto = '';
let quinto = '';

let rank1 = document.getElementsByClassName('rank1')[0];
let rank2 = document.getElementsByClassName('rank2')[0];
let rank3 = document.getElementsByClassName('rank3')[0];
let rank4 = document.getElementsByClassName('rank4')[0];
let rank5 = document.getElementsByClassName('rank5')[0];

rank1.textContent = primero;
rank2.textContent = segundo;
rank3.textContent = tercero;
rank4.textContent = cuarto;
rank5.textContent = quinto;

//clase usuario
class Usuario {
	constructor(nombre, puntuacion) {
		this.nombre = nombre;
		this.fecha = new Date();
		this.puntuacion = puntuacion;
	}
}

//juego de 10 multiplicaciones de numeros random del 0 al 9
function juego() {
	//cambios en el html cuando se presiona JUGAR
	let juego = document.getElementsByClassName('juego')[0];
	juego.style.display = 'block';
	let main_page = document.getElementsByTagName('main')[0];
	main_page.style.display = 'none';

	//TIMER 30 segundos
	let seconds = 30;
	let timer = setInterval(function () {
		if (juego.style.display === 'none') {
			clearInterval(timer); // parar el timer si el boton juego no esta en display
			return;
		}
		seconds--;
		document.getElementById('timer').textContent = seconds;
		if (seconds === 0) {
			//si el timer llega a 0 perdés
			clearInterval(timer);
			Swal.fire({
				text: '¡Perdiste!',
				icon: 'error',
			});
			juego.style.display = 'none';
			main_page.style.display = 'block';
		}
	}, 1000);

	let preguntas = [];
	let respuestas = [];

	for (i = 0; i < 10; i++) {
		//generar las 10 preguntas y sus respectivas respuestas
		let numero_uno = parseInt(Math.random() * 10);
		let numero_dos = parseInt(Math.random() * 10);

		preguntas.push(numero_uno + ' x ' + numero_dos);
		respuestas.push(numero_uno * numero_dos);
	}

	let pregunta_actual = 0;
	let puntuacion = 0;

	function mostrar_pregunta() {
		//mostrar la multiplicacion en el html
		let multi = document.getElementById('multi');
		multi.textContent = preguntas[pregunta_actual];
	}

	function validar_respuesta() {
		let inputrta = document.getElementById('respuesta').value; //obetener input respuesta

		if (inputrta !== '') {
			let respuesta = inputrta;
			if (respuestas[pregunta_actual] == respuesta) {
				//verificar respuesta
				puntuacion++;
			}
		}
		if (typeof preguntas[pregunta_actual] !== 'undefined') {
			siguiente.value = 'Siguiente'; //borrar la respuesta del input
		}

		pregunta_actual++; //cambiar de pregunta

		if (pregunta_actual == 10) {
			//cuando no hayan mas preguntas finaliza el juego
			Swal.fire({
				text: 'Obtuviste ' + puntuacion + ' puntos.',
				icon: 'success',
			});

			let nombre = document.getElementById('nombre_jugador').value;
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
				quinto = ranking[4].nombre;
				rank5.textContent = quinto;
			}

			//update de la key "ranking" con el nuevo array de ranking
			const rankingJSON = JSON.stringify(ranking);
			localStorage.setItem('ranking', rankingJSON);

			//cuando se acaba el juego aparece la pantalla con el boton jugar
			let juego = document.getElementsByClassName('juego')[0];
			juego.style.display = 'none';
			let main_page = document.getElementsByTagName('main')[0];
			main_page.style.display = 'block';
		} else {
			mostrar_pregunta();
		}
	}

	mostrar_pregunta();

	// llamar funcion de validar respuesta al presionar enter
	let siguiente = document.getElementById('respuesta');
	siguiente.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
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
