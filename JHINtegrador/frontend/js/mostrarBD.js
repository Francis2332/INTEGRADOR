
// Archivo: JHINtegrador/frontend/js/mostrarBD.js
// Script para mostrar y ordenar usuarios desde la base de datos
let users = []; // Variable global para almacenar los usuarios
        // Obtiene los usuarios desde la API y los almacena en la variable users
        async function fetchUsers(orderBy = 'id', order = 'asc') {
            try {
                const response = await fetch('http://localhost:3000/api/usuarios');
                if (!response.ok) throw new Error('Error al obtener usuarios');
                users = await response.json();
                sortAndDisplayUsers(orderBy, order);
            } catch (error) {
                alert(error.message);
            }
        }
        // Ordena y muestra los usuarios en la tabla
        function sortAndDisplayUsers(column, order) {
            users.sort((a, b) => {
                let valA = a[column];
                let valB = b[column];
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return order === 'asc' ? -1 : 1;
                if (valA > valB) return order === 'asc' ? 1 : -1;
                return 0;
            });
            displayUsers();
            updateSortIcons(column, order);
        }
        // Muestra los usuarios en la tabla
        function displayUsers() {
            const tbody = document.querySelector('#users-table tbody');
            tbody.innerHTML = '';
            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.nombreCompleto}</td>
                    <td>${user.rolId}</td>

                `;
                tbody.appendChild(tr);
            });
        }
        // Actualiza los íconos de ordenamiento en los encabezados de la tabla
        function updateSortIcons(column, order) {
            const headers = document.querySelectorAll('#users-table th');
            headers.forEach(th => {
                if (th.dataset.column === column) {
                    th.dataset.order = order;
                    th.innerHTML = th.innerText.replace(/[\u25B2\u25BC]/g, '') + (order === 'asc' ? ' &#9650;' : ' &#9660;');
                } else {
                    th.dataset.order = 'asc';
                    th.innerHTML = th.innerText.replace(/[\u25B2\u25BC]/g, '');
                }
            });
        }
        // Inicializa la tabla al cargar la página
        document.querySelectorAll('#users-table th').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.column;
                const currentOrder = th.dataset.order;
                const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
                sortAndDisplayUsers(column, newOrder);
            });
            // Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Asocia el evento click al botón de listar operarios
    const btnListar = document.getElementById("btnListar");
    if (btnListar) {
        btnListar.addEventListener("click", () => {
            fetchUsers();
        });
    }

    // Asocia el evento de ordenamiento a los encabezados de la tabla
    document.querySelectorAll('#users-table th').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.column;
            const currentOrder = th.dataset.order;
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            sortAndDisplayUsers(column, newOrder);
        });
    });
});

        });
