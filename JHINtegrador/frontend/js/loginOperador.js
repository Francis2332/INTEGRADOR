document.addEventListener('DOMContentLoaded', function() { // Asegurarse de que el DOM esté completamente cargado
    // Verificar si hay una sesión activa al cargar la página
    const loggedInUser = localStorage.getItem('loggedInUser'); // Obtener el usuario logueado del almacenamiento local
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        const loginSection = document.getElementById('login-section');
        const clientOptionsSection = document.getElementById('client-options-section'); //Referencia a la sección de opciones del cliente
        if (loginSection && clientOptionsSection && welcomeUser) {
            loginSection.style.display = 'none';
            clientOptionsSection.style.display = 'block';
            welcomeUser.textContent = user.username;
        } else {
            console.error('Elementos HTML no encontrados:', { loginSection, clientOptionsSection, welcomeUser });
        }
    }

    // Toggle para mostrar/ocultar contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('contrasena');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Manejo del formulario de login
    const loginForm = document.getElementById('client-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value.trim();
            const contrasena = document.getElementById('contrasena').value.trim();

            if (!usuario || !contrasena) {
                showAlert('Usuario y contraseña son obligatorios', 'warning');
                return;
            }

            try {
                console.log('Enviando solicitud a /api/auth/login con:', { usuario, contrasena }); // Depuración añadida
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario, contrasena })
                });
                const data = await response.json();
                console.log('Respuesta del servidor:', data); // Depuración añadida

                if (response.ok) {
                    if (data.message && data.message.includes('Login exitoso')) {
                        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                        const loginSection = document.getElementById('login-section');
                        const clientOptionsSection = document.getElementById('client-options-section');
                        const welcomeUser = document.getElementById('welcome-user');
                        if (loginSection && clientOptionsSection && welcomeUser) {
                            loginSection.style.display = 'none';
                            clientOptionsSection.style.display = 'block';
                            welcomeUser.textContent = data.user.username;
                        } else {
                            console.error('Elementos HTML no encontrados después del login');
                        }
                    } else {
                        showAlert(data.error || 'Credenciales incorrectas', 'danger');
                    }
                } else {
                    showAlert(data.error || 'Error en el servidor', 'danger');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                showAlert('No se pudo conectar al servidor', 'danger');
            }
        });
    } else {
        console.error('Formulario client-login-form no encontrado');
    }

    // Manejo del botón de logout
    const logoutBtn = document.getElementById('logout-btn'); //Aquí se referencia el botón de logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');        // Eliminar la sesión del almacenamiento local
            const clientOptionsSection = document.getElementById('client-options-section'); //Referencia a la sección de opciones del cliente
            const loginSection = document.getElementById('login-section');
            if (clientOptionsSection && loginSection) {
                clientOptionsSection.style.display = 'none';
                loginSection.style.display = 'block';
                document.getElementById('client-login-form').reset();
            } else {
                console.error('Elementos HTML no encontrados en logout');
            }
        });
    } else {
        console.error('Botón logout-btn no encontrado');
    }

    // Función auxiliar para mostrar alertas (puedes moverla a utils.js)
    function showAlert(message, type) {
        const existingAlert = document.querySelector('.alert-danger');
        if (existingAlert) existingAlert.remove();
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-custom mt-3`;
        alertDiv.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
        document.querySelector('.login-card')?.appendChild(alertDiv);
        if (type !== 'danger') {
            setTimeout(() => alertDiv.remove(), 3000);
        }
    }
});