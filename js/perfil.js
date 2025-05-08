document.addEventListener('DOMContentLoaded', Main());

function CargarJsonConfig() {
    fetch('../conf/configES.json')
    .then(respuesta => {
        if (!respuesta.ok) throw new Error('Error al cargar la configuración');
        return respuesta.json();
    })
    .then(config => {
        cargarConfig(config);
        aplicarParametrosURL(); // Nueva función integrada
    })
    .catch(console.error);
}

function CargarJsonAlumni() {
    fetch('./../27597219/perfil.json')
    .then(respuesta => {
        if (!respuesta.ok) throw new Error('Error al cargar el perfil');
        return respuesta.json();
    })
    .then(datos => {
        const datosActualizados = mezclarConURL(datos); // Combina JSON + parámetros
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
        imagen: params.get('foto') || datos.imagen
    };
}

function aplicarParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Actualización directa del email
    const emailURL = params.get('email');
    if (emailURL) {
        const emailElement = document.getElementById('email');
        emailElement.textContent = emailURL;
        emailElement.href = `mailto:${emailURL}`;
    }

    // Actualización de imagen
    const fotoURL = params.get('foto');
    if (fotoURL) {
        document.getElementById('foto-perfil').src = fotoURL;
    }
}

// Resto de funciones se mantienen igual...
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
    document.getElementById("nombre").textContent = datos.nombre;
    document.getElementById("descripcion").textContent = datos.descripcion;
    
    const campos = ['color', 'musica', 'libro', 'video_juego', 'lenguajes'];
    document.querySelectorAll('.derecha').forEach((elemento, index) => {
        elemento.textContent = index === 4 ? `<strong>${datos[campos[index]]}</strong>` : datos[campos[index]];
    });

    if (datos.imagen) {
        document.getElementById('foto-perfil').src = datos.imagen;
    }
}

function Main() {
    CargarJsonConfig();
    CargarJsonAlumni();
}