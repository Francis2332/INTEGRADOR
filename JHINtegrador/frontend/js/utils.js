// frontend/js/utils.js
export function showAlert(message, type, containerSelector = '.card-body', timeout = 4000) {
  // Tu código de alertas
  // Remover alertas existentes
                const existingAlert = document.querySelector('.custom-alert');
                if (existingAlert) {
                    existingAlert.remove();
                }
                // Crear nueva alerta
                const alertDiv = document.createElement('div');
                alertDiv.className = `custom-alert alert-${type}`;
                alertDiv.style.cssText = `
                    border-radius: 10px;
                    padding: 1rem 1.5rem;
                    margin-bottom: 1.5rem;
                    border-left: 4px solid ${type === 'success' ? '#198754' :
                        type === 'warning' ? '#ffc107' :
                            '#dc3545'
                    };
                    background: ${type === 'success' ? 'rgba(25, 135, 84, 0.1)' :
                        type === 'warning' ? 'rgba(255, 193, 7, 0.1)' :
                            'rgba(220, 53, 69, 0.1)'
                    };
                    color: var(--color-dark);
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


export function setupPasswordToggle(toggleId, inputId) {
  // Tu código de toggle
}