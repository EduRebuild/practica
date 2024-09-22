$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {
        console.log("localStorage está disponible");
    } else {
        console.error("localStorage no está disponible en este navegador");
    }

    cargarUsuarios();

    $('#registrationForm').on('submit', function(event) {
        event.preventDefault();
        agregarUsuario();
    });
});

function agregarUsuario() {
    const nombre = $('#fullName').val();
    const email = $('#email').val();
    const telefono = $('#phone').val();
    const pais = $('#country').val();
    const edad = $('#age').val();
    const genero = $('#gender').val();
    const intereses = obtenerInteresesSeleccionados();

    if (validarFormulario(nombre, email, telefono, pais, edad, genero)) {
        const nuevoUsuario = {
            nombre,
            email,
            telefono,
            pais,
            edad,
            genero,
            intereses
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(nuevoUsuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        console.log("Usuarios actuales:", JSON.parse(localStorage.getItem('usuarios')));

        mostrarMensaje('Usuario registrado exitosamente.', 'success');
        $('#registrationForm')[0].reset();

        cargarUsuarios();
    } else {
        mostrarMensaje('Por favor, completa todos los campos correctamente.', 'danger');
    }
}

function obtenerInteresesSeleccionados() {
    const intereses = [];
    if ($('#interesesDeportes').is(':checked')) intereses.push('Deportes');
    if ($('#interesesMusica').is(':checked')) intereses.push('Música');
    if ($('#interesesTecnologia').is(':checked')) intereses.push('Tecnología');
    if ($('#interesesCine').is(':checked')) intereses.push('Cine');
    return intereses.join(', ');
}

function validarFormulario(nombre, email, telefono, pais, edad, genero) {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return nombre !== '' && emailPattern.test(email) && telefono !== '' && pais !== '' && edad !== '' && genero !== '';
}

function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tbody = $('#userTableBody');
    tbody.empty();

    if (usuarios.length === 0) {
        tbody.append('<tr><td colspan="8" class="text-center">No hay usuarios registrados.</td></tr>');
        return;
    }

    usuarios.forEach((usuario, index) => {
        const fila = `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.pais}</td>
                <td>${usuario.edad}</td>
                <td>${usuario.genero}</td>
                <td>${usuario.intereses}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.append(fila);
    });
}

function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cargarUsuarios();
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
    $('#formMessage').html(mensajeHTML);
    setTimeout(() => $('#formMessage').html(''), 3000);
}

function editarUsuario(index) {
}