// import { config } from "../conf/configES";

document.addEventListener('DOMContentLoaded', Main());

function CargarJsonConfig() {
	fetch('../conf/configES.json')
	.then(respuesta => {
		if (!respuesta.ok) throw new Error('Error al cargar la configuración');
		return respuesta.json();
	})
	.then(config => {
		cargarConfig(config);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function CargarJsonAlumni() {
	fetch('./../27597219/perfil.json')
	.then(respuesta => {
		if (!respuesta.ok) throw new Error('Error al cargar la configuración');
		return respuesta.json();
	})
	.then(datos => {
		CargarAlumno(datos);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function cargarConfig(config) {
	let preguntas = document.getElementsByClassName("pregunta")
	preguntas[0].textContent = config.color + ":"
	preguntas[1].textContent = config.musica + ":"
	preguntas[2].textContent = config.libro + ":"
	preguntas[3].textContent = config.video_juego + ":"
	preguntas[4].textContent = config.lenguajes + ":"

	document.getElementById("email").textContent = config.email

}

function CargarAlumno(datos) {
	document.getElementById("titulo-tarjeta").textContent = datos.nombre
	document.getElementById("description").textContent = datos.descripcion
	respuestas = document.getElementsByClassName("derecha")
	respuestas[0].textContent = datos.color
	respuestas[1].textContent = datos.musica
	respuestas[2].textContent = datos.libro
	respuestas[3].textContent = datos.video_juego
	respuestas[4].textContent = datos.lenguajes
	let email = document.getElementsByClassName("email")[0]
	email.href= "mailto:" + datos.email
	email.textContent = datos.email
}

function Main(){
	CargarJsonConfig();
	CargarJsonAlumni();
}