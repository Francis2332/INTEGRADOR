const API_URL = "http://localhost:3000/api/usuarios";

/*/ Cargar usuarios en la tabla
async function cargarUsuarios() {
  try {
    const response = await fetch(API_URL);
    const usuarios = await response.json();

    const tbody = document.getElementById("usuarios-body");
    tbody.innerHTML = "";

    if (usuarios.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>No hay usuarios registrados</td></tr>";
      return;
    }

    usuarios.forEach(usuario => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

// Enviar datos desde el formulario
document.getElementById("form-usuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const rolId = document.getElementById("rol").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, correo, contrasena, rolId })
    });

    const data = await response.json();
    alert(data.message);

    e.target.reset(); // Limpiar formulario
    cargarUsuarios(); // Recargar tabla
  } catch (error) {
    console.error("Error al agregar usuario:", error);
  }
});

// Cargar usuarios automáticamente al iniciar
cargarUsuarios();*/
