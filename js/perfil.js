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

function cargarConfig(config)
{
	let preguntas = document.getElementsByClassName("pregunta")
	preguntas[0].textContent = config.color + ":"
	preguntas[1].textContent = config.musica + ":"
	preguntas[2].textContent = config.libro + ":"
	preguntas[3].textContent = config.video_juego + ":"
	preguntas[4].textContent = config.lenguajes + ":"

	document.getElementById("email").textContent = config.email

}

function Main(){
	CargarJsonConfig();

}