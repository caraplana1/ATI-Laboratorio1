document.addEventListener('DOMContentLoaded', Main);

let allStudents = [];
let currentConfig = {};

function CargarJsonConfig() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'ES';

    return fetch(`../conf/config${lang.toUpperCase()}.json`)
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Idioma no soportado');
            return respuesta.json();
        })
        .then(config => {
            currentConfig = config;
            cargarConfig(config);
            aplicarParametrosURL();
            return config;
        })
        .catch(error => {
            console.error('Error:', error);
            return fetch('../conf/configES.json')
                .then(res => res.json())
                .then(config => {
                    currentConfig = config;
                    cargarConfig(config);
                    return config;
                });
        });
}

function cargarConfig(config) {
    document.getElementById("titulo-index").textContent = config.sitio[0] + " " + config.sitio[1] + " " + config.sitio[2];
    document.getElementById("saludo").textContent = config.saludo + ", ";
    document.getElementById("footer").innerText = config.copyRight;
    document.getElementById("button").innerText = config.buscar;
    let placeholder = document.getElementsByName("Nombre");
    placeholder[0].placeholder = " " + config.nombre;
}

function cargarEstudiantes() {
    const langParam = new URLSearchParams(window.location.search).get('lang');
    
    return fetch('../datos/index.json')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al cargar datos');
            return respuesta.json();
        })
        .then(datos => {
            allStudents = datos;
            mostrarEstudiante(datos, langParam);
            return datos;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarEstudiante(datos, langParam) {
    let lista = document.getElementById("estudiantes");
    lista.innerHTML = '';
    
    datos.forEach(persona => {
        const li = document.createElement('li');
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        const enlace = document.createElement('a');

        img.className = 'portada';
        img.src = persona.imagen;
        img.alt = `Foto de ${persona.nombre}`;
        img.loading = 'lazy';
        
        enlace.name = 'persona';
        enlace.href = `perfil.html?ci=${persona.ci}${langParam ? `&lang=${langParam}` : ''}`;
        enlace.textContent = persona.nombre;
        enlace.classList.add('enlace-perfil');

        picture.appendChild(img);
        li.appendChild(picture);
        li.appendChild(enlace);
        
        lista.appendChild(li);
    });
}

function filterStudents(query) {
    const langParam = new URLSearchParams(window.location.search).get('lang');
    const filtered = allStudents.filter(student => 
        student.nombre.toLowerCase().includes(query.toLowerCase())
    );
    
    const lista = document.getElementById("estudiantes");
    lista.innerHTML = '';
    
    if (filtered.length === 0 && query !== '') {
        const error = document.createElement('h1');
		error.id = "error"
        error.textContent = `${currentConfig.noResultados} ${query}`;
        lista.appendChild(error);
    } else {
        mostrarEstudiante(filtered, langParam);
    }
}

function setupSearch() {
    const searchInput = document.querySelector('input[name="Nombre"]');
    searchInput.addEventListener('input', (e) => {
        filterStudents(e.target.value.trim());
    });
}

function aplicarParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    const emailURL = params.get('email');
}

async function Main() {
    try {
        await CargarJsonConfig();
        await cargarEstudiantes();
        setupSearch();
    } catch (error) {
        console.error('Error en inicialización:', error);
    }
}