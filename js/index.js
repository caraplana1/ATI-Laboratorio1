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

function cargarConfig(config){
	document.getElementById("titulo-index").textContent = config.sitio[0] + " " + config.sitio[1] + " " + config.sitio[2]
	document.getElementById("saludo").textContent = config.saludo + ", "
	document.getElementById("footer").innerText = config.copyRight
	document.getElementById("button").innerText = config.buscar
	let placeholder = document.getElementsByName("Nombre")
	placeholder[0].placeholder = " " + config.nombre
}

function Main()
{
	CargarJsonConfig();
}