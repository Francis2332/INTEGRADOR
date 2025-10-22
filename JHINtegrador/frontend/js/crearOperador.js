document.addEventListener('DOMContentLoaded', function() {
            // Toggle para mostrar/ocultar contraseña
            const togglePassword = document.getElementById('togglePassword');
            const passwordInput = document.getElementById('password');
            
            if (togglePassword && passwordInput) {
                togglePassword.addEventListener('click', function() {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
                });
            }
            
            // Efectos de elevación en focus
            const inputs = document.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });
            
            // Manejo del formulario
            document.getElementById('create-user-form').addEventListener('submit', async function (e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const nombreCompleto = document.getElementById('nombreCompleto').value;
                const rolId = document.getElementById('rolId').value;
                
                // Validación básica
                if (!username || !password || !nombreCompleto || !rolId) {
                    showAlert('Por favor, complete todos los campos.', 'warning');
                    return;
                }
                
                if (password.length < 6) {
                    showAlert('La contraseña debe tener al menos 6 caracteres.', 'warning');
                    return;
                }
                
                console.log('Enviando datos:', { username, password, nombreCompleto, rolId });
                
                try {
                    // Mostrar indicador de carga
                    const submitBtn = document.querySelector('.btn-elegant');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creando...';
                    submitBtn.disabled = true;
                     // Enviar datos al backend
                    const response = await fetch('http://localhost:3000/api/usuarios', {
                        method: 'POST', // Asegúrate de que la URL y el puerto coincidan con tu configuración de backend
                        headers: { 'Content-Type': 'application/json' }, // Indica que se envía JSON
                        body: JSON.stringify({ username, password, nombreCompleto, rolId })
                    });
                    
                    console.log('Respuesta:', response.status, response.statusText); // Depuración básica
                    const data = await response.json(); // Parsear  la respuesta JSON
                    console.log('Datos respuesta:', data); // Depuración de datos
                    
                     // Manejar la respuesta del servidor
                    
                    if (response.ok) {
                        showAlert('✓ Usuario creado exitosamente', 'success');
                        setTimeout(() => {
                            window.location.href = 'administrador.html';
                        }, 1500);
                    } else {
                        showAlert(data.error || 'Error al crear el usuario', 'error');
                    }
                } catch (error) {
                    console.error('Error de conexión:', error);
                    showAlert('Error de conexión con el servidor', 'error');
                } finally {
                    // Restaurar botón
                    const submitBtn = document.querySelector('.btn-elegant');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
            
            // Función para mostrar alertas elegantes
            function showAlert(message, type) {
                // Remover alertas existentes
                const existingAlert = document.querySelector('.custom-alert');
                if (existingAlert) {
                    existingAlert.remove();
                }
                
                const alertDiv = document.createElement('div');
                alertDiv.className = `custom-alert alert-${type}`;
                alertDiv.style.cssText = `
                    border-radius: 10px;
                    padding: 1rem 1.5rem;
                    margin-bottom: 1.5rem;
                    border-left: 4px solid ${
                        type === 'success' ? '#27ae60' : 
                        type === 'warning' ? '#f39c12' : 
                        '#e74c3c'
                    };
                    background: ${
                        type === 'success' ? 'rgba(39, 174, 96, 0.1)' : 
                        type === 'warning' ? 'rgba(243, 156, 18, 0.1)' : 
                        'rgba(231, 76, 60, 0.1)'
                    };
                    color: var(--color-text);
                    animation: fadeIn 0.3s ease;
                `;
                
                const icon = type === 'success' ? 'fa-check-circle' : 
                           type === 'warning' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';
                
                alertDiv.innerHTML = `
                    <i class="fas ${icon} me-2"></i>${message}
                `;
                
                document.querySelector('.card-body').insertBefore(alertDiv, document.querySelector('form'));
                
                // Auto-remover después de 4 segundos si no es éxito
                if (type !== 'success') {
                    setTimeout(() => {
                        if (alertDiv.parentElement) {
                            alertDiv.style.opacity = '0';
                            alertDiv.style.transition = 'opacity 0.3s';
                            setTimeout(() => alertDiv.remove(), 300);
                        }
                    }, 4000);
                }
            }
        });