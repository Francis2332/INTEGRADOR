// Escucha cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón para mostrar/ocultar contraseña y el campo de contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('contrasena');
    
    // Configura el toggle de visibilidad de la contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Cambia el tipo de input entre 'password' y 'text'
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Cambia el ícono entre ojo abierto y cerrado
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Función para mostrar alertas de error o éxito
    function showAlert(message, type) {
        // Crea un div para la alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-custom mt-3`;
        // Añade ícono según el tipo de alerta
        alertDiv.innerHTML = `<i class="fas fa-${type === 'danger' ? 'exclamation-circle' : 'check-circle'} me-2"></i>${message}`;
        // Inserta la alerta en el contenedor del formulario
        document.querySelector('.login-card').appendChild(alertDiv);
        // Elimina la alerta después de 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Manejo del formulario de login
    document.getElementById('admin-login-form').addEventListener('submit', async function(e) {
        e.preventDefault(); // Evita el envío por defecto del formulario
        // Obtiene los valores de usuario y contraseña
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        // Validación del lado del cliente
        if (usuario !== 'root' || contrasena !== 'Root@123') {
            showAlert('Credenciales incorrectas. Use: root / Root@123', 'danger');
            return;
        }

        // Validación del lado del servidor
        try {
            // Envía una solicitud POST al endpoint /api/login
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, contrasena })
            });

            const data = await response.json();
            if (response.ok) {
                // Guarda el usuario en localStorage
                localStorage.setItem('adminUser', usuario);
                // Redirige al panel de administración
                window.location.href = 'administrador.html';
            } else {
                // Muestra el error del servidor
                showAlert(data.error || 'Error al iniciar sesión', 'danger');
            }
        } catch (error) {
            // Maneja errores de conexión
            console.error('Error en la solicitud de login:', error);
            showAlert('Error en la conexión con el servidor', 'danger');
        }
    });
});