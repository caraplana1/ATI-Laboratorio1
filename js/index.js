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

function cargarEstudiantes(){
	fetch('../datos/index.json')
	.then(respuesta => {
		if (!respuesta.ok) throw new Error('Error al cargar la configuración');
		return respuesta.json();
	})
	.then(datos => {
		mostrarEstudiante(datos)
	})
	.catch(error => {
		console.error('Error:', error);
	});

}

function mostrarEstudiante(datos){
	let lista = document.getElementById("estudiantes")
	datos.forEach(persona => {
		const li = document.createElement('li');
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        const enlace = document.createElement('a');

        // Configurar elementos
		img.className = 'portada';
        img.src = persona.imagen;
        img.alt = `Foto de ${persona.nombre}`;
        img.loading = 'lazy'; // Optimización de carga
        
        enlace.name = 'persona';
        enlace.href = `perfil.html?ci=${persona.ci}`; // Enlace al perfil con parámetro CI
        enlace.textContent = persona.nombre;
        enlace.classList.add('enlace-perfil');

        // Estructurar elementos
        picture.appendChild(img);
        li.appendChild(picture);
        li.appendChild(enlace);
        
        // Agregar a la lista
        lista.appendChild(li);
	});
}

function Main()
{
	CargarJsonConfig();
	cargarEstudiantes();
}