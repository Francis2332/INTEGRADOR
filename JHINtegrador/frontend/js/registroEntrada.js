      
      import { showAlert } from './utils.js'; // importando la función showAlert desde utils.js 


        document.addEventListener('DOMContentLoaded', function () {
            // Cargar entradas existentes al cargar la página
            loadEntries();

            // Establecer hora actual en el campo de hora de entrada
            const now = new Date();
            const localDateTime = now.toISOString().slice(0, 16);
            document.getElementById('horaEntrada').value = localDateTime;

            // Efectos de elevación en focus
            const inputs = document.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.addEventListener('focus', function () {
                    this.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', function () {
                    this.parentElement.classList.remove('focused');
                });
            });

            // Manejo del formulario
            document.getElementById('register-entry-form').addEventListener('submit', async function (e) {
                e.preventDefault();

                const dni = document.getElementById('dni').value.trim();
                const telefono = document.getElementById('telefono').value.trim();
                const nombre = document.getElementById('nombre').value.trim();
                const primerApellido = document.getElementById('primerApellido').value.trim();
                const segundoApellido = document.getElementById('segundoApellido').value.trim();
                const placa = document.getElementById('placa').value.trim().toUpperCase();
                const tipoVehiculoId = document.getElementById('tipoVehiculoId').value;
                const espacioId = document.getElementById('espacioId').value;
                const horaEntrada = document.getElementById('horaEntrada').value;
                const observaciones = document.getElementById('observaciones').value.trim();

                // Validación básica
                if (!dni || !telefono || !nombre || !primerApellido || !segundoApellido || !placa || !tipoVehiculoId || !espacioId || !horaEntrada) {
                    showAlert('Por favor, complete todos los campos obligatorios.', 'warning');
                    return;
                }

                // Validar DNI (simple, 8 dígitos)
                const dniRegex = /^\d{8}$/;
                if (!dniRegex.test(dni)) {
                    showAlert('DNI inválido. Debe contener 8 dígitos.', 'warning');
                    return;
                }

                // Validar teléfono (simple)
                const telefonoRegex = /^\d{9}$/;
                if (!telefonoRegex.test(telefono)) {
                    showAlert('Teléfono inválido. Debe contener 9 dígitos.', 'warning');
                    return;
                }

                // Validar formato de placa (simple)
                const placaRegex = /^[A-Z]{3}-\d{3}$/;
                if (!placaRegex.test(placa)) {
                    showAlert('Formato de placa inválido. Use formato AAA-123.', 'warning');
                    return;
                }

                console.log('Enviando datos:', { dni, telefono, nombre, primerApellido, segundoApellido, placa, tipoVehiculoId, espacioId, horaEntrada, observaciones });

                try {
                    // Mostrar indicador de carga
                    const submitBtn = document.querySelector('.btn-elegant');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Registrando...';
                    submitBtn.disabled = true;

                    // Conectar al backend
                    const response = await fetch('http://localhost:3000/api/registrar-entrada', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ dni, telefono, nombre, primerApellido, segundoApellido, placa, tipoVehiculoId, espacioId, horaEntrada, observaciones })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showAlert('✓ Entrada de vehículo registrada exitosamente', 'success');

                        // Agregar fila a la tabla
                        addRowToTable(dni, telefono, nombre, primerApellido, segundoApellido, placa, tipoVehiculoId, espacioId, horaEntrada, observaciones);

                        // Limpiar formulario después de éxito
                        document.getElementById('register-entry-form').reset();
                        // Resetear hora
                        const now = new Date();
                        const localDateTime = now.toISOString().slice(0, 16);
                        document.getElementById('horaEntrada').value = localDateTime;

                        // No redirigir, mantener en la página para ver la tabla
                    } else {
                        showAlert(data.error || 'Error al registrar la entrada', 'error');
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

            // Función para agregar fila a la tabla
            function addRowToTable(dni, telefono, nombre, primerApellido, segundoApellido, placa, tipoVehiculoId, espacioId, horaEntrada, observaciones) {
                const tableBody = document.querySelector('#registros-table tbody');

                // Obtener texto del tipo de vehículo
                const tipoVehiculoSelect = document.getElementById('tipoVehiculoId');
                const tipoVehiculoText = tipoVehiculoSelect.options[tipoVehiculoSelect.selectedIndex].text;

                // Obtener texto del espacio
                const espacioSelect = document.getElementById('espacioId');
                const espacioText = espacioSelect.options[espacioSelect.selectedIndex].text;

                // Nombre completo
                const nombreCompleto = `${nombre} ${primerApellido} ${segundoApellido}`;

                // Crear fila
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${dni}</td>
                    <td>${nombreCompleto}</td>
                    <td>${telefono}</td>
                    <td>${placa}</td>
                    <td>${tipoVehiculoText}</td>
                    <td>${espacioText}</td>
                    <td>${horaEntrada.replace('T', ' ')}</td>
                    <td>${observaciones || 'N/A'}</td>
                `;

                // Agregar fila al inicio de la tabla
                tableBody.insertBefore(row, tableBody.firstChild);

                // Ocultar mensaje de no registros si es la primera fila
                const noRecords = document.getElementById('no-records');
                if (noRecords.style.display !== 'none') {
                    noRecords.style.display = 'none';
                }
            }

            // Función para cargar entradas desde la base de datos
            async function loadEntries() {
                try {
                    const response = await fetch('http://localhost:3000/api/entradas');
                    const entries = await response.json();

                    if (response.ok && entries.length > 0) {
                        const tableBody = document.querySelector('#registros-table tbody');
                        tableBody.innerHTML = ''; // Limpiar tabla

                        entries.forEach(entry => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${entry.dni}</td>
                                <td>${entry.nombre} ${entry.primerApellido} ${entry.segundoApellido}</td>
                                <td>${entry.telefono}</td>
                                <td>${entry.placa}</td>
                                <td>${entry.tipoVehiculo}</td>
                                <td>${entry.espacio}</td>
                                <td>${new Date(entry.horaEntrada).toLocaleString()}</td>
                                <td>${entry.observaciones || 'N/A'}</td>
                            `;
                            tableBody.appendChild(row);
                        });

                        // Ocultar mensaje de no registros
                        document.getElementById('no-records').style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error al cargar entradas:', error);
                }
            }

            // Función para mostrar alertas elegantes
        
               
                
        }
        );