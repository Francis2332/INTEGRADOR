
        document.addEventListener('DOMContentLoaded', function() {
            // Verificar si hay una sesión activa al cargar la página
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const user = JSON.parse(loggedInUser);
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('client-options-section').style.display = 'block';
                document.getElementById('welcome-user').textContent = user.username;
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
            document.getElementById('client-login-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                const usuario = document.getElementById('usuario').value;
                const contrasena = document.getElementById('contrasena').value;

                try {
                    const response = await fetch('http://localhost:3000/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ usuario, contrasena })
                    });
                    const data = await response.json();
                    if (response.ok && data.message === 'Login exitoso') {
                        // Guardar sesión en localStorage
                        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                        document.getElementById('login-section').style.display = 'none';
                        document.getElementById('client-options-section').style.display = 'block';
                        document.getElementById('welcome-user').textContent = data.user.username;
                    } else {
                        // Crear alerta de error
                        if (!document.querySelector('.alert-danger')) {
                            const alertDiv = document.createElement('div');
                            alertDiv.className = 'alert alert-danger alert-custom mt-3';
                            alertDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>' + (data.error || 'Usuario o contraseña incorrectos');
                            document.querySelector('.login-card').appendChild(alertDiv);

                            // Eliminar la alerta después de 3 segundos
                            setTimeout(() => {
                                alertDiv.remove();
                            }, 3000);
                        }
                    }
                } catch (error) {
                    console.error('Error de conexión:', error);
                    // Crear alerta de error
                    if (!document.querySelector('.alert-danger')) {
                        const alertDiv = document.createElement('div');
                        alertDiv.className = 'alert alert-danger alert-custom mt-3';
                        alertDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Error de conexión';
                        document.querySelector('.login-card').appendChild(alertDiv);

                        // Eliminar la alerta después de 3 segundos
                        setTimeout(() => {
                            alertDiv.remove();
                        }, 3000);
                    }
                }
            });

            // Manejo del botón de logout
            document.getElementById('logout-btn').addEventListener('click', function() {
                // Eliminar sesión de localStorage
                localStorage.removeItem('loggedInUser');
                document.getElementById('client-options-section').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
                document.getElementById('client-login-form').reset();
            });
        });
