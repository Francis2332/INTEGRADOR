document.addEventListener('DOMContentLoaded', function() {
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
            
            // Función para mostrar panel admin
            function showAdminPanel(usuario) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('admin-options-section').style.display = 'block';
                document.getElementById('welcome-admin').textContent = usuario;
            }

            // Verificar sesión guardada en localStorage
            window.onload = function() {
                const loggedInUser = localStorage.getItem('adminUser');
                if (loggedInUser) {
                    showAdminPanel(loggedInUser);
                }
            };

            // Función para validar contraseña
            function validatePassword(pwd) {
                if (pwd.length < 8) {
                    return 'La contraseña debe tener al menos 8 caracteres.';
                }
                if (pwd.length > 8) {
                    return 'La contraseña debe tener máximo 8 caracteres.';
                }
                if (!/[a-zA-Z]/.test(pwd)) {
                    return 'La contraseña debe contener al menos una letra.';
                }
                if (!/[A-Z]/.test(pwd)) {
                    return 'La contraseña debe contener al menos una mayúscula.';
                }
                if (!pwd.includes('@')) {
                    return 'La contraseña debe contener el caracter especial "@".';
                }
                return null; // Válida
            }

            // Manejo del formulario de login
            document.getElementById('admin-login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const usuario = document.getElementById('usuario').value;
                const contrasena = document.getElementById('contrasena').value;

                // Validar usuario
                if (usuario !== 'root') {
                    if (!document.querySelector('.alert-danger')) {
                        const alertDiv = document.createElement('div');
                        alertDiv.className = 'alert alert-danger alert-custom mt-3';
                        alertDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Usuario de administrador incorrecto';
                        document.querySelector('.login-card').appendChild(alertDiv);

                        setTimeout(() => {
                            alertDiv.remove();
                        }, 3000);
                    }
                    return;
                }

                // Validar contraseña
                const passwordError = validatePassword(contrasena);
                if (passwordError) {
                    if (!document.querySelector('.alert-danger')) {
                        const alertDiv = document.createElement('div');
                        alertDiv.className = 'alert alert-danger alert-custom mt-3';
                        alertDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>' + passwordError;
                        document.querySelector('.login-card').appendChild(alertDiv);

                        setTimeout(() => {
                            alertDiv.remove();
                        }, 3000);
                    }
                    return;
                }

                // Credenciales válidas
                localStorage.setItem('adminUser', usuario);
                showAdminPanel(usuario);
            });

            // Manejo del botón de logout
            document.getElementById('logout-btn').addEventListener('click', function() {
                localStorage.removeItem('adminUser');
                document.getElementById('admin-options-section').style.display = 'none';
                document.getElementById('login-section').style.display = 'block';
                document.getElementById('admin-login-form').reset();
            });
        });