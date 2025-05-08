document.addEventListener('DOMContentLoaded', Main());

// Modificar función CargarJsonConfig (igual que en index.js)
function CargarJsonConfig() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'ES';

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
        fetch('../conf/configES.json')
        .then(res => res.json())
        .then(config => cargarConfig(config));
    });
}

function CargarJsonAlumni() {
    const ci = new URLSearchParams(window.location.search).get('ci');
    if (!ci) throw new Error('Parámetro "ci" no encontrado en la URL');

    fetch(`../${ci}/perfil.json`)
    .then(respuesta => {
        if (!respuesta.ok) throw new Error('Perfil no encontrado');
        return respuesta.json();
    })
    .then(datos => {
        // Actualizar ruta de la imagen con el CI
        datos.imagen = `../${ci}/${ci}.jpg`;
        const datosActualizados = mezclarConURL(datos);
        CargarAlumno(datosActualizados);
    })
    .catch(console.error);
}

function mezclarConURL(datos) {
    const params = new URLSearchParams(window.location.search);
    return {
        ...datos,
        nombre: params.get('nombre') || datos.nombre,
        descripcion: params.get('descripcion') || datos.descripcion,
        color: params.get('color') || datos.color,
        musica: params.get('musica') || datos.musica,
        libro: params.get('libro') || datos.libro,
        video_juego: params.get('video_juego') || datos.video_juego,
        lenguajes: params.get('lenguajes') || datos.lenguajes,
        email: params.get('email') || datos.email,
        imagen: datos.imagen 
    };
}

function aplicarParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    
    const emailURL = params.get('email');
    if (emailURL) {
        const emailElement = document.getElementById('email');
        emailElement.textContent = emailURL;
        emailElement.href = `mailto:${emailURL}`;
    }

}

function cargarConfig(config) {
    document.querySelectorAll(".pregunta").forEach((elemento, index) => {
        elemento.textContent = [
            config.color,
            config.musica,
            config.libro,
            config.video_juego,
            config.lenguajes
        ][index] + ":";
    });
}

function CargarAlumno(datos) {
    const ci = new URLSearchParams(window.location.search).get('ci');

    document.getElementById("titulo-tarjeta").textContent = datos.nombre;
    document.getElementById("descripcion").textContent = datos.descripcion;
    
    const campos = ['color', 'musica', 'libro', 'video_juego', 'lenguajes'];
    document.querySelectorAll('.derecha').forEach((elemento, index) => {
        elemento.innerHTML = index === 4 ? `<strong>${datos[campos[index]]}</strong>` : datos[campos[index]];
    });

    const img = document.getElementById('foto-perfil');
    img.alt = `Foto de ${datos.nombre}`;
    
    const testImage = new Image();
    testImage.src = datos.imagen;
    testImage.onerror = () => {
        img.src = datos.imagen.replace('.jpg', '.png');
    };
    testImage.onload = () => {
        img.src = datos.imagen;
    };
}

function Main() {
    CargarJsonConfig();
    CargarJsonAlumni();
}