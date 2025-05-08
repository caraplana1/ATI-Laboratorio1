document.addEventListener('DOMContentLoaded', Main());

function CargarJsonConfig() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'ES'; // Idioma por defecto: Español

    fetch(`../conf/config${lang.toUpperCase()}.json`)
    .then(respuesta => {
        if (!respuesta.ok) throw new Error('Idioma no soportado');
        return respuesta.json();
    })
    .then(config => {
        cargarConfig(config);
        aplicarParametrosURL();
    })
    .catch(error => {
        console.error('Error:', error);
        // Fallback a Español
        fetch('../conf/configES.json')
        .then(res => res.json())
        .then(config => cargarConfig(config));
    });
}

function cargarConfig(config){
    document.getElementById("titulo-index").textContent = config.sitio[0] + " " + config.sitio[1] + " " + config.sitio[2];
    document.getElementById("saludo").textContent = config.saludo + ", ";
    document.getElementById("footer").innerText = config.copyRight;
    document.getElementById("button").innerText = config.buscar;
    let placeholder = document.getElementsByName("Nombre");
    placeholder[0].placeholder = " " + config.nombre;
}

function cargarEstudiantes(){
    const langParam = new URLSearchParams(window.location.search).get('lang');
    
    fetch('../datos/index.json')
    .then(respuesta => {
        if (!respuesta.ok) throw new Error('Error al cargar datos');
        return respuesta.json();
    })
    .then(datos => {
        mostrarEstudiante(datos, langParam);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarEstudiante(datos, langParam){
    let lista = document.getElementById("estudiantes");
    datos.forEach(persona => {
        const li = document.createElement('li');
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        const enlace = document.createElement('a');

        // Configurar elementos
        img.className = 'portada';
        img.src = persona.imagen;
        img.alt = `Foto de ${persona.nombre}`;
        img.loading = 'lazy';
        
        enlace.name = 'persona';
        // Mantener parámetro de idioma en el enlace
        enlace.href = `perfil.html?ci=${persona.ci}${langParam ? `&lang=${langParam}` : ''}`;
        enlace.textContent = persona.nombre;
        enlace.classList.add('enlace-perfil');

        picture.appendChild(img);
        li.appendChild(picture);
        li.appendChild(enlace);
        
        lista.appendChild(li);
    });
}

function aplicarParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    const emailURL = params.get('email');
}

function Main() {
    CargarJsonConfig();
    cargarEstudiantes();
}