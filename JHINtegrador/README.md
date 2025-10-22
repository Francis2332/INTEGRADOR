Está diseñado para que tus compañeros puedan copiar y pegar todo y seguirlo paso a paso para configurar e iniciar el proyecto desde cero, asumiendo que les pasarás los archivos necesarios (como `package.json`, `index.js`, etc.).

### Contenido para `README.md`

```markdown
# Proyecto Parking System Backend - Configuración Inicial

Este documento detalla los pasos para configurar el entorno, instalar dependencias, y ejecutar el backend del sistema de gestión de estacionamientos en una nueva computadora. Incluye instrucciones para instalar MySQL, configurar variables de entorno con `dotenv`, y manejar políticas de ejecución de Windows para activar `npm`. Los archivos del proyecto (incluyendo `package.json`, `index.js`, etc.) serán proporcionados por separado.

## Requisitos Previos

- **Sistema Operativo**: Windows (instrucciones basadas en Windows; adaptar para otros SO si necesario).
- **Conexión a Internet**: Para descargar e instalar dependencias y MySQL.
- **Espacio en Disco**: Al menos 500 MB libres.

## Instalación y Configuración

### 1. Instala Node.js
- Descarga e instala Node.js (versión LTS, e.g., 18.x) desde [nodejs.org](https://nodejs.org/).
- Verifica la instalación en una terminal (CMD o PowerShell):
  ```bash
  node -v
  npm -v
  ```
  - Deberías ver versiones como `v18.x.x` y `9.x.x` o superiores. Si no, reinstala Node.js.

### 2. Ajusta las Políticas de Ejecución de Windows para npm
- Si `npm install` falla con un error como "No se puede cargar el archivo npm.ps1...", ajusta la política de ejecución:
  - Abre PowerShell como administrador:
    - Presiona `Win + S`, escribe "PowerShell", haz clic derecho y selecciona "Ejecutar como administrador".
  - Ejecuta:
    ```bash
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```
    - Confirma con `Y` o `S` si se solicita.
  - Verifica:
    ```bash
    Get-ExecutionPolicy
    ```
    - Debería mostrar `RemoteSigned`. Cierra y reabre la terminal.

### 3. Instala MySQL Community Server
- Descarga MySQL Community Server desde [mysql.com](https://dev.mysql.com/downloads/mysql/).
  - Selecciona "MySQL Community Server" > Windows (x64 o x86) > "Windows (x86, 64-bit), MSI Installer".
- Ejecuta el instalador como administrador:
  - Elige "Developer Default" o "Server only".
  - Configura una contraseña para el usuario `root` (anótala, e.g., `password123`).
  - Marca "Add to PATH" si aparece durante la instalación.
- Inicia el servicio MySQL:
  - Presiona `Win + R`, escribe `services.msc`, y presiona Enter.
  - Busca "MySQL94" (o la versión instalada) y asegúrate de que diga "En ejecución". Si no, haz clic derecho > "Iniciar".

### 4. Verifica MySQL y Crea la Base de Datos
- Abre una terminal (CMD) y verifica la conexión:
  ```bash
  mysql -u root -p
  ```
  - Ingresa la contraseña configurada (e.g., `password123`).
  - Si aparece `mysql>`, estás conectado. Crea la base de datos:
    ```sql
    CREATE DATABASE ParkingDB;
    ```
  - Verifica:
    ```sql
    SHOW DATABASES;
    ```
  - Sal:
    ```sql
    EXIT;
    ```
- Si "mysql no se reconoce", añade manualmente el PATH:
  - `Win + S` > "Variables de entorno" > Edita `Path` > Añade `C:\Program Files\MySQL\MySQL Server 9.4\bin` (ajusta la ruta según tu instalación) > OK.
  - Reinicia la terminal y repite el comando.

### 5. Configura el Proyecto
- Copia los archivos del proyecto (incluyendo `package.json`, `index.js`, etc.) en una carpeta, e.g., `backend/`.
- Navega a la carpeta en la terminal:
  ```bash
  cd backend
  ```
- Instala las dependencias:
  ```bash
  npm install
  ```
  - Esto instalará `express`, `mysql2`, `cors`, y `dotenv` según `package.json`.

### 6. Configura Variables de Entorno con `dotenv`
- Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=tu_contraseña  # Usa la contraseña de MySQL que configuraste
  DB_NAME=ParkingDB
  PORT=3000
  ```
- Asegúrate de que `.env` no se suba a Git. Crea o edita `.gitignore` y añade:
  ```
  node_modules/
  .env
  ```

### 7. Ejecuta el Proyecto
- Inicia el servidor:
  ```bash
  node index.js
  ```
- Deberías ver en la consola:
  ```
  ✅ Conectado a MySQL - ParkingDB
  🚀 Servidor corriendo en http://localhost:3000
  ```
- El servidor estará disponible en `http://localhost:3000`. Usa Postman o cURL para probar las APIs (detalles en el código proporcionado).

## Notas Importantes
- Asegúrate de que el servicio MySQL esté activo antes de ejecutar el proyecto.
- Si hay errores de conexión, verifica la contraseña en `.env` o reinicia el servicio MySQL.
- Los esquemas de las tablas (e.g., `Usuarios`, `TiposVehiculo`, `Espacios`) están definidos en el código; asegúrate de que coincidan con tu base de datos.
- Si usas PowerShell y persisten problemas con `npm`, usa CMD como alternativa.

## Contribuciones
- Edita este `README.md` o los archivos del proyecto según necesites. Sube cambios a un repositorio compartido si usas Git.

---
```

### Instrucciones para Tus Compañeros
- Pásales este `README.md` junto con los archivos del proyecto comprimidos o en un repositorio (incluye `package.json`, `index.js`, etc.).
- Asegúrate de que el `package.json` que les des coincida con el que compartiste:
  ```json
  {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "cors": "^2.8.5",
      "express": "^5.1.0",
      "mysql2": "^3.15.0",
      "dotenv": "^16.4.5"
    }
  }
  ```
- Si tienes un archivo `.sql` con el esquema, inclúyelo y añade en el `README.md` cómo importarlo (e.g., `mysql -u root -p ParkingDB < schema.sql`).

## SESO 