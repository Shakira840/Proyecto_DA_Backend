# To-Do List App

## Descripción
Esta es una aplicación web de control de tareas y metas personales (To-Do List). Permite agregar, eliminar tareas y metas, así como visualizarlas. El propósito de este proyecto es proporcionar una manera de organizar y realizar un seguimiento de las tareas necesarias para alcanzar metas personales.

## Características
- Agregar tareas y metas.
- Eliminar tareas y metas.
- Las tareas y metas no se guardan en una base de datos; los datos se mantienen en un arreglo que se reinicia cuando la aplicación se detiene.
- Autenticación de las solicitudes mediante un API Key en el header (`Authorization`).

## Tecnologías
- **Node.js** (versión LTS)
- **Express.js** como framework backend
- **JavaScript** para la lógica de la aplicación

## Endpoints
- **GET /getTasks**: Obtiene todas las tareas.
- **GET /getGoals**: Obtiene todas las metas.
- **POST /addTask**: Agrega una nueva tarea.
- **POST /addGoal**: Agrega una nueva meta.
- **DELETE /deleteTask/:id**: Elimina una tarea por ID.
- **DELETE /deleteGoal/:id**: Elimina una meta por ID.

## Middleware de Autenticación
El backend requiere que se incluya una API Key en el encabezado de autorización de las solicitudes. Si el parámetro `Authorization` no coincide con la clave (`'123'`), la solicitud será rechazada con un error 401 (Unauthorized).

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Shakira840/Proyecto_DA_Backend
